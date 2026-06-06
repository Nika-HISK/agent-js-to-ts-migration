---
title: Add Explicit Return Types to Functions
impact: CRITICAL
impactDescription: "Inferred return types leak internal changes silently to callers"
tags: types, functions, return-types
---

## Add Explicit Return Types to Functions

**Impact: CRITICAL — Inferred return types leak internal changes silently to callers**

When TypeScript infers return types, a refactor inside the function can silently change the public API. Explicit return types act as a contract — the compiler enforces that the function always returns what it promises.

**Incorrect — relying on inference:**

```typescript
// Returns string | undefined depending on branch — callers won't know
function getUsername(id: number) {
  const user = users.find(u => u.id === id);
  if (user) return user.name;
  // implicitly returns undefined — easy to miss
}

// After refactor, someone adds: return null; — now callers break silently
```

**Correct — explicit return type as a contract:**

```typescript
function getUsername(id: number): string | undefined {
  const user = users.find(u => u.id === id);
  return user?.name;
}

// Async functions — always type the Promise
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  return res.json() as Promise<User>;
}
```

During migration, enable `@typescript-eslint/explicit-function-return-type` as a warning. Fix errors in public API functions first, then internal helpers.

Reference: [TypeScript Handbook — Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
