---
title: Replace any With Proper Types
impact: CRITICAL
impactDescription: "any disables TypeScript entirely — it's worse than plain JavaScript"
tags: types, any, type-safety
---

## Replace `any` With Proper Types

**Impact: CRITICAL — `any` disables TypeScript entirely — it's worse than plain JavaScript**

`any` is the escape hatch that defeats the entire purpose of migration. It turns off all type checking for the value and everything derived from it. Every `any` in a migrated codebase is a debt that accumulates interest.

**Incorrect — using any as a migration shortcut:**

```typescript
function processUser(user: any) {
  return user.name.toUpperCase(); // no autocomplete, no safety
}

const result: any = fetchData();
result.nonExistentMethod(); // compiles fine, crashes at runtime
```

**Correct — explicit types or unknown at boundaries:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function processUser(user: User): string {
  return user.name.toUpperCase();
}

// At external boundaries, use unknown and narrow:
const result: unknown = fetchData();
if (typeof result === 'object' && result !== null && 'name' in result) {
  console.log((result as User).name);
}
```

If you truly don't know the type yet, use `unknown` — it forces you to narrow before use, unlike `any` which silently passes everything.

Reference: [TypeScript Handbook — any vs unknown](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)
