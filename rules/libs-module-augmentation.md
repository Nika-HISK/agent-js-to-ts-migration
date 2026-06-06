---
title: Use Module Augmentation to Extend Existing Type Definitions
impact: LOW-MEDIUM
impactDescription: "Module augmentation extends third-party types without forking them"
tags: libs, module-augmentation, declaration-merging, extend-types
---

## Use Module Augmentation to Extend Existing Type Definitions

**Impact: LOW-MEDIUM — Module augmentation extends third-party types without forking them**

Sometimes you add properties to a library's objects at runtime (e.g., adding `user` to Express's `Request`, or extending `process.env`). Without augmentation, TypeScript doesn't know about these additions and will error on every access.

**Incorrect — casting to any to access added properties:**

```typescript
app.use((req: any, res, next) => {
  req.user = await getUserFromToken(req.headers.authorization);
  next();
});

// Later:
app.get('/profile', (req: any, res) => {
  res.json(req.user); // any — no type safety
});
```

**Correct — module augmentation:**

```typescript
// src/types/express.d.ts
import { User } from '../models/user.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      requestId: string;
    }
  }
}

// Now req.user is typed everywhere without casting:
app.use(async (req, res, next) => {
  req.user = await getUserFromToken(req.headers.authorization);
  req.requestId = crypto.randomUUID();
  next();
});

app.get('/profile', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  res.json(req.user); // User — fully typed
});
```

**Extending process.env:**

```typescript
// src/types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DATABASE_URL: string;
    JWT_SECRET: string;
    PORT?: string;
  }
}
```

Reference: [TypeScript Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
