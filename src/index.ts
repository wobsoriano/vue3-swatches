import type { App } from 'vue'
import VSwatches from './VSwatches.vue'

function install (app: App) {
  app.component('VSwatches', VSwatches)
}

export {
  install as default,
  VSwatches
}

export * from './presets'
