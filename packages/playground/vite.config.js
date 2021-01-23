import vue from '@vitejs/plugin-vue'

/**
 * @type { import('vite').UserConfig }
 */
export default {
  alias: {
    '@linusborg/vue-teleport-plus': '@linusborg/vue-teleport-plus/src/index.ts',
  },
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['postcss', 'autoprefixer', '@tailwindcss/postcss7-compat'],
  },
}
