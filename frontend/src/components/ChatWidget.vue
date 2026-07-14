<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useChat } from '../composables/useChat';
import MessageBubble from './MessageBubble.vue';

const { messages, isLoading, error, sendMessage } = useChat();
const inputMessage = ref('');
const chatBody = ref<HTMLElement | null>(null);

const handleSend = async () => {
  if (inputMessage.value.trim()) {
    await sendMessage(inputMessage.value);
    inputMessage.value = '';
    
    // Auto-scroll to bottom
    await nextTick();
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
  }
};
</script>

<template>
  <div class="card shadow-lg w-100 h-100 d-flex flex-column" style="border-radius: 1rem; overflow: hidden;">
    <!-- Header -->
    <div class="bg-primary p-3 text-white d-flex align-items-center shadow-sm">
      <div class="rounded-circle bg-white text-primary p-2 me-3 d-flex align-items-center justify-content-center fw-bold fs-5" style="width: 45px; height: 45px;">
        IA
      </div>
      <div>
        <h5 class="mb-0 fw-bold">Asistente Virtual</h5>
        <small class="opacity-75">En línea</small>
      </div>
    </div>

    <!-- Chat Body -->
    <div ref="chatBody" class="card-body bg-light overflow-auto p-4 flex-grow-1" style="max-height: 400px; min-height: 400px;">
      <div v-if="messages.length === 0" class="text-center text-muted mt-5">
        <p>¡Hola! Soy el Asistente IA. ¿En qué puedo ayudarte hoy?</p>
      </div>
      
      <MessageBubble 
        v-for="msg in messages" 
        :key="msg.id" 
        :message="msg" 
      />
      
      <div v-if="isLoading" class="d-flex justify-content-start mb-3">
        <div class="p-3 shadow-sm rounded-4 bg-white text-muted border">
          Escribiendo...
        </div>
      </div>
      
      <div v-if="error" class="text-danger text-center small mt-2">
        {{ error }}
      </div>
    </div>

    <!-- Chat Input -->
    <div class="p-3 bg-white border-top">
      <form @submit.prevent="handleSend" class="d-flex gap-2">
        <input 
          v-model="inputMessage" 
          type="text" 
          class="form-control rounded-pill px-4 shadow-sm" 
          placeholder="Escribe un mensaje..."
          :disabled="isLoading"
        >
        <button 
          type="submit" 
          class="btn btn-primary rounded-circle shadow-sm d-flex align-items-center justify-content-center"
          style="width: 45px; height: 45px; min-width: 45px;"
          :disabled="isLoading || !inputMessage.trim()"
        >
          ➤
        </button>
      </form>
    </div>
  </div>
</template>
