---
title: Handle null and undefined Explicitly
impact: HIGH
impactDescription: "strictNullChecks eliminates the most common crash category — null dereference"
tags: strict, null, undefined, optional-chaining
---

## Handle `null` and `undefined` Explicitly

**Impact: HIGH — `strictNullChecks` eliminates the most common crash category — null dereference**

Without `strictNullChecks`, `null` and `undefined` are assignable to every type. This is JS behavior emulated in TypeScript. Enabling this flag forces every nullable value to be handled before use.

**Incorrect — ignoring null/undefined:**

```typescript
function getUserName(id: number): string {
  const user = users.find(u => u.id === id);
  return user.name; // Error with strictNullChecks: user may be undefined
}

const element = document.getElementById('app');
element.addEventListener('click', handler); // element may be null
```

**Correct — explicit null handling:**

```typescript
function getUserName(id: number): string {
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new Error(`User ${id} not found`);
  }
  return user.name;
}

// Optional chaining for graceful undefined:
function getUserEmail(id: number): string | undefined {
  return users.find(u => u.id === id)?.email;
}

// Non-null assertion only when you're 100% certain:
const element = document.getElementById('app')!; // use sparingly
```

Prefer nullish coalescing (`??`) and optional chaining (`?.`) over if-checks for concise null handling.

Reference: [TypeScript strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)
