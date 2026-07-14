<script setup lang="ts">
import type { Message } from '../types';

defineProps<{
  message: Message;
}>();
</script>

<template>
  <div 
    class="d-flex mb-3" 
    :class="message.role === 'user' ? 'justify-content-end' : 'justify-content-start'"
  >
    <div 
      class="p-3 shadow-sm rounded-4"
      :class="message.role === 'user' ? 'bg-primary text-white' : 'bg-white text-dark border'"
      style="max-width: 75%;"
    >
      {{ message.content }}
    </div>
  </div>
</template>
