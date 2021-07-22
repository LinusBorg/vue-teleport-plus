module.exports = {
  root: true,
  extends: ['@linusborg/eslint-config'],
  overrides: [
    {
      files: ['__tests__/**/*.spec.ts', '__tests__/**/*.spec.js'],
      env: {
        jest: true,
        browser: true,
      },
    },
    {
      files: ['./*.js', 'config/*.js'],
      env: {
        node: true,
      },
    },
  ],
}
