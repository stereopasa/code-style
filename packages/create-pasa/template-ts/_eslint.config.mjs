import baseConfig from '@stereopasa/eslint-config-base/ts';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/errors.ts', '**/*.d.ts'],
  },
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['prettier.config.js', 'eslint.config.mjs'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
