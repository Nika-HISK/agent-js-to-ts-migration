---
title: Write Generic Async Utility Functions
impact: MEDIUM
impactDescription: "Generic async helpers are reusable without sacrificing type safety"
tags: async, generics, utilities, reusable
---

## Write Generic Async Utility Functions

**Impact: MEDIUM — Generic async helpers are reusable without sacrificing type safety**

JS async utilities (retry, timeout, batch) are usually untyped because they accept any function. TypeScript generics allow these utilities to be fully type-safe and reusable without `any`.

**Incorrect — untyped async utility:**

```javascript
async function retry(fn, times) {
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (e) { if (i === times - 1) throw e; }
  }
}
```

**Correct — generic typed utility:**

```typescript
async function retry<T>(
  fn: () => Promise<T>,
  times: number,
  delay = 0,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < times; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastError = err;
      if (delay > 0 && attempt < times - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// Usage — T is inferred from the callback return type:
const user = await retry(() => fetchUser(id), 3, 500);
// user: User — fully typed, no any
```

Other useful generic async patterns: `withTimeout<T>`, `batch<T, R>`, `memoizeAsync<T>`. Keep generic constraints minimal — use `T` rather than over-constraining.

Reference: [TypeScript Handbook — Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
