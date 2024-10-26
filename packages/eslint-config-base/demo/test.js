import { exec } from 'node:child_process';
import { join, relative } from 'node:path';

import pico from 'picocolors';

// const JS = `/eslint-config-base/demo/index.js
//   5:1  error  Unexpected console statement  no-console`;
const JS = `/eslint-config-base/demo/index.js
  5:1  error  Unexpected console statement  no-console`;

const TS = `/eslint-config-base/demo/index.ts
  1:5  error  'a' is never reassigned. Use 'const' instead  prefer-const
  1:8  error  Unexpected any. Specify a different type      @typescript-eslint/no-explicit-any


  1 error and 0 warnings potentially fixable with the \`--fix\` option.`;

function cleanPath(path) {
  return relative(process.cwd(), path).replace(/\\/g, '/');
}

async function eslint(config, files) {
  let path = join(import.meta.dirname, files);
  let configPath = join(import.meta.dirname, '..', config);
  process.stderr.write(pico.gray(`eslint --config ${cleanPath(configPath)} ${cleanPath(path)}\n`));
  return new Promise((resolve) => {
    exec(`pnpm eslint --no-color --config ${configPath} ${path}`, (_, stdout, stderr) => {
      if (stderr) {
        process.stderr.write(pico.red(stderr));
      }
      let fixed = stdout.replace(
        /.*\/(eslint-config-base|eslint-config)\//g,
        '/eslint-config-base/',
      );
      let trimmed = fixed.replace(/✖ \d+ problems?.*/, '').trim();
      resolve(trimmed);
    });
  });
}

async function check(config, files, expected) {
  let actual = await eslint(config, files);
  if (actual !== expected) {
    process.stderr.write(pico.green(`Expected:\n${expected}\n`));
    process.stderr.write(pico.red(`Actual:\n${actual}\n`));
    process.exit(1);
  }
}

await check('index.js', 'index.js', JS);
await check('ts.js', 'index.{ts,js}', [JS, TS].filter((str) => str?.length > 0).join('\n\n'));
