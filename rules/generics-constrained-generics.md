---
title: Use extends to Constrain Generic Type Parameters
impact: MEDIUM
impactDescription: "Unconstrained generics accept invalid inputs — constraints catch errors at call site"
tags: generics, constraints, extends, type-parameters
---

## Use `extends` to Constrain Generic Type Parameters

**Impact: MEDIUM — Unconstrained generics accept invalid inputs — constraints catch errors at call site**

An unconstrained type parameter `<T>` accepts literally anything — including primitives, null, and functions. When your generic function needs to access properties or call methods, constrain `T` with `extends` to express what the function requires.

**Incorrect — unconstrained generic that fails at runtime:**

```typescript
function getId<T>(entity: T): number {
  return entity.id; // Error: T has no guaranteed 'id' property
}
```

**Correct — constrained generic:**

```typescript
interface WithId {
  id: number;
}

function getId<T extends WithId>(entity: T): number {
  return entity.id; // safe — T is guaranteed to have id
}

// Tighter constraint for repository operations:
function updateEntity<T extends WithId>(
  entities: T[],
  updated: T,
): T[] {
  return entities.map(e => e.id === updated.id ? updated : e);
}

// Key constraint for type-safe property access:
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Constraints are documentation — they communicate the minimum interface a caller must provide. Prefer interface constraints over primitive constraints like `T extends string`.

Reference: [TypeScript Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
