import { openai } from '../config/openai';
import { ENV } from '../config/env';

export class OpenAIService {
  
  async createThread(): Promise<string> {
    // TODO: Implementar creación real en Fase 2
    // const thread = await openai.beta.threads.create();
    // return thread.id;
    return 'mock_thread_id';
  }

  async processMessage(threadId: string, message: string): Promise<string> {
    // TODO: Implementar ejecución del asistente en Fase 2
    return 'Respuesta generada por el Asistente IA (Mock)';
  }
}
