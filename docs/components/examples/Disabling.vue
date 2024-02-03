<script setup>
import { ref } from 'vue';

const color = ref('#27AF60')

const swatches = [
  { color : '#1FBC9C', disabled: true },
    "#1CA085",
  { color : '#2ECC70', disabled: true },
    "#27AF60",
    "#3398DB",
    "#2980B9",
    "#A463BF",
    "#8E43AD",
    "#3D556E",
    "#222F3D",
  { color : '#F2C511', disabled: true }
]
</script>

<template>
  <div class="form__field">
    <div class="form__label">
      <strong>Please choose a color:</strong>
    </div>
    <div class="form__input">
      <VSwatches
        v-model="color"
        :swatches="swatches"
        popover-x="left"
      />
    </div>
  </div>
</template>
