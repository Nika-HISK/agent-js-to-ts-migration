---
title: Type Arrays and Collections Properly
impact: HIGH
impactDescription: "Untyped arrays silently accept wrong element types"
tags: types, arrays, collections, generics
---

## Type Arrays and Collections Properly

**Impact: HIGH — Untyped arrays silently accept wrong element types**

JS arrays are heterogeneous by default. During migration, teams often type arrays as `any[]` which provides no safety. Every array should declare its element type.

**Incorrect — untyped or any-typed arrays:**

```typescript
const users: any[] = [];
users.push(42); // no error — wrong type silently pushed

const ids = []; // inferred as never[] — can't push anything
```

**Correct — explicitly typed arrays:**

```typescript
const users: User[] = [];
// Equivalent generic form:
const users: Array<User> = [];

// Readonly arrays for data that shouldn't mutate:
function getIds(users: readonly User[]): number[] {
  return users.map(u => u.id);
}

// Typed Map and Set:
const cache = new Map<string, User>();
const seen = new Set<number>();

// Tuple for fixed-length mixed arrays:
const pair: [string, number] = ['alice', 42];
```

Prefer `readonly` arrays in function parameters to signal that the function won't mutate the input.

Reference: [TypeScript Handbook — Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)
