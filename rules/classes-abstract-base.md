---
title: Use Abstract Classes for Shared Typed Behavior
impact: MEDIUM
impactDescription: "Abstract classes enforce implementation contracts across subclasses"
tags: classes, abstract, inheritance, base-class
---

## Use Abstract Classes for Shared Typed Behavior

**Impact: MEDIUM — Abstract classes enforce implementation contracts across subclasses**

JS base classes with throw-not-implemented stubs are a common pattern for sharing behavior while forcing subclasses to implement specifics. TypeScript's `abstract` keyword makes this intent explicit and compiler-enforced.

**Incorrect — manual "abstract" pattern:**

```javascript
class BaseRepository {
  find(id) {
    throw new Error('Not implemented');
  }

  async save(entity) {
    throw new Error('Not implemented');
  }

  async delete(id) {
    await this.find(id); // calls subclass — but JS won't warn if not overridden
  }
}
```

**Correct — TypeScript abstract class:**

```typescript
abstract class BaseRepository<T extends { id: number }> {
  abstract find(id: number): Promise<T | undefined>;
  abstract save(entity: T): Promise<T>;

  async delete(id: number): Promise<void> {
    const entity = await this.find(id);
    if (!entity) throw new Error(`Entity ${id} not found`);
    await this.remove(entity);
  }

  protected abstract remove(entity: T): Promise<void>;
}

class UserRepository extends BaseRepository<User> {
  async find(id: number): Promise<User | undefined> {
    return this.db.users.findUnique({ where: { id } });
  }

  async save(user: User): Promise<User> {
    return this.db.users.upsert({ where: { id: user.id }, data: user });
  }

  protected async remove(user: User): Promise<void> {
    await this.db.users.delete({ where: { id: user.id } });
  }
}
```

Reference: [TypeScript Abstract Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
