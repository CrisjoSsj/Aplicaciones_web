<template>
    <div>
      <h2>Lista de nombres</h2>
      <ul>
        <li v-for="(nombre, index) in nombres" :key="index">{{ nombre }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    nombres: {
      type: Array,
      required: true
    }
  })
  </script>
  