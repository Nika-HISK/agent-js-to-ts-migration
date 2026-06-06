---
title: Use Proper ESM Import and Export Syntax
impact: HIGH
impactDescription: "Mixed CJS/ESM in one project causes hard-to-debug runtime errors"
tags: modules, esm, imports, exports
---

## Use Proper ESM Import and Export Syntax

**Impact: HIGH — Mixed CJS/ESM in one project causes hard-to-debug runtime errors**

During migration, projects often end up with a mix of `require()` and `import` across files. Node's module system treats them as separate worlds — mixing causes "ERR_REQUIRE_ESM" and similar runtime failures.

**Incorrect — mixed module styles:**

```typescript
import { readFile } from 'fs/promises';        // ESM
const express = require('express');             // CJS mixed in
const { Router } = require('express');         // still CJS

module.exports = router;                        // CJS export
```

**Correct — consistent ESM throughout:**

```typescript
import { readFile } from 'fs/promises';
import express, { Router, Request, Response } from 'express';

const router = Router();

router.get('/users', async (req: Request, res: Response): Promise<void> => {
  const data = await readFile('./users.json', 'utf8');
  res.json(JSON.parse(data));
});

export default router;
export { router };
```

**package.json — declare module format explicitly:**

```json
{
  "type": "module"
}
```

If you can't go full ESM, use `"type": "commonjs"` and only use `require()`. Never mix without explicit `.mjs`/`.cjs` extensions.

Reference: [Node.js ESM Documentation](https://nodejs.org/api/esm.html)
