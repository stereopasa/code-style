import config from './ts.js';

export default [
  {
    ignores: ['demo/index.*'],
  },
  ...config,
  {
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
