---
title: Write Declaration Files for Untyped Libraries
impact: LOW-MEDIUM
impactDescription: "Untyped libraries with no @types pollute the codebase with implicit any"
tags: libs, declarations, d.ts, ambient-modules
---

## Write Declaration Files for Untyped Libraries

**Impact: LOW-MEDIUM — Untyped libraries with no `@types` pollute the codebase with implicit any**

When a library has no types on DefinitelyTyped and doesn't ship its own, you need to write a `.d.ts` ambient module declaration. This gives TypeScript enough information to type-check call sites without reimplementing the entire library.

**Incorrect — using an untyped library without declaration:**

```typescript
import legacy from 'legacy-company-sdk';
// Error: Could not find a declaration file for module 'legacy-company-sdk'
// Implicit type: any
legacy.fetchData({ userId: 123 }); // no type checking whatsoever
```

**Correct — write a minimal ambient declaration:**

```typescript
// src/types/legacy-company-sdk.d.ts
declare module 'legacy-company-sdk' {
  interface FetchOptions {
    userId: number;
    timeout?: number;
  }

  interface UserData {
    id: number;
    name: string;
    roles: string[];
  }

  function fetchData(options: FetchOptions): Promise<UserData>;
  function logout(userId: number): Promise<void>;

  export { fetchData, logout };
  export type { FetchOptions, UserData };
}
```

```json
// tsconfig.json — make sure typeRoots includes your declarations
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"]
  }
}
```

Start with a minimal declaration that covers what your code uses. Add detail incrementally — you don't need to type the entire library on day one.

Reference: [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
