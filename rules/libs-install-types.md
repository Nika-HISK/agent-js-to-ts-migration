---
title: Install @types Packages for Every Untyped Dependency
impact: LOW-MEDIUM
impactDescription: "Missing @types causes entire third-party APIs to be typed as any"
tags: libs, @types, DefinitelyTyped, dependencies
---

## Install `@types` Packages for Every Untyped Dependency

**Impact: LOW-MEDIUM — Missing `@types` causes entire third-party APIs to be typed as `any`**

When a library doesn't ship its own TypeScript types, TypeScript falls back to `any` for all its exports. This is silent — no error, just complete loss of type safety when calling library APIs. Always check for and install the corresponding `@types/` package.

**Incorrect — missing @types packages:**

```bash
# Only installed the runtime package
npm install lodash express cors
# TypeScript now types all lodash/express/cors APIs as any
```

**Correct — install @types for devDependencies:**

```bash
npm install lodash express cors
npm install --save-dev @types/lodash @types/express @types/cors @types/node
```

**Check if a library bundles its own types:**

```bash
# If the package.json has "types" or "typings" field — no @types needed
# Examples: axios, zod, prisma, fastify all ship their own types

# Check before installing:
npm info lodash types        # empty = needs @types/lodash
npm info axios types         # shows path = types bundled
```

**For packages with no @types at all — declare a module:**

```typescript
// src/types/untyped-package.d.ts
declare module 'some-untyped-package' {
  export function doThing(input: string): number;
}
```

Reference: [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
