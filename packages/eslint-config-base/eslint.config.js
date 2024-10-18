import config from './ts';

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
