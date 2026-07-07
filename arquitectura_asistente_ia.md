# Proyecto 2: Asistente IA para Ventas (Agente Virtual)

## Visión General
Una herramienta de automatización conversacional. Este proyecto demuestra que no solo haces "páginas web", sino que integras tecnologías de vanguardia (Inteligencia Artificial generativa) para automatizar procesos de negocio directamente donde están los usuarios (WhatsApp o Web).

## Arquitectura y Stack Tecnológico Propuesto
- **Backend:** Node.js con Express (o Cloud Functions de Firebase).
- **Inteligencia Artificial:** OpenAI API (GPT-4o-mini o GPT-4). Se recomienda usar el modelo de *Function Calling* o *Assistants API*.
- **Integración de Mensajería:** Meta WhatsApp Cloud API (Oficial) o un widget de chat integrado en Vue 3 para la web.
- **Base de Datos:** Firestore o MongoDB (para guardar el historial de las conversaciones y extraer el contexto de cada lead).

## Funcionalidades Core (MVP)
1. **Ingesta de Conocimiento (RAG):** El bot debe tener un "Prompt del Sistema" inyectado con información de la empresa (ej. un menú de restaurante, un catálogo de servicios, o FAQs).
2. **Atención 24/7 con IA:** Cuando un usuario envía un mensaje, el backend en Node.js recibe el Webhook, lo procesa con OpenAI y responde de manera natural.
3. **Calificación de Leads (Lead Scoring):** Si el usuario muestra intención de compra, el bot le solicita su nombre y correo.
4. **Integración Externa:** Una vez que captura los datos, el bot hace una llamada a una base de datos o envía un correo automático a la empresa notificando sobre un nuevo lead "caliente".

## Valor para mostrar en el Portafolio
Este proyecto es un "Cierra Ventas". Al mostrar que puedes automatizar la atención al cliente, atacas directamente el dolor más grande de las empresas modernas: el costo operativo y el tiempo de respuesta. Demuestra tu perfil como **Arquitecto de Soluciones e Integrador**, mucho más allá de un desarrollador frontend.
