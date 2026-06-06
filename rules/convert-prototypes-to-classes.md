---
title: Convert Prototype Patterns to Typed Classes
impact: HIGH
impactDescription: "Prototype-based code is untypeable — TypeScript class fields give full safety"
tags: convert, classes, prototypes, oop
---

## Convert Prototype Patterns to Typed Classes

**Impact: HIGH — Prototype-based code is untypeable — TypeScript class fields give full safety**

ES5 prototype manipulation is the hardest JS pattern for TypeScript to type. Class syntax with explicit field declarations gives TypeScript everything it needs to infer and enforce types throughout the object lifecycle.

**Incorrect — prototype-based JavaScript:**

```javascript
function User(id, name, email) {
  this.id = id;
  this.name = name;
  this.email = email;
}

User.prototype.greet = function() {
  return 'Hello, ' + this.name;
};

User.prototype.toJSON = function() {
  return { id: this.id, name: this.name };
};
```

**Correct — TypeScript class:**

```typescript
class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
  ) {}

  greet(): string {
    return `Hello, ${this.name}`;
  }

  toJSON(): Pick<User, 'id' | 'name'> {
    return { id: this.id, name: this.name };
  }
}
```

Use constructor parameter shorthand (`public`/`private`/`readonly`) to eliminate field declaration boilerplate. If a class has no methods, prefer a plain `interface` instead.

Reference: [TypeScript Handbook — Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
