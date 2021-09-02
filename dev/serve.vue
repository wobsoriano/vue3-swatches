<template>
  <VueSwatches v-model="color" />
</template>

<script setup>
import { ref } from 'vue';
import VueSwatches from '@/VSwatches.vue';

const color = ref("#1FBC9C")
</script>
