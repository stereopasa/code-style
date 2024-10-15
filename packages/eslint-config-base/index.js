import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
// import eslintN from 'eslint-plugin-n';
import eslintPromise from 'eslint-plugin-promise';

export default [
  js.configs.recommended,
  // ...eslintN.configs['flat/mixed-esm-and-cjs'],
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
    rules: {},
  },
  eslintConfigPrettier,
];
