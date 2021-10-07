module.exports = {
  root: true,
  extends: ['@linusborg/eslint-config'],
  rules: {
    'no-undef': 'error',
    'vue/script-setup-uses-vars': 'warn',
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: ['@vue/reactivity', '@vue/runtime-*', '@vue/shared'],
            message: 'Import from package "vue" instead',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['__tests__/**/*.spec.ts', '__tests__/**/*.spec.js'],
      env: {
        jest: true,
        browser: true,
      },
    },
    {
      files: ['./*.{js,ts}', 'config/*.{ts,js}'],
      env: {
        node: true,
      },
    },
    {
      files: ['./**/*.vue'],
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
  ],
}
