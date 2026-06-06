---
title: Configure ESLint with TypeScript Rules
impact: HIGH
impactDescription: "Catches migration anti-patterns (any, non-null assertions) automatically"
tags: setup, eslint, linting, typescript-eslint
---

## Configure ESLint with TypeScript Rules

**Impact: HIGH — Catches migration anti-patterns (`any`, non-null assertions) automatically**

Plain ESLint doesn't understand TypeScript. Without `typescript-eslint`, teams accumulate `any` types, disabled checks, and unsafe casts silently throughout the migration.

**Incorrect — plain ESLint config during TS migration:**

```js
// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended'],
};
```

**Correct — typescript-eslint flat config:**

```js
// eslint.config.js
import tseslint from 'typescript-eslint';

export default tseslint.config(
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
    },
  }
);
```

Start with `warn` during migration so existing violations are visible but don't block CI. Promote to `error` as files are fully converted.

Reference: [typescript-eslint](https://typescript-eslint.io/)
