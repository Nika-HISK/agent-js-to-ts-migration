---
title: Make Utility Functions Generic Instead of Using any
impact: MEDIUM
impactDescription: "Generic utilities are typed at call site — no casting needed by callers"
tags: generics, utilities, reusable, type-parameters
---

## Make Utility Functions Generic Instead of Using `any`

**Impact: MEDIUM — Generic utilities are typed at call site — no casting needed by callers**

JS utility functions (identity, pick, groupBy, memoize) work on any value. During migration, teams type these with `any`, which causes all callers to lose type information. Generics solve this properly.

**Incorrect — utility typed with any:**

```typescript
function pick(obj: any, keys: string[]): any {
  return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

const picked = pick(user, ['id', 'name']);
picked.id;   // any — no autocomplete, no safety
```

**Correct — generic utility:**

```typescript
function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => ({ ...acc, [key]: obj[key] }),
    {} as Pick<T, K>,
  );
}

const picked = pick(user, ['id', 'name'] as const);
// picked: Pick<User, 'id' | 'name'> — fully typed
```

**More examples:**

```typescript
// Generic identity
const identity = <T>(value: T): T => value;

// Generic groupBy
function groupBy<T>(items: T[], key: keyof T): Map<T[keyof T], T[]> {
  return items.reduce((map, item) => {
    const group = item[key];
    return map.set(group, [...(map.get(group) ?? []), item]);
  }, new Map<T[keyof T], T[]>());
}
```

Reference: [TypeScript Handbook — Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
