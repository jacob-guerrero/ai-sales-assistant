import { Request, Response, NextFunction } from 'express';
import { OpenAIService } from '../services/openai.service';
import { ThreadRepository } from '../repositories/thread.repository';

const openAIService = new OpenAIService();
const threadRepo = new ThreadRepository();

export class WebhookController {
  
  static async handleIncomingMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { message, userId } = req.body;

      if (!message || !userId) {
         res.status(400).json({ error: 'Faltan campos requeridos: message, userId' });
         return;
      }

      console.log(`[Webhook] Mensaje de ${userId}: ${message}`);

      // TODO (Fase 3): 
      // 1. Buscar hilo activo en threadRepo.
      // 2. Si no existe, crear uno nuevo en OpenAI y guardarlo.
      // 3. Procesar mensaje con openAIService.
      
      res.json({ success: true, message: 'Mensaje recibido y encolado.' });
    } catch (error) {
      // Mandamos el error al middleware global
      next(error); 
    }
  }
}
