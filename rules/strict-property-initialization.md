---
title: Ensure Class Properties Are Properly Initialized
impact: MEDIUM-HIGH
impactDescription: "strictPropertyInitialization catches class fields used before assignment"
tags: strict, classes, property-initialization
---

## Ensure Class Properties Are Properly Initialized

**Impact: MEDIUM-HIGH — `strictPropertyInitialization` catches class fields used before assignment**

In JS, class properties are often set conditionally or asynchronously after construction. TypeScript's `strictPropertyInitialization` errors on class fields that aren't guaranteed to be set in the constructor.

**Incorrect — property assigned outside constructor:**

```typescript
class UserService {
  private db: Database; // Error: not definitely assigned

  async init() {
    this.db = await Database.connect(); // too late — TypeScript doesn't see this
  }

  async getUser(id: number) {
    return this.db.find(id); // db could be uninitialized
  }
}
```

**Correct — use definite assignment or constructor initialization:**

```typescript
// Option 1: inject via constructor
class UserService {
  constructor(private readonly db: Database) {}

  async getUser(id: number): Promise<User> {
    return this.db.find(id);
  }
}

// Option 2: definite assignment assertion (when lazy init is truly needed)
class UserService {
  private db!: Database; // ! = "trust me, I'll assign before use"

  async init(): Promise<void> {
    this.db = await Database.connect();
  }
}

// Option 3: make it optional
class UserService {
  private db: Database | undefined;

  getDb(): Database {
    if (!this.db) throw new Error('Not initialized');
    return this.db;
  }
}
```

Prefer constructor injection (Option 1) — it eliminates initialization ordering bugs entirely.

Reference: [TypeScript strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization)
