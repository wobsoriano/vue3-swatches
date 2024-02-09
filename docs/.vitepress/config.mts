import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Vue Swatches',
  description: 'Color swatch component for Vue',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'Examples', link: '/examples' },
      { text: 'API', link: '/api/props', activeMatch: '/api/' },
      { text: 'Presets', link: '/presets' },
      {
        text: pkg.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/wobsoriano/vue-clerk/blob/main/CHANGELOG.md',
          },
          // {
          //   text: 'Contributing',
          //   link: 'https://github.com/wobsoriano/vue-clerk/blob/main/.github/contributing.md',
          // },
        ],
      },
    ],

    editLink: {
      pattern: 'https://github.com/wobsoriano/vue-clerk/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      // copyright: 'Copyright © 2023-present Robert Soriano',
    },

    sidebar: {
      '/api/': [
        {
          text: 'API',
          base: '/api',
          items: [
            { text: 'Props', link: '/props' },
            { text: 'Events', link: '/events' },
            { text: 'Slots', link: '/slots' },
          ],
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wobsoriano/vue-clerk' },
    ],
  },
})
