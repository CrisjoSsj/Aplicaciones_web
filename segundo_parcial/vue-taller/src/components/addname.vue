<template>
    <div>
      <h2>{{ titulo }}</h2>
      <input v-model="nombre" type="text" placeholder="Escribe un nombre" />
      <button @click="emitirNombre">Agregar</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    titulo: {
      type: String,
      required: true
    }
  })
  
  const emit = defineEmits(['nombre-agregado'])
  const nombre = ref('')
  
  const emitirNombre = () => {
    if (nombre.value.trim() !== '') {
      emit('nombre-agregado', nombre.value.trim())
      nombre.value = ''
    }
  }
  </script>
  