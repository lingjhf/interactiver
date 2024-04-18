import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Vuetify from 'vite-plugin-vuetify'

import { alias } from '../alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    Vue(),
    Vuetify(),
    Components({
      dirs: [
        'src/components',
      ],
      resolvers: [
      ],
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dirs: [
        'src/composables',
      ],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias,
  },
  build: {
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    fs: {
      cachedChecks: false,
    },
  },
})
