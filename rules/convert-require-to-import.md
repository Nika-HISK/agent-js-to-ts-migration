---
title: Convert require() to ES Module Imports
impact: HIGH
impactDescription: "CommonJS require() loses type information and prevents tree-shaking"
tags: convert, modules, require, import, esm, commonjs
---

## Convert `require()` to ES Module Imports

**Impact: HIGH — CommonJS `require()` loses type information and prevents tree-shaking**

`require()` is a runtime function — TypeScript can't always infer types from it, and bundlers can't tree-shake it. Converting to static `import`/`export` gives full type inference, better tooling support, and smaller bundles.

**Incorrect — CommonJS style:**

```javascript
const express = require('express');
const { readFileSync } = require('fs');
const config = require('./config');

module.exports = { createServer };
module.exports.helper = helperFn;
```

**Correct — ES Module style:**

```typescript
import express from 'express';
import { readFileSync } from 'fs';
import config from './config.js';

export { createServer };
export function helper(): void { /* ... */ }
export default createServer;
```

**tsconfig settings needed:**

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true
  }
}
```

Note: with `NodeNext` module resolution, relative imports must include the `.js` extension (TypeScript resolves `.ts` files but emits `.js`).

Reference: [TypeScript — Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
