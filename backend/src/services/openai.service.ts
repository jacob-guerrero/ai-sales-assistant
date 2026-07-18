import { openai } from '../config/openai';
import { ENV } from '../config/env';
import { LeadRepository } from '../repositories/lead.repository';

const leadRepo = new LeadRepository();

export class OpenAIService {
  
  async createThread(): Promise<string> {
    const thread = await openai.beta.threads.create();
    return thread.id;
  }

  async processMessage(threadId: string, message: string): Promise<string> {
    const assistantId = ENV.OPENAI_ASSISTANT_ID;
    
    if (!assistantId) {
      throw new Error("OPENAI_ASSISTANT_ID no está configurado en las variables de entorno.");
    }

    // 1. Añadir el mensaje del usuario al hilo
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    // 2. Ejecutar el asistente y esperar a que termine (o requiera acción)
    let run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
    });

    // 3. Manejo de Function Calling (Lead Scoring)
    if (run.status === 'requires_action') {
      const toolCalls = run.required_action?.submit_tool_outputs.tool_calls;
      
      if (toolCalls) {
        const toolOutputs = [];

        for (const toolCall of toolCalls) {
          if (toolCall.function.name === 'capture_lead') {
            const args = JSON.parse(toolCall.function.arguments);
            console.log('[Function Calling] Ejecutando capture_lead con args:', args);
            
            // Persistir en Firestore usando nuestro Repositorio
            await leadRepo.createLead({
              name: args.name,
              email: args.email,
              score: args.score || 5,
              createdAt: new Date(),
              source: 'AI Sales Assistant'
            });

            toolOutputs.push({
              tool_call_id: toolCall.id,
              output: JSON.stringify({ success: true, message: 'Lead capturado. Dile al usuario que un agente lo contactará pronto.' })
            });
          }
        }

        // Devolvemos el resultado de la función a OpenAI para que continúe pensando
        console.log('[OpenAI] Retornando output de la herramienta al bot...');
        run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
          threadId,
          run.id,
          { tool_outputs: toolOutputs }
        );
      }
    }

    // 4. Verificar el estado final tras la resolución (o si no hubo funciones)
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(threadId);
      
      // Obtener el último mensaje del asistente
      const lastMessage = messages.data
        .filter((msg) => msg.role === 'assistant')
        .shift();

      if (lastMessage && lastMessage.content[0].type === 'text') {
        return lastMessage.content[0].text.value;
      }
    }

    throw new Error(`El run de OpenAI falló o fue cancelado. Estado: ${run.status}`);
  }
}
