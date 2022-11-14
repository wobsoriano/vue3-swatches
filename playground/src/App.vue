<script setup>
import { ref, watch } from 'vue';
import { basic } from 'vue3-swatches';
import 'vue3-swatches/dist/style.css'

const color = ref(basic.colors[0])

watch(color, (val) => {
  console.log(val)
}, {
  immediate: true
})
</script>

<template>
  <VSwatches v-model="color" />
</template>
