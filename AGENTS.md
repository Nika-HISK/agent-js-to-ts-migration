# JavaScript to TypeScript Migration Guide

**Version:** 1.0.0 | **Date:** June 2026

Comprehensive migration guide for converting JavaScript codebases to TypeScript, designed for AI agents and LLMs. Contains 34 rules across 10 categories, prioritized by impact from critical (setup, type annotations) to incremental (third-party types, generics). Each rule includes detailed explanations, real-world before/after code examples, and reference links.

---

## CATEGORY 1: Setup & Configuration (CRITICAL)

### setup-tsconfig-base — Start With a Solid tsconfig Base

**Impact: CRITICAL — Wrong tsconfig is the #1 cause of silent type-safety holes during migration**

The tsconfig is the foundation of every TypeScript project. During migration, teams often copy a minimal config that disables important checks. Start with a migration-ready base.

**Incorrect:**
```json
{ "compilerOptions": { "target": "es5", "module": "commonjs" } }
```

**Correct:**
```json
{
  "compilerOptions": {
    "target": "ES2020", "module": "NodeNext", "moduleResolution": "NodeNext",
    "outDir": "./dist", "rootDir": "./src", "declaration": true,
    "sourceMap": true, "strict": false, "allowJs": true, "checkJs": false,
    "skipLibCheck": true, "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true, "resolveJsonModule": true
  }
}
```

---

### setup-incremental-migration — Migrate Files Incrementally with allowJs

**Impact: CRITICAL — Trying to convert everything at once causes weeks-long broken builds**

Use `allowJs` to coexist `.js` and `.ts` files. Convert leaf modules first (bottom of dependency tree), work upward. ~5-10 files per PR.

---

### setup-toolchain — Set Up the TypeScript Toolchain Correctly

**Impact: CRITICAL — Wrong toolchain causes dev/prod type divergence**

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc --noEmit && tsc -p tsconfig.build.json",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit"
  }
}
```

Use `tsx` for development. Always have a separate `typecheck` script in CI.

---

### setup-eslint-typescript — Configure ESLint with TypeScript Rules

**Impact: HIGH — Catches migration anti-patterns automatically**

```js
import tseslint from 'typescript-eslint';
export default tseslint.config(tseslint.configs.recommended, {
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
  },
});
```

---

## CATEGORY 2: Type Annotations (CRITICAL)

### types-avoid-any — Replace any With Proper Types

**Impact: CRITICAL — `any` disables TypeScript entirely**

Use `unknown` at external boundaries. Narrow with type guards before use. Never use `any` as a migration shortcut — it's worse than plain JavaScript.

**Incorrect:** `function processUser(user: any)`
**Correct:** `function processUser(user: User): string`

---

### types-explicit-return-types — Add Explicit Return Types to Functions

**Impact: CRITICAL — Inferred return types leak internal changes silently to callers**

```typescript
function getUsername(id: number): string | undefined { ... }
async function fetchUser(id: number): Promise<User> { ... }
```

---

### types-object-shapes — Use Interfaces and Type Aliases for Object Shapes

**Impact: CRITICAL — Untyped objects are the primary source of property-access runtime errors**

```typescript
interface CreateUserInput { id: number; name: string; email: string; }
interface User extends CreateUserInput { createdAt: Date; }
```

Use `interface` for shapes that may be extended; `type` for unions, intersections, tuples.

---

### types-array-typing — Type Arrays and Collections Properly

**Impact: HIGH — Untyped arrays silently accept wrong element types**

```typescript
const users: User[] = [];
const cache = new Map<string, User>();
const seen = new Set<number>();
const pair: [string, number] = ['alice', 42];
```

Prefer `readonly` arrays in function parameters.

---

## CATEGORY 3: Conversion Patterns (HIGH)

### convert-require-to-import — Convert require() to ES Module Imports

**Impact: HIGH — CommonJS require() loses type information and prevents tree-shaking**

```typescript
// Before: const express = require('express');
// After:
import express from 'express';
import { readFileSync } from 'fs';
export { createServer };
export default createServer;
```

Set `"module": "NodeNext"` and `"esModuleInterop": true` in tsconfig. Relative imports need `.js` extension with NodeNext.

---

### convert-prototypes-to-classes — Convert Prototype Patterns to Typed Classes

**Impact: HIGH — Prototype-based code is untypeable**

```typescript
class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
  ) {}
  greet(): string { return `Hello, ${this.name}`; }
}
```

---

### convert-callbacks-to-typed-async — Convert Callbacks to Typed Async/Await

**Impact: HIGH — Callback types are error-prone; async/await enables full Promise<T> typing**

```typescript
async function readConfig(path: string): Promise<AppConfig> {
  const data = await readFile(path, 'utf8');
  return JSON.parse(data) as AppConfig;
}
```

Use `util.promisify` to wrap existing Node callback APIs.

---

### convert-dynamic-objects — Replace Dynamic Objects With Typed Records

**Impact: HIGH — Untyped dynamic objects cause property-access bugs**

Prefer `Map<K, V>` over `Record` for runtime dictionaries. Use `Record<Locale, string>` for known union keys.

---

## CATEGORY 4: Strict Mode (HIGH)

### strict-enable-strict — Enable Strict Mode Incrementally Per File

**Impact: HIGH — strict mode catches 60-80% of all TypeScript bugs**

Keep `strict: false` globally. Create `tsconfig.strict.json` that extends the base and covers only fully-converted files. Run it in CI separately.

---

### strict-null-checks — Handle null and undefined Explicitly

**Impact: HIGH — strictNullChecks eliminates the most common crash category**

```typescript
// Use optional chaining for graceful undefined:
function getUserEmail(id: number): string | undefined {
  return users.find(u => u.id === id)?.email;
}
// Avoid non-null assertion (!) — it suppresses the check
```

---

### strict-no-implicit-any — Fix noImplicitAny Errors — Don't Suppress Them

**Impact: HIGH — Suppressing implicit any errors defeats the migration**

Replace implicit `any` with a real interface or `unknown`. Use `unknown` as a temporary placeholder — it forces downstream narrowing unlike `any`.

---

### strict-property-initialization — Ensure Class Properties Are Properly Initialized

**Impact: MEDIUM-HIGH — strictPropertyInitialization catches class fields used before assignment**

Prefer constructor injection to eliminate ordering bugs. Use `!` (definite assignment) sparingly and only when you're certain.

---

## CATEGORY 5: Module System (HIGH)

### modules-esm-imports — Use Proper ESM Import and Export Syntax

**Impact: HIGH — Mixed CJS/ESM causes hard-to-debug runtime errors**

Set `"type": "module"` in package.json for full ESM. Never mix `require()` and `import` in the same project without explicit `.mjs`/`.cjs` extensions.

---

### modules-barrel-files — Use Typed Barrel Files for Public Module APIs

**Impact: MEDIUM — Barrel files without types cause implicit any re-exports**

```typescript
export { UserService } from './user.service.js';
export type { User, CreateUserInput } from './user.types.js';
```

Use `export type` for type-only re-exports.

---

### modules-path-aliases — Configure Path Aliases to Eliminate Relative Hell

**Impact: MEDIUM — Deep relative imports break on refactor**

```json
{ "paths": { "@shared/*": ["src/shared/*"], "@/*": ["src/*"] } }
```

Also configure your bundler or use `tsconfig-paths` for runtime support.

---

## CATEGORY 6: Classes & Interfaces (MEDIUM-HIGH)

### classes-use-interfaces — Define Interfaces to Describe Object Contracts

**Impact: MEDIUM-HIGH — Interfaces decouple consumers from implementations**

```typescript
interface IEmailService { send(to: string, subject: string, body: string): Promise<void>; }
class SmtpEmailService implements IEmailService { ... }
class MockEmailService implements IEmailService { ... }
```

---

### classes-access-modifiers — Use Access Modifiers to Enforce Encapsulation

**Impact: MEDIUM-HIGH — Without modifiers, all class internals are public**

```typescript
class UserRepository {
  private readonly cache = new Map<number, User>();
  constructor(private readonly db: Database) {}
}
```

Use `readonly` for constructor-only fields. Use `private` for internal state.

---

### classes-abstract-base — Use Abstract Classes for Shared Typed Behavior

**Impact: MEDIUM — Abstract classes enforce implementation contracts across subclasses**

```typescript
abstract class BaseRepository<T extends { id: number }> {
  abstract find(id: number): Promise<T | undefined>;
  abstract save(entity: T): Promise<T>;
  async delete(id: number): Promise<void> { /* shared logic */ }
}
```

---

## CATEGORY 7: Async & Promises (MEDIUM-HIGH)

### async-type-promises — Always Type Promise Return Values

**Impact: MEDIUM-HIGH — Untyped Promises propagate any through async call chains**

```typescript
async function getUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<User>;
}
```

---

### async-error-types — Type Error Handling in Async Code

**Impact: MEDIUM-HIGH — Untyped catch blocks silently handle wrong error shapes**

```typescript
catch (err: unknown) {
  if (err instanceof Error) { console.error(err.message); }
}
```

Create typed custom error classes for categorizing errors.

---

### async-generics-in-async — Write Generic Async Utility Functions

**Impact: MEDIUM — Generic async helpers are reusable without sacrificing type safety**

```typescript
async function retry<T>(fn: () => Promise<T>, times: number, delay = 0): Promise<T>
```

---

## CATEGORY 8: Generics (MEDIUM)

### generics-reusable-functions — Make Utility Functions Generic Instead of Using any

**Impact: MEDIUM — Generic utilities are typed at call site**

```typescript
function pick<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K>
```

---

### generics-constrained-generics — Use extends to Constrain Generic Type Parameters

**Impact: MEDIUM — Unconstrained generics accept invalid inputs**

```typescript
function getId<T extends { id: number }>(entity: T): number { return entity.id; }
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }
```

---

### generics-utility-types — Use Built-in Utility Types Instead of Redefining Them

**Impact: MEDIUM — Utility types eliminate manual type duplication**

Key utility types: `Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T,K>`, `Omit<T,K>`, `Record<K,V>`, `NonNullable<T>`, `ReturnType<F>`, `Parameters<F>`

```typescript
type UpdateUserInput = Partial<Omit<User, 'id' | 'passwordHash'>>;
type PublicUser = Omit<User, 'passwordHash'>;
```

---

## CATEGORY 9: Type Guards & Narrowing (MEDIUM)

### guards-custom-type-guards — Write Custom Type Guard Functions

**Impact: MEDIUM — Type guards narrow unknown/union types safely at runtime boundaries**

```typescript
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof (value as any).id === 'number';
}
```

Consider `zod` or `valibot` for complex shape validation.

---

### guards-discriminated-unions — Use Discriminated Unions for State Modeling

**Impact: MEDIUM — Discriminated unions eliminate impossible states**

```typescript
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };

// Always include the exhaustiveness check:
default: { const _exhaustive: never = state; return _exhaustive; }
```

---

### guards-assertion-functions — Use Assertion Functions for Invariant Enforcement

**Impact: MEDIUM — Assertion functions narrow types for the rest of the block**

```typescript
function assertDefined<T>(value: T | null | undefined, label: string): asserts value is T {
  if (value == null) throw new Error(`Expected ${label} to be defined`);
}
```

---

## CATEGORY 10: Third-party Types (LOW-MEDIUM)

### libs-install-types — Install @types Packages for Every Untyped Dependency

**Impact: LOW-MEDIUM — Missing @types causes entire third-party APIs to be typed as any**

```bash
npm install --save-dev @types/lodash @types/express @types/node
```

Check if a package ships its own types before installing — look for a `"types"` field in its `package.json`.

---

### libs-declaration-files — Write Declaration Files for Untyped Libraries

**Impact: LOW-MEDIUM — Untyped libraries with no @types pollute with implicit any**

```typescript
// src/types/legacy-sdk.d.ts
declare module 'legacy-sdk' {
  function fetchData(options: { userId: number }): Promise<UserData>;
  export { fetchData };
}
```

Add `"typeRoots": ["./node_modules/@types", "./src/types"]` to tsconfig.

---

### libs-module-augmentation — Use Module Augmentation to Extend Existing Type Definitions

**Impact: LOW-MEDIUM — Augmentation extends third-party types without forking them**

```typescript
// For Express Request:
declare global {
  namespace Express {
    interface Request { user?: User; requestId: string; }
  }
}

// For process.env:
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DATABASE_URL: string;
  }
}
```

---

*End of JS → TypeScript Migration Guide v1.0.0*
