import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Solid from 'vite-plugin-solid'

import { alias } from '../alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), Solid()],
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
