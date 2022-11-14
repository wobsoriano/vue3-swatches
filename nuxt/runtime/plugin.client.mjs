import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const VSwatches = await import('vue3-swatches').then(r => r.default || r)
  nuxtApp.vueApp.use(VSwatches)
})
