import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import { alias } from '../alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    Vue(),
    Components({
      dirs: [
        'src/editor',
        'src/icons',
      ],
      resolvers: [ArcoResolver()],
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
      ],
      resolvers: [ArcoResolver()],
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
