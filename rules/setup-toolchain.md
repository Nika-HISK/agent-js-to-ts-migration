---
title: Set Up the TypeScript Toolchain Correctly
impact: CRITICAL
impactDescription: "Wrong toolchain causes dev/prod type divergence and broken builds"
tags: setup, toolchain, ts-node, tsx, build
---

## Set Up the TypeScript Toolchain Correctly

**Impact: CRITICAL — Wrong toolchain causes dev/prod type divergence and broken builds**

Many teams add TypeScript but keep running raw `.js` files in production or use ts-node without `esm` support, creating discrepancies between what TypeScript checks and what actually runs.

**Incorrect — running JS directly while "having TypeScript":**

```json
{
  "scripts": {
    "start": "node src/index.js",
    "build": "tsc"
  }
}
```

**Correct — consistent TypeScript pipeline:**

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc --noEmit && tsc -p tsconfig.build.json",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tsx": "^4.0.0",
    "@types/node": "^20.0.0"
  }
}
```

Use `tsx` (not `ts-node`) for modern ESM support. Always separate `typecheck` from `build` in CI so type errors are caught independently of compilation.

Reference: [tsx on GitHub](https://github.com/privatenumber/tsx)
