---
title: Enable Strict Mode Incrementally Per File
impact: HIGH
impactDescription: "strict mode catches 60-80% of all TypeScript bugs — but must be phased in"
tags: strict, tsconfig, noImplicitAny, strictNullChecks
---

## Enable Strict Mode Incrementally Per File

**Impact: HIGH — `strict` mode catches 60-80% of all TypeScript bugs — but must be phased in**

`strict: true` in tsconfig enables 8 sub-flags at once. Enabling it globally on a JS migration mid-flight breaks hundreds of files simultaneously. The solution is to use `@ts-check` and per-file overrides to enable strictness file-by-file as each is fully converted.

**Incorrect — flipping strict on globally and drowning in 500 errors:**

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

**Correct — strict off globally, opt-in per file:**

```typescript
// @ts-strict — enables strict for this file only (TS 4.9+)
// or add to the file: // @ts-nocheck to temporarily suppress during migration

// In tsconfig: keep strict: false
// Then for fully-converted files, use a tsconfig.strict.json overlay:
```

```json
// tsconfig.strict.json — used only for converted files
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  },
  "include": ["src/converted/**/*"]
}
```

Run `tsc -p tsconfig.strict.json --noEmit` in CI for the `converted/` folder. Move files there once they pass.

Reference: [TypeScript strict flag](https://www.typescriptlang.org/tsconfig#strict)
