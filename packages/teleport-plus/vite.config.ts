import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
module.exports = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.join(__dirname, 'src/index.ts'),
      name: 'VueMonorepoLib',
    },
    minify: false,
    rollupOptions: {
      external: ['vue'],
    },
  },
})
