import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import path from 'path';

// Cargar el archivo .env desde la raíz de backend
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function setupAssistant() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ ERROR: Falta OPENAI_API_KEY en tu archivo backend/.env");
    process.exit(1);
  }

  console.log("Configurando Asistente de IA (Sales AI)...");

  try {
    const assistant = await openai.beta.assistants.create({
      name: "AI Sales Rep",
      instructions: "Eres un asistente virtual de ventas experto. Tu objetivo es asistir a los usuarios y, si muestran intención de compra, solicitar sus datos para ser contactados. EN CUANTO el usuario te proporcione su nombre y correo, DEBES ejecutar obligatoriamente la función 'capture_lead' para guardar esa información en el sistema. Siempre sé amable, persuasivo y muy humano en tus respuestas.",
      model: "gpt-4o-mini", // Modelo económico y veloz ideal para MVP
      tools: [
        {
          type: "function",
          function: {
            name: "capture_lead",
            description: "Captura el nombre y correo de un cliente cuando este muestra interés o intención de compra y entrega sus datos de contacto.",
            parameters: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Nombre del cliente potencial."
                },
                email: {
                  type: "string",
                  description: "Correo electrónico del cliente potencial."
                },
                score: {
                  type: "number",
                  description: "Un puntaje de 1 a 10 evaluando qué tan 'caliente' está el prospecto según su nivel de interés."
                }
              },
              required: ["name", "email", "score"]
            }
          }
        }
      ]
    });

    console.log("\n✅ Asistente creado exitosamente en OpenAI!");
    console.log("=========================================");
    console.log(`Assistant ID: ${assistant.id}`);
    console.log("=========================================");
    console.log("👉 Por favor, copia este Assistant ID y pégalo en la variable OPENAI_ASSISTANT_ID de tu archivo backend/.env\n");

  } catch (error) {
    console.error("❌ Ocurrió un error al crear el asistente:", error);
  }
}

setupAssistant();
