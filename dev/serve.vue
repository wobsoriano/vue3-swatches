<template>
  <VueSwatches v-model="color" />
</template>

<script setup>
import { ref, watch } from 'vue';
import VueSwatches from '@/VSwatches.vue';

const color = ref("#1FBC9C")

watch(color, (val) => {
  console.log(val)
})
</script>
