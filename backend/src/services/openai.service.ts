import { openai } from '../config/openai';
import { ENV } from '../config/env';

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

    // 2. Ejecutar el asistente y esperar a que termine
    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
    });

    // 3. Verificar el estado del run
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(threadId);
      
      // Obtener el último mensaje del asistente
      const lastMessage = messages.data
        .filter((msg) => msg.role === 'assistant')
        .shift();

      if (lastMessage && lastMessage.content[0].type === 'text') {
        return lastMessage.content[0].text.value;
      }
    } else if (run.status === 'requires_action') {
      // TODO: Aquí implementaremos el Function Calling para el Lead Scoring
      console.log('El modelo requiere ejecutar una función externa.');
      return 'Procesando tu solicitud (Function Calling detectado)...';
    }

    throw new Error(`El run de OpenAI falló o fue cancelado. Estado: ${run.status}`);
  }
}
