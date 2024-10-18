import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
// import eslintN from 'eslint-plugin-n';
import eslintPromise from 'eslint-plugin-promise';
import globals from 'globals';

export default [
  js.configs.recommended,
  // ...eslintN.configs['flat/mixed-esm-and-cjs'],
  // eslintImport.flatConfigs.recommended,
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: eslintImport,
      // n: eslintN,
      promise: eslintPromise,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'debug', 'info'] }],

      'import/order': ['warn', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/no-default-export': 'error',
      'import/group-exports': 'error',
      'import/no-unresolved': 'off',
    },
  },
  eslintConfigPrettier,
];
