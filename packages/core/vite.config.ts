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
      external: ['d3', 'mitt', 'dagre', 'uuid'],
    },
  },
  server: {
    fs: {
      cachedChecks: false,
    },
  },
})
