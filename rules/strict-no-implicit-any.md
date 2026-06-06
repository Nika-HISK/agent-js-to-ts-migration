---
title: Fix noImplicitAny Errors — Don't Suppress Them
impact: HIGH
impactDescription: "Suppressing implicit any errors turns TypeScript into a type-erased linter"
tags: strict, noImplicitAny, any, type-safety
---

## Fix `noImplicitAny` Errors — Don't Suppress Them

**Impact: HIGH — Suppressing implicit any errors turns TypeScript into a type-erased linter**

When `noImplicitAny` is enabled, TypeScript errors on untyped function parameters and variables. Teams in a hurry add `// @ts-ignore` or cast to `any` everywhere. This defeats the migration entirely.

**Incorrect — suppressing implicit any with shortcuts:**

```typescript
// @ts-ignore — hides the problem
function process(data) {
  return data.value;
}

// Explicit any — just as bad
function process(data: any) {
  return data.value;
}
```

**Correct — add a real type instead:**

```typescript
interface ProcessInput {
  value: string;
  metadata?: Record<string, unknown>;
}

function process(data: ProcessInput): string {
  return data.value;
}
```

**When you genuinely don't know the shape yet:**

```typescript
// Use unknown + type narrowing — at least it's explicit
function process(data: unknown): string {
  if (typeof data !== 'object' || data === null || !('value' in data)) {
    throw new TypeError('Invalid input shape');
  }
  return String((data as { value: unknown }).value);
}
```

Use `unknown` as a temporary placeholder, not `any`. It forces downstream narrowing and documents that the type is not yet defined.

Reference: [TypeScript noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny)
