import { resolve } from 'node:path'

import { defineConfig } from 'vite'

import { alias } from '../../alias'

function r(p: string) {
  return resolve(__dirname, p)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
  },
  build: {
    lib: {
      entry: r('./src/index.ts'),
      formats: ['cjs', 'es'],
      fileName: 'index',
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ['@interactiver/core', 'hammerjs'],
    },
  },
  server: {
    fs: {
      cachedChecks: false,
    },
  },
})
