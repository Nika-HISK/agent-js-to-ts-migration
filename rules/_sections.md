# Sections Overview

This document outlines 10 core sections for JS-to-TypeScript migration, each with assigned impact levels:

**Critical Priority:**
- **Setup & Configuration** (`setup-`) — tsconfig, toolchain, incremental migration strategy. Getting this wrong blocks everything else.
- **Type Annotations** (`types-`) — adding explicit types, eliminating `any`, typing function signatures and object shapes.

**High Impact:**
- **Conversion Patterns** (`convert-`) — translating JS idioms (require, prototypes, callbacks, dynamic objects) to their typed TypeScript equivalents.
- **Strict Mode** (`strict-`) — enabling and incrementally fixing strict TypeScript compiler flags for maximum type safety.
- **Module System** (`modules-`) — migrating from CommonJS to ESM imports/exports, barrel files, and path aliases.

**Medium-High Priority:**
- **Classes & Interfaces** (`classes-`) — typing class members, access modifiers, implementing interfaces, abstract base classes.
- **Async & Promises** (`async-`) — typing Promise return values, async error handling, and generic async utilities.

**Medium Priority:**
- **Generics** (`generics-`) — writing reusable generic functions, constrained generics, and utility types.
- **Type Guards & Narrowing** (`guards-`) — runtime type safety with type predicates, discriminated unions, and assertion functions.

**Low-Medium Priority:**
- **Third-party Types** (`libs-`) — installing @types packages, writing declaration files, and module augmentation.

Each section uses a filename prefix to organize rules systematically.
