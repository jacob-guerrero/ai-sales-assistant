import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint de prueba (Health Check)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend del Asistente IA funcionando correctamente.' });
});

// Endpoint Webhook (Fase 3 - Se implementará la lógica de OpenAI aquí)
app.post('/webhook', (req, res) => {
  console.log('Webhook recibido:', req.body);
  res.json({ success: true, message: 'Webhook procesado' });
});

app.listen(PORT, () => {
  console.log(`Servidor Backend ejecutándose en http://localhost:${PORT}`);
});
