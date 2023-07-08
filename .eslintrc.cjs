/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: './packages/eslint-config-base/main.cjs',
  parserOptions: { tsconfigRootDir: __dirname },
};
