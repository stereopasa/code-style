import config from './packages/eslint-config-base/ts.js';

export default [
  {
    ignores: [
      '**/*',
      '!**/*/',
      '!**/*.{cjs,js,json,mjs,ts,mts,tsx}',
      '!**/.ts',
      '**/node_modules',
      '**/dist',
      'packages/create-pasa/template-*/**/*',
      'packages/eslint-config-base/demo/index.*',
    ],
  },
  ...config,
  {
    languageOptions: {
      sourceType: 'module',
    },
  },
  {
    files: [
      'packages/create-pasa/template-*/**',
      'packages/create-pasa/index.js',
      '**/build.config.ts',
    ],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'import/no-unresolved': 'off',
      'n/no-missing-import': 'off',
      'no-undef': 'off',
    },
  },
  {
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
