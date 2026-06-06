---
title: Migrate Files Incrementally with allowJs
impact: CRITICAL
impactDescription: "Trying to convert everything at once causes weeks-long broken builds"
tags: setup, strategy, allowJs, incremental
---

## Migrate Files Incrementally with allowJs

**Impact: CRITICAL — Trying to convert everything at once causes weeks-long broken builds**

The safest migration strategy is file-by-file. TypeScript's `allowJs` option lets `.js` and `.ts` files coexist in the same project. Convert the most-depended-on modules first (bottom of the dependency tree) and work upward.

**Incorrect — rename everything to .ts on day one:**

```bash
# Don't do this — breaks the entire project immediately
find src -name "*.js" -exec rename 's/\.js$/.ts/' {} \;
```

**Correct — incremental file-by-file approach:**

```bash
# Step 1: enable allowJs in tsconfig, run tsc --noEmit to see baseline errors
# Step 2: pick one leaf module and rename it
mv src/utils/format.js src/utils/format.ts

# Step 3: fix only that file's type errors
# Step 4: repeat for the next module up the dependency chain
```

```ts
// src/utils/format.ts — converted leaf module
export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
```

Track progress with a migration checklist in your repo. Convert ~5-10 files per PR to keep reviews manageable.

Reference: [TypeScript Migration Guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
