---
title: Write Custom Type Guard Functions
impact: MEDIUM
impactDescription: "Type guards let you narrow unknown/union types safely at runtime boundaries"
tags: guards, type-narrowing, is, predicates
---

## Write Custom Type Guard Functions

**Impact: MEDIUM — Type guards let you narrow `unknown`/union types safely at runtime boundaries**

At system boundaries (API responses, parsed JSON, event payloads), data arrives as `unknown`. TypeScript's type predicate syntax (`value is T`) creates functions that perform a runtime check AND teach the compiler the resulting type.

**Incorrect — casting without verification:**

```typescript
const data: unknown = await fetchData();
const user = data as User; // no runtime check — crashes if shape is wrong
console.log(user.name.toUpperCase()); // potential crash
```

**Correct — type guard with predicate:**

```typescript
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof (value as Record<string, unknown>).id === 'number' &&
    'name' in value &&
    typeof (value as Record<string, unknown>).name === 'string'
  );
}

const data: unknown = await fetchData();
if (!isUser(data)) {
  throw new TypeError('Response does not match User shape');
}
// data is now narrowed to User
console.log(data.name.toUpperCase()); // safe
```

**Compose guards for nested shapes:**

```typescript
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(v => typeof v === 'string');
}
```

Consider `zod` or `valibot` for complex shape validation — they generate both the runtime check and the TypeScript type automatically.

Reference: [TypeScript Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
