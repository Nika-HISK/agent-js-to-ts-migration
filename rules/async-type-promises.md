---
title: Always Type Promise Return Values
impact: MEDIUM-HIGH
impactDescription: "Untyped Promises propagate any through async call chains silently"
tags: async, promises, return-types, generics
---

## Always Type Promise Return Values

**Impact: MEDIUM-HIGH — Untyped Promises propagate `any` through async call chains silently**

`async` functions return `Promise<T>` where `T` is the type of the resolved value. Without an explicit return type annotation, TypeScript infers it — but if the function body contains an untyped `fetch` or `JSON.parse`, the inferred type is `any`, which silently poisons everything downstream.

**Incorrect — untyped async functions:**

```typescript
async function getUser(id: number) {
  const res = await fetch(`/api/users/${id}`);
  return res.json(); // inferred as Promise<any>
}

const user = await getUser(1);
user.nonExistentField; // no error — any has leaked
```

**Correct — explicit Promise<T> return types:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function getUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<User>;
}

// For potentially null results:
async function findUser(id: number): Promise<User | null> {
  const res = await fetch(`/api/users/${id}`);
  if (res.status === 404) return null;
  return res.json() as Promise<User>;
}
```

Use `as Promise<T>` at fetch/parse boundaries — these are trust boundaries where you assert the external data shape.

Reference: [TypeScript async/await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html)
