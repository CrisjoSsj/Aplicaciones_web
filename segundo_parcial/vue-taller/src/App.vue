<script setup>
import { ref } from 'vue'
import addname from './components/addname.vue'
import namelist from './components/namelist.vue'

const nombres = ref ([])

const agregarnombre = (nuevonombre) => {
  if (nuevonombre.trim() !== "") {
    nombres.value.push (nuevonombre.trim())
  }
}
</script>

<template>
  <h1>Gestor de nombres </h1>
  <addname titulo="Agregar un nuevo nombre" @nombre-agregado="agregarnombre"/>
  <namelist :nombres="nombres"/>
</template>
<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
