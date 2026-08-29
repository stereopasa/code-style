import { exec } from 'node:child_process';
import { join, relative } from 'node:path';

import pico from 'picocolors';

const JS = `/oxlint-config/demo/index.js:5:1: error eslint(no-console): Unexpected console statement. help: Supported methods are: warn, error, debug, info.`;

const TS = `/oxlint-config/demo/index.ts:1:24: warning eslint(no-unused-vars): Parameter 'a' is declared but never used. Unused parameters should start with a '_'. help: Consider removing this parameter.`;

function cleanPath(path) {
  return relative(process.cwd(), path).replace(/\\/g, '/');
}

function normalize(output) {
  return output.replace(/(?:.*\/)?(demo\/index\.(?:js|ts))/g, '/oxlint-config/$1').trim();
}

async function oxlint(config, files) {
  let path = join(import.meta.dirname, files);
  let configPath = join(import.meta.dirname, '..', config);
  process.stderr.write(pico.gray(`oxlint --config ${cleanPath(configPath)} ${cleanPath(path)}\n`));
  return new Promise((resolve) => {
    exec(
      `pnpm oxlint --config ${configPath} ${path}`,
      { env: { ...process.env, NO_COLOR: '1' } },
      (_, stdout, stderr) => {
        if (stderr) {
          process.stderr.write(pico.red(stderr));
        }
        resolve(normalize(stdout));
      },
    );
  });
}

async function check(config, files, expected) {
  let actual = await oxlint(config, files);
  if (actual !== expected) {
    process.stderr.write(pico.green(`Expected:\n${expected}\n`));
    process.stderr.write(pico.red(`Actual:\n${actual}\n`));
    process.exit(1);
  }
}

await check('index.js', 'index.js', JS);
await check('configuration.json', 'index.ts', TS);
