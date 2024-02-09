<script setup>
import { ref } from 'vue';

const color = ref('#A463BF')
</script>

<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <VSwatches
        v-model="color"
        show-fallback
        fallback-input-type="color"
        popover-x="left"
      />
    </div>
  </div>
</template>
