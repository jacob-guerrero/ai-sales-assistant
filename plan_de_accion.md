# Plan de Acción: Asistente IA para Ventas

**Arquitectura Elegida (Costo Cero):**
- **Frontend:** Vue 3 (Composition API) + TypeScript alojado en Vercel.
- **Backend:** Node.js + Express alojado en Render.com.
- **Base de Datos:** Firebase Firestore (Plan Spark - Gratis).
- **IA:** OpenAI Assistants API (Único servicio de pago por uso de tokens).

## Fase 1: Fundamentos y Configuración del Proyecto (Scaffolding)
- **Frontend**: Inicializar el proyecto con Vite + Vue 3 + TypeScript en la carpeta `frontend`.
- **Backend**: Inicializar el proyecto Node.js + Express en la carpeta `backend` con TypeScript.
- **Estructura Frontend**: Configurar la arquitectura de carpetas (`components`, `composables`, `views`, `services`, `types`).
- **Estructura Backend**: Configurar la arquitectura (`controllers`, `routes`, `services`, `config`).
- **Tipado**: Definir las interfaces compartidas en TypeScript (Modelos de Datos para Leads, Sesiones y Mensajes).

## Fase 2: Configuración de la IA y Lógica Core (OpenAI)
- **Asistente AI**: Crear un script de inicialización para configurar el Asistente en la API de OpenAI.
- **Prompt Engineering**: Definir el *System Prompt* enfocado en ventas y atención al cliente.
- **RAG (Knowledge Base)**: Subir el documento base (PDF/TXT) con la información del negocio al Asistente.
- **Servicios Backend**: Crear controladores para interactuar con la API de OpenAI (`createThread`, `addMessageToThread`, `runAssistant`).

## Fase 3: Webhooks y Lógica de Negocio (Backend)
- **Endpoint Webhook**: Crear la ruta en Express (`/webhook`) para recibir mensajes.
- **Flujo Conversacional**:
  1. Recibir mensaje y validar origen.
  2. Consultar Firestore para obtener el `Thread ID` activo del usuario. Si no existe, crearlo.
  3. Enviar el mensaje al hilo de OpenAI.
  4. Ejecutar el asistente y esperar la respuesta.
- **Lead Scoring (Calificación)**: Usar *Function Calling* de OpenAI para detectar intención de compra y extraer datos.
- **Persistencia**: Guardar el historial de interacción y los datos del Lead en Firestore.

## Fase 4: Desarrollo del Frontend (Vue 3 Chat Widget)
- **Componentes UI**: Desarrollar el widget de chat (burbuja flotante, ventana, área de mensajes).
- **Estilos**: Aplicar diseño moderno y premium (SCSS + Bootstrap 5) con animaciones.
- **Composables (`useChat.ts`)**: Crear lógica reactiva para la API del backend.
- **Manejo de Errores UI**: Mostrar estados de carga y manejo de errores visual.

## Fase 5: Pruebas, Refinamiento y Cierre
- **Testing**: Pruebas en flujos de IA y endpoints de Express.
- **Optimización**: Asegurar un tiempo de respuesta óptimo; afinar UX.
- **Despliegue**: Desplegar el Frontend en Vercel y el Backend en Render.com.
