module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: require.resolve('@typescript-eslint/parser'),
  plugins: ['@typescript-eslint/eslint-plugin'],
  reportUnusedDisableDirectives: true,
  rules: {},
  overrides: [
    {
      // Avoid "'module'|'console' is not defined" (caused by no-undef)
      files: ['**/*.{cjs,js,mjs}'],
      env: { node: true },
    },
  ],
}
