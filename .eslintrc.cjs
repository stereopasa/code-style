/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: './packages/eslint-config-base/main.cjs',
  parserOptions: { tsconfigRootDir: __dirname },
  ignorePatterns: ['packages/create-pasa/template-*/**'],
  overrides: [
    {
      files: [
        'packages/create-pasa/template-*/**',
        'packages/create-pasa/index.js',
        '**/build.config.ts',
      ],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/no-unresolved': 'off',
        'n/no-missing-import': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
