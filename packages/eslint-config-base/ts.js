import base from './index.js';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...base,
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        // project: './tsconfig.json',
        // tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-console': 'error',
    },
  },
  ...tseslint.configs.recommended,
  {
    rules: {},
  },
);
