---
title: Configure Path Aliases to Eliminate Relative Hell
impact: MEDIUM
impactDescription: "Deep relative imports (../../../) break on refactor and hurt readability"
tags: modules, paths, tsconfig, aliases
---

## Configure Path Aliases to Eliminate Relative Hell

**Impact: MEDIUM — Deep relative imports (`../../../`) break on refactor and hurt readability**

JS projects frequently grow into `require('../../../utils/format')` chains. TypeScript's `paths` option in tsconfig creates short aliases that are both readable and refactor-safe.

**Incorrect — deep relative import chains:**

```typescript
import { formatDate } from '../../../shared/utils/format.js';
import { UserService } from '../../services/user/user.service.js';
import { DB_CONFIG } from '../../../../config/database.js';
```

**Correct — path aliases:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["src/shared/*"],
      "@services/*": ["src/services/*"],
      "@config/*": ["src/config/*"],
      "@/*": ["src/*"]
    }
  }
}
```

```typescript
// Clean, stable imports:
import { formatDate } from '@shared/utils/format.js';
import { UserService } from '@services/user/user.service.js';
import { DB_CONFIG } from '@config/database.js';
```

**Build tool support needed:** `tsconfig` paths only work for type-checking. For runtime, also configure your bundler (Vite, webpack, esbuild) or use `tsconfig-paths` for Node.

Reference: [TypeScript paths option](https://www.typescriptlang.org/tsconfig#paths)
