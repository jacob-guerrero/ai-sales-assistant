// Adapter Pattern: Centralizamos las peticiones HTTP al Backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const ApiService = {
  async sendMessage(userId: string, message: string) {
    try {
      const response = await fetch(`${API_URL}/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message }),
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el servidor');
      }

      return await response.json();
    } catch (error) {
      console.error('[ApiService Error]:', error);
      throw error;
    }
  }
};
