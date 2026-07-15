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

      console.log(`[Webhook] Procesando mensaje de ${userId}: "${message}"`);

      // 1. Buscar hilo activo en Firestore
      const activeSession = await threadRepo.getActiveThreadByUserId(userId);
      let threadId = activeSession?.threadId;

      // 2. Si no existe hilo, crear uno nuevo en OpenAI y persistirlo
      if (!threadId) {
        console.log(`[Webhook] Creando nuevo hilo para el usuario: ${userId}`);
        threadId = await openAIService.createThread();
        
        await threadRepo.createThread({
          threadId,
          userId,
          status: 'active',
          createdAt: new Date(),
          lastActivity: new Date()
        });
      }

      // 3. Procesar mensaje con la API de OpenAI
      const aiResponse = await openAIService.processMessage(threadId, message);
      
      // Retornar la respuesta al frontend
      res.json({ success: true, response: aiResponse });
    } catch (error) {
      next(error); 
    }
  }
}
