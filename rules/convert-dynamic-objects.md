---
title: Replace Dynamic Objects With Typed Records
impact: HIGH
impactDescription: "Untyped dynamic objects cause property-access bugs that only surface at runtime"
tags: convert, objects, records, index-signatures
---

## Replace Dynamic Objects With Typed Records

**Impact: HIGH — Untyped dynamic objects cause property-access bugs that only surface at runtime**

JS code frequently uses objects as dictionaries with dynamic string keys (`obj[key]`). TypeScript has `Record<K, V>` and index signatures to type these patterns safely.

**Incorrect — untyped object dictionary:**

```javascript
const cache = {};
cache[userId] = userData;
// later:
return cache[userId].name; // undefined if userId not in cache — crash
```

**Correct — typed Record with explicit handling:**

```typescript
const cache = new Map<number, User>();
cache.set(userId, userData);

// Retrieve with null safety:
const user = cache.get(userId);
if (!user) throw new Error(`User ${userId} not found in cache`);
return user.name;
```

**When you need a plain object dict — use Record<K,V>:**

```typescript
// Typed string-keyed dictionary:
const labels: Record<string, string> = {};
labels['en'] = 'Hello';

// Known union of keys — even safer:
type Locale = 'en' | 'es' | 'fr';
const labels: Record<Locale, string> = {
  en: 'Hello',
  es: 'Hola',
  fr: 'Bonjour',
};
```

Prefer `Map<K, V>` over `Record` for runtime dictionaries — it handles non-string keys and has safer `.get()` semantics.

Reference: [TypeScript Utility Types — Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)
