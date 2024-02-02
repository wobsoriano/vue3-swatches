import DefaultTheme from 'vitepress/theme'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    const plugin = await import('../../../src')
    app.component('VSwatches', plugin.VSwatches)
  }
}
