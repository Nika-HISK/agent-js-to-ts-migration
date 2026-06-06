---
title: Use Built-in Utility Types Instead of Redefining Them
impact: MEDIUM
impactDescription: "Utility types (Partial, Pick, Omit) eliminate entire categories of manual type work"
tags: generics, utility-types, Partial, Pick, Omit, Required
---

## Use Built-in Utility Types Instead of Redefining Them

**Impact: MEDIUM — Utility types (`Partial`, `Pick`, `Omit`) eliminate entire categories of manual type work**

A common mistake during migration is defining types by hand that TypeScript already provides as utility types. These built-ins compose cleanly and are understood by every TypeScript developer.

**Incorrect — manually duplicating properties:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Bad: manually written partial version
interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
}

// Bad: duplicated without id
interface PublicUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
}
```

**Correct — composed from utility types:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  passwordHash: string;
}

type UpdateUserInput = Partial<Omit<User, 'id' | 'passwordHash'>>;
type PublicUser = Omit<User, 'passwordHash'>;
type RequiredUser = Required<User>; // all fields non-optional
type UserPreview = Pick<User, 'id' | 'name'>;

// For API response shapes:
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
```

Key utility types to know: `Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`, `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`, `ReturnType<F>`, `Parameters<F>`.

Reference: [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
