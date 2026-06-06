---
name: js-to-ts-migration
description: JavaScript to TypeScript migration best practices for developers converting existing JS codebases. This skill should be used when renaming .js files to .ts, adding type annotations, fixing TypeScript compiler errors, enabling strict mode, converting CommonJS to ESM, typing async code, writing type guards, or setting up the TypeScript toolchain.
license: MIT
metadata:
  author: Your Name
  version: "1.0.0"
---

# JavaScript to TypeScript Migration

Comprehensive migration guide for converting JavaScript codebases to TypeScript. Contains 34 rules across 10 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:

- Setting up TypeScript in an existing JavaScript project
- Renaming `.js` files to `.ts` and fixing resulting errors
- Adding type annotations to functions, classes, and objects
- Enabling and incrementally fixing `strict` mode
- Converting `require()` / `module.exports` to ES Module `import`/`export`
- Typing `Promise` return values and async error handling
- Writing type guards for API responses and external data
- Installing `@types` packages or writing declaration files
- Reviewing migrated code for remaining `any` types or type holes

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Setup & Configuration | CRITICAL | `setup-` |
| 2 | Type Annotations | CRITICAL | `types-` |
| 3 | Conversion Patterns | HIGH | `convert-` |
| 4 | Strict Mode | HIGH | `strict-` |
| 5 | Module System | HIGH | `modules-` |
| 6 | Classes & Interfaces | MEDIUM-HIGH | `classes-` |
| 7 | Async & Promises | MEDIUM-HIGH | `async-` |
| 8 | Generics | MEDIUM | `generics-` |
| 9 | Type Guards & Narrowing | MEDIUM | `guards-` |
| 10 | Third-party Types | LOW-MEDIUM | `libs-` |

## Quick Reference

### 1. Setup & Configuration (CRITICAL)

- `setup-tsconfig-base` - Start with a migration-ready tsconfig, not a minimal one
- `setup-incremental-migration` - Migrate file-by-file using allowJs, not all at once
- `setup-toolchain` - Use tsx, tsc, and proper build scripts consistently
- `setup-eslint-typescript` - Configure typescript-eslint to catch migration anti-patterns

### 2. Type Annotations (CRITICAL)

- `types-avoid-any` - Replace any with proper types or unknown at boundaries
- `types-explicit-return-types` - Always annotate function return types
- `types-object-shapes` - Define interfaces and type aliases for every object shape
- `types-array-typing` - Type arrays, Maps, Sets, and tuples explicitly

### 3. Conversion Patterns (HIGH)

- `convert-require-to-import` - Replace CommonJS require with ESM import/export
- `convert-prototypes-to-classes` - Convert prototype-based code to typed classes
- `convert-callbacks-to-typed-async` - Replace callbacks with typed async/await
- `convert-dynamic-objects` - Type dynamic object dictionaries with Record<K,V> or Map

### 4. Strict Mode (HIGH)

- `strict-enable-strict` - Enable strict mode incrementally per file, not globally
- `strict-null-checks` - Handle null and undefined explicitly with strictNullChecks
- `strict-no-implicit-any` - Fix noImplicitAny errors with real types, not suppressions
- `strict-property-initialization` - Ensure class properties are initialized properly

### 5. Module System (HIGH)

- `modules-esm-imports` - Use consistent ESM import/export syntax throughout
- `modules-barrel-files` - Type barrel index files with explicit named exports
- `modules-path-aliases` - Configure path aliases to eliminate deep relative imports

### 6. Classes & Interfaces (MEDIUM-HIGH)

- `classes-use-interfaces` - Define interfaces to decouple consumers from implementations
- `classes-access-modifiers` - Use private/readonly/protected to enforce encapsulation
- `classes-abstract-base` - Use abstract classes for shared typed behavior

### 7. Async & Promises (MEDIUM-HIGH)

- `async-type-promises` - Always annotate Promise<T> return types on async functions
- `async-error-types` - Narrow caught errors before use — don't cast to any
- `async-generics-in-async` - Write generic async utilities without losing type safety

### 8. Generics (MEDIUM)

- `generics-reusable-functions` - Make utility functions generic instead of using any
- `generics-constrained-generics` - Use extends to constrain type parameters
- `generics-utility-types` - Use Partial, Pick, Omit, Record instead of redefining types

### 9. Type Guards & Narrowing (MEDIUM)

- `guards-custom-type-guards` - Write type predicates for unknown/union narrowing
- `guards-discriminated-unions` - Model multi-state values as discriminated unions
- `guards-assertion-functions` - Use assertion functions to enforce invariants

### 10. Third-party Types (LOW-MEDIUM)

- `libs-install-types` - Install @types packages for every untyped dependency
- `libs-declaration-files` - Write .d.ts ambient declarations for untyped libraries
- `libs-module-augmentation` - Augment existing types to add runtime-added properties

## How to Use

Read individual rule files for detailed explanations and before/after code examples:

```
rules/setup-tsconfig-base.md
rules/types-avoid-any.md
rules/convert-require-to-import.md
rules/_sections.md
```

Each rule file contains:
- The rule name and impact level
- Explanation of why it matters during migration
- Incorrect JavaScript or poorly-typed TypeScript example
- Correct TypeScript example with full types
- Reference link to official documentation

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`

## Installation

```bash
npx skills add yourusername/agent-js-to-ts-migration
```
