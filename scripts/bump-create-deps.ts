#!/usr/bin/env -S pnpm exec tsx
/* eslint-disable import/no-unresolved */

// import pkgJSON from '../package.json' assert { type: 'json' };
import { readJSON, writeJSON } from './utils/json';
import { PackageJson } from 'type-fest';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {
  create: path.resolve(__dirname, '../packages/create-pasa'),
  eslint: path.resolve(__dirname, '../packages/eslint-config-base'),
  prettier: path.resolve(__dirname, '../packages/prettier-config'),
};
const { version: prettierVersion, name: prettierName } = await readJSON<PackageJson>(
  `${paths.prettier}/package.json`,
);
const { version: eslintVersion, name: eslintName } = await readJSON<PackageJson>(
  `${paths.eslint}/package.json`,
);

const filelist = await fsp.readdir(paths.create, { recursive: false });
const templates = filelist.filter((f) => f.startsWith('template-'));
for (const templateName of templates) {
  const pkgPath = path.join(paths.create, templateName, 'package.json');
  const pkg = await readJSON<PackageJson>(pkgPath);
  if (prettierName! in pkg.devDependencies!) {
    pkg.devDependencies![prettierName!] = `~${prettierVersion}`;
  }
  if (eslintName! in pkg.devDependencies!) {
    pkg.devDependencies![eslintName!] = `~${eslintVersion}`;
  }
  console.log(pkg.devDependencies);
  await writeJSON(pkgPath, pkg);
}
