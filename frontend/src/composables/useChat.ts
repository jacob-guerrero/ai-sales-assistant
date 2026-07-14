import { ref } from 'vue';
import { ApiService } from '../services/api.service';
import type { Message } from '../types';

export function useChat() {
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // ID de usuario mock para la prueba (Fase MVP)
  const userId = 'user_demo_123';

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Agregar mensaje del usuario a la UI inmediatamente
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      createdAt: new Date(),
    };
    messages.value.push(userMsg);
    
    isLoading.value = true;
    error.value = null;

    try {
      // Enviar al backend
      await ApiService.sendMessage(userId, content);
      
      // NOTA: En la fase real (OpenAI), aquí recibiremos la respuesta
      // Por ahora simulamos que llega correctamente.
      
    } catch (e: any) {
      error.value = 'Hubo un problema al enviar el mensaje. Intenta de nuevo.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}
