<template>
  <VueSwatches v-model="color" />
</template>

<script setup>
import { ref, watch } from 'vue';
import VueSwatches, { presets } from '@/entry.esm';
console.log(presets)
const color = ref(presets.basic.colors[0])

watch(color, (val) => {
  console.log(val)
}, {
  immediate: true
})
</script>
