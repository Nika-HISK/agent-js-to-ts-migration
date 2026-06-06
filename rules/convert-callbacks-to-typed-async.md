---
title: Convert Callbacks to Typed Async/Await
impact: HIGH
impactDescription: "Callback types are error-prone; async/await enables full Promise<T> typing"
tags: convert, async, callbacks, promises
---

## Convert Callbacks to Typed Async/Await

**Impact: HIGH — Callback types are error-prone; async/await enables full `Promise<T>` typing**

Node-style callbacks (`(err, result) => void`) are difficult to type correctly and impossible to compose safely. Converting to `async`/`await` unlocks `Promise<T>` return types, proper error propagation, and cleaner control flow.

**Incorrect — Node-style callback pattern:**

```javascript
function readConfig(path, callback) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) return callback(err);
    try {
      callback(null, JSON.parse(data));
    } catch (e) {
      callback(e);
    }
  });
}
```

**Correct — typed async/await:**

```typescript
import { readFile } from 'fs/promises';

interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

async function readConfig(path: string): Promise<AppConfig> {
  const data = await readFile(path, 'utf8');
  return JSON.parse(data) as AppConfig;
}
```

**Wrapping existing callback APIs with util.promisify:**

```typescript
import { promisify } from 'util';
import { readFile } from 'fs';

const readFileAsync = promisify(readFile);
const data: Buffer = await readFileAsync('./config.json');
```

Reference: [Node.js util.promisify](https://nodejs.org/api/util.html#utilpromisifyoriginal)
