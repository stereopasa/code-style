import { defineConfig } from 'oxlint';

import config from './index.js';

export default defineConfig({
  extends: [config],
  ignorePatterns: ['demo/index.*'],
});
