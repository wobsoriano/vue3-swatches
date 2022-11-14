import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver, addTemplate } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'vue-swatches',
    configKey: 'swatches'
  },
  setup (_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addTemplate({
      filename: 'types/vue3-swatches.d.ts',
      getContents: () => `
        declare module '@vue/runtime-core' {
          export interface GlobalComponents {
            'VSwatches': typeof import('vue3-swatches')['VSwatches']
          }
        }

        export const VSwatches: typeof import('vue3-swatches')['VSwatches']
      `
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push({ path: resolve(nuxt.options.buildDir, 'types/vue3-swatches.d.ts') })
    })

    addPlugin(resolve(runtimeDir, 'plugin.client.mjs'))
  }
})
