import { defineNuxtPlugin } from '#app'
import { VSwatches } from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component('VSwatches', VSwatches)
})
