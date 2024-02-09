<script setup>
import { ref } from 'vue';

const color = ref('#F64272')
const swatches = ['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5', '']
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
        row-length="6"
        shapes="circles"
        show-border
        popover-x="left"
      />
    </div>
  </div>
</template>
