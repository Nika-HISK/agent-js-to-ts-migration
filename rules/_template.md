---
title: Rule Title Here
impact: MEDIUM
impactDescription: Optional description of impact (e.g., "eliminates entire class of runtime errors")
tags: tag1, tag2
---

## Rule Title Here

**Impact: MEDIUM (optional impact description)**

Brief explanation of the rule and why it matters during JS→TS migration. This should be clear and concise.

**Incorrect — JavaScript (or untyped TypeScript):**

```typescript
// Bad: what the JS pattern looks like or typed poorly
const bad = example()
```

**Correct — TypeScript:**

```typescript
// Good: the properly typed TypeScript version
const good: ExampleType = example()
```

Reference: [Link to documentation or resource](https://www.typescriptlang.org/docs/)
