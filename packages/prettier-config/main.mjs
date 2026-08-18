import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/* @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,

  plugins: [require.resolve('prettier-plugin-packagejson')],
};

export default config;
