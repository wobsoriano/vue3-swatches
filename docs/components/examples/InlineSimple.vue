<script setup>
import { ref } from 'vue';

const color = ref(null)
</script>

<template>
  <div class="form__field">
    <div class="form__label">
      <strong >Please choose a color:</strong>
      <VSwatches v-model="color" inline />
    </div>
  </div>
</template>
