---
title: Use Typed Barrel Files for Public Module APIs
impact: MEDIUM
impactDescription: "Barrel files without types cause implicit any re-exports"
tags: modules, barrel, index, exports
---

## Use Typed Barrel Files for Public Module APIs

**Impact: MEDIUM — Barrel files without types cause implicit any re-exports**

Barrel files (`index.ts`) define the public API surface of a module. During migration, JS barrel files using `module.exports = require(...)` lose all type information. TypeScript barrel files must use explicit named exports.

**Incorrect — JS barrel re-exporting without types:**

```javascript
// index.js
module.exports = {
  ...require('./user'),
  ...require('./auth'),
};
// All type info is lost — consumers get any
```

**Correct — typed TypeScript barrel:**

```typescript
// src/users/index.ts
export { UserService } from './user.service.js';
export { UserRepository } from './user.repository.js';
export type { User, CreateUserInput, UpdateUserInput } from './user.types.js';
```

**Note: export type for type-only re-exports:**

```typescript
// Separate value exports from type exports
export { createUser, deleteUser } from './user.service.js';   // values
export type { User, UserRole } from './user.types.js';        // types only
```

Use `export type` for interfaces and type aliases — this enables `verbatimModuleSyntax` in tsconfig and prevents type-only imports from being emitted as runtime code.

Reference: [TypeScript — Re-exports](https://www.typescriptlang.org/docs/handbook/2/modules.html#re-exporting)
