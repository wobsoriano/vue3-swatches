export default (async (nuxtApp) => {
  const VSwatches = await import('vue3-swatches').then(r => r.default || r)
  nuxtApp.vueApp.use(VSwatches)
})
