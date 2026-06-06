---
title: Type Error Handling in Async Code
impact: MEDIUM-HIGH
impactDescription: "Untyped catch blocks silently handle wrong error shapes"
tags: async, errors, catch, error-handling
---

## Type Error Handling in Async Code

**Impact: MEDIUM-HIGH — Untyped `catch` blocks silently handle wrong error shapes**

TypeScript catch clause variables are typed `unknown` (with `useUnknownInCatchVariables`, part of `strict`). Teams often cast them to `Error` directly, which breaks when the thrown value isn't an Error instance (e.g., a plain string or object from a third-party library).

**Incorrect — assuming catch is always an Error:**

```typescript
async function fetchData(url: string) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err: any) {          // any defeats the purpose
    console.error(err.message); // may be undefined if err is a string
    throw err;
  }
}
```

**Correct — narrow the caught value before use:**

```typescript
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

async function fetchData(url: string): Promise<unknown> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err: unknown) {
    if (isError(err)) {
      console.error(`Fetch failed: ${err.message}`);
    } else {
      console.error('Unknown error:', err);
    }
    throw err;
  }
}
```

Create typed custom error classes to distinguish error categories:

```typescript
class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
```

Reference: [TypeScript useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables)
