import { OpenAI } from 'openai';
import { ENV } from './env';

// Exportamos la instancia única de OpenAI
export const openai = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
});
