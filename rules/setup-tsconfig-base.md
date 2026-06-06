---
title: Start With a Solid tsconfig Base
impact: CRITICAL
impactDescription: "Wrong tsconfig is the #1 cause of silent type-safety holes during migration"
tags: setup, tsconfig, configuration
---

## Start With a Solid tsconfig Base

**Impact: CRITICAL — Wrong tsconfig is the #1 cause of silent type-safety holes during migration**

The tsconfig is the foundation of every TypeScript project. During migration, teams often copy a minimal config that disables important checks, leaving the codebase in a false sense of safety. Start strict-friendly from day one and relax only what you must.

**Incorrect — minimal config that hides problems:**

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs"
  }
}
```

**Correct — migration-ready base config:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": false,
    "noImplicitAny": false,
    "allowJs": true,
    "checkJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Start with `strict: false` and `allowJs: true` to allow incremental migration, then tighten flags per-file as you convert.

Reference: [TypeScript TSConfig Reference](https://www.typescriptlang.org/tsconfig)
