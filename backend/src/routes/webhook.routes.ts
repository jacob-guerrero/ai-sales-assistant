import { Router } from 'express';
import { WebhookController } from '../controllers/webhook.controller';

const router = Router();

// Endpoint principal para ingesta de mensajes
router.post('/', WebhookController.handleIncomingMessage);

export default router;
