<script setup>
import { ref } from 'vue';

const color = ref('#000000')
</script>

<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <VSwatches
        v-model="color"
        popover-x="left"
        swatches="text-advanced"
      />
    </div>
  </div>
</template>
