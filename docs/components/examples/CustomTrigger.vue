<script setup>
import { ref } from 'vue';

const color = ref('#2ECC70')
</script>

<template>
  <div class="form__field">
     <div class="form__input">
       <VSwatches v-model="color">
         <template #trigger>
          <input slot="trigger" :value="color" class="form__input__element" readonly>
         </template>
       </VSwatches>
     </div>
   </div>
 </template>
