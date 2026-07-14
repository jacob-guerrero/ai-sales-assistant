<script setup lang="ts">
import ChatWidget from './components/ChatWidget.vue';
</script>

<template>
  <div class="container py-5 d-flex flex-column align-items-center justify-content-center min-vh-100">
    <h1 class="text-center mb-4 fw-bold text-gradient">Asistente IA para Ventas</h1>
    
    <div style="max-width: 500px; width: 100%;">
      <ChatWidget />
    </div>
  </div>
</template>
