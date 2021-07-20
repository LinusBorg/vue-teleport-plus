module.exports = {
  root: true,
  extends: ['@linusborg/eslint-config'],
  overrides: [
    {
      files: ['*.spec.ts', '*.spec.js'],
      env: {
        jest: true,
        browser: true,
      },
    },
    {
      files: ['./*.js'],
      env: {
        node: true,
      },
    },
  ],
}
