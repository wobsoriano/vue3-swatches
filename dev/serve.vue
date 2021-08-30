<script>
import { defineComponent, ref } from 'vue';
import VueSwatches from '@/VSwatches.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueSwatches
  },
  setup() {
    const color = ref("#1FBC9C")

    return {
      color
    }
  }
});
</script>

<template>
  <div id="app">
    <VueSwatches v-model="color" />
  </div>
</template>
