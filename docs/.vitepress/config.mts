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

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      {
        text: 'Examples',
        link: '/examples'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wobsoriano/vue-clerk' },
    ],
  },
})
