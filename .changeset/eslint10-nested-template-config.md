---
'create-pasa': patch
'@stereopasa/eslint-config-base': patch
---

Keep ESLint 10 from loading create-pasa template configs during monorepo lint, wrap eslint-plugin-import with @eslint/compat, and declare ESLint 10 as a supported peer of eslint-config-base.
