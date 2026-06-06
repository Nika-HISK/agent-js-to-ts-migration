---
title: Use Assertion Functions for Invariant Enforcement
impact: MEDIUM
impactDescription: "Assertion functions narrow types for the rest of the block — no repeated guards"
tags: guards, assertions, asserts, invariants
---

## Use Assertion Functions for Invariant Enforcement

**Impact: MEDIUM — Assertion functions narrow types for the rest of the block — no repeated guards**

TypeScript 3.7 introduced `asserts value is T` — functions that throw if a condition isn't met, and narrow the type for all subsequent code in the same scope. This replaces repeated null checks and inline type guards.

**Incorrect — repeated inline null checks:**

```typescript
async function updateUser(id: number, data: UpdateUserInput): Promise<User> {
  const user = await db.users.findById(id);
  if (!user) throw new Error('User not found'); // check #1
  
  if (!user.email) throw new Error('User has no email'); // check #2
  
  // Still typed as User | undefined — TypeScript doesn't remember the checks
  await sendNotification(user.email); // potential error depending on TS narrowing
  return db.users.update(user.id, data);
}
```

**Correct — assertion functions that persist narrowing:**

```typescript
function assertDefined<T>(value: T | null | undefined, label: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`Expected ${label} to be defined`);
  }
}

function assertNonEmpty(value: string, label: string): asserts value is string {
  if (!value.trim()) {
    throw new Error(`Expected ${label} to be non-empty`);
  }
}

async function updateUser(id: number, data: UpdateUserInput): Promise<User> {
  const user = await db.users.findById(id);
  assertDefined(user, `User(${id})`);
  assertNonEmpty(user.email, 'user.email');

  // user is now narrowed to User (not undefined) for the rest of this scope
  await sendNotification(user.email);
  return db.users.update(user.id, data);
}
```

Reference: [TypeScript Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
