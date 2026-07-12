import express from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import webhookRoutes from './routes/webhook.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint de prueba (Health Check)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend del Asistente IA funcionando correctamente.' });
});

// Registrar Rutas
app.use('/webhook', webhookRoutes);

// Middleware de manejo de errores global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Global Error]:', err);
  res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
});

app.listen(ENV.PORT, () => {
  console.log(`🚀 Servidor Backend ejecutándose en http://localhost:${ENV.PORT}`);
});
