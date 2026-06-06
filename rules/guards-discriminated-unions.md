---
title: Use Discriminated Unions for State Modeling
impact: MEDIUM
impactDescription: "Discriminated unions eliminate impossible states and make switch exhaustive"
tags: guards, unions, discriminated-unions, state-modeling
---

## Use Discriminated Unions for State Modeling

**Impact: MEDIUM — Discriminated unions eliminate impossible states and make `switch` exhaustive**

JS often models multi-state values with an object that has optional fields — leading to states like `{ loading: true, data: {...} }` which are logically impossible. Discriminated unions encode state directly in the type, making impossible states unrepresentable.

**Incorrect — optional fields allow impossible states:**

```typescript
interface RequestState {
  loading: boolean;
  data?: User;
  error?: Error;
  // loading=true AND data present is logically impossible — but this type allows it
}
```

**Correct — discriminated union:**

```typescript
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };

function renderState(state: RequestState): string {
  switch (state.status) {
    case 'idle':    return 'Not started';
    case 'loading': return 'Loading...';
    case 'success': return `Hello, ${state.data.name}`; // data is available here
    case 'error':   return `Error: ${state.error.message}`;
    default: {
      // Exhaustiveness check — compiler errors if a new case is added but not handled
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}
```

The `never` exhaustiveness check is the most important pattern — it turns forgetting to handle a new union member from a silent runtime bug into a compile-time error.

Reference: [TypeScript Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
