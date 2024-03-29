import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import { alias } from '../alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), Vue()],
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
