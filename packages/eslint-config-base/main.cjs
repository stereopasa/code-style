/** @type{import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: require.resolve('@typescript-eslint/parser'),
  plugins: ['@typescript-eslint', 'import'],
  reportUnusedDisableDirectives: true,
  rules: {},
  overrides: [
    {
      // Avoid "'module'|'console' is not defined" (caused by no-undef)
      files: ['**/*.{cjs,js,mjs}'],
      env: { node: true },
    },
  ],
};
