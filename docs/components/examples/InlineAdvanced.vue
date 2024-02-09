<script setup>
import { ref } from 'vue';

const color = ref(null)
const dialog = ref()
</script>

<template>
  <div class="form__field">
    <div class="form__label">
      <button @click="dialog.showModal()">Please choose a color</button>

      <dialog ref="dialog">
        <form method="dialog">
          <div class="custom-ui">
            <VSwatches v-model="color" inline />
          </div>
          <button>OK</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<style scoped>
::backdrop {
  background: #0004;
  backdrop-filter: blur(2px);
  opacity: 0;
  animation: 0.3s fade-in forwards;
}

dialog[open] {
  padding: 2rem;
  color: #e9ecef;
  border-radius: 5px;
  animation: slide-in-up .5s cubic-bezier(.25,0,.3,1) forwards;
}

dialog form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: flex-end;
}
.custom-ui {
  width: 348px;
  margin-left: auto;
  margin-right: auto;
}
</style>
