---
title: Use Interfaces and Type Aliases for Object Shapes
impact: CRITICAL
impactDescription: "Untyped objects are the primary source of property-access runtime errors"
tags: types, interfaces, type-aliases, objects
---

## Use Interfaces and Type Aliases for Object Shapes

**Impact: CRITICAL — Untyped objects are the primary source of property-access runtime errors**

In JS, objects are open — any property can be read or written. TypeScript closes them. Every JS object literal that passes between functions needs a named shape defined as an `interface` or `type`.

**Incorrect — passing plain object literals without types:**

```typescript
// JS style — no shape, no safety
function createUser(data) {
  return {
    id: data.id,
    name: data.name,
    // typo: data.emal — JS silently gives undefined
  };
}
```

**Correct — named interface for every domain object:**

```typescript
interface CreateUserInput {
  id: number;
  name: string;
  email: string;
}

interface User extends CreateUserInput {
  createdAt: Date;
}

function createUser(data: CreateUserInput): User {
  return {
    ...data,
    createdAt: new Date(),
  };
}
```

**When to use `interface` vs `type`:**
- `interface` — for object shapes that may be extended or implemented by classes
- `type` — for unions, intersections, tuples, or computed shapes

Reference: [TypeScript Handbook — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
