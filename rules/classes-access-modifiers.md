---
title: Use Access Modifiers to Enforce Encapsulation
impact: MEDIUM-HIGH
impactDescription: "Without access modifiers, all class internals are public — breaking changes propagate silently"
tags: classes, access-modifiers, encapsulation, private, readonly
---

## Use Access Modifiers to Enforce Encapsulation

**Impact: MEDIUM-HIGH — Without access modifiers, all class internals are public — breaking changes propagate silently**

In JS, everything on a class is public by convention (prefixed `_` is just a signal, not enforcement). TypeScript's `private`, `protected`, `readonly`, and `#` enforce these boundaries at compile time.

**Incorrect — all fields implicitly public:**

```typescript
class UserRepository {
  db: Database;          // Should be private
  tableName: string;     // Should be readonly
  cache: Map<number, User>;

  constructor(db: Database) {
    this.db = db;
    this.tableName = 'users';
    this.cache = new Map();
  }
}
// Callers can do: repo.db.dropTable() — disaster
```

**Correct — explicit access control:**

```typescript
class UserRepository {
  private readonly cache = new Map<number, User>();

  constructor(
    private readonly db: Database,
    private readonly tableName: string = 'users',
  ) {}

  async findById(id: number): Promise<User | undefined> {
    if (this.cache.has(id)) return this.cache.get(id);
    const user = await this.db.query<User>(
      `SELECT * FROM ${this.tableName} WHERE id = ?`, [id]
    );
    if (user) this.cache.set(id, user);
    return user;
  }
}
```

Use `readonly` for anything set only in the constructor. Use `private` for internal state. Use `protected` only when subclasses genuinely need access.

Reference: [TypeScript Class Member Visibility](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)
