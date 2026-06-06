# agent-js-to-ts-migration

> A structured JavaScript → TypeScript migration skill for AI coding agents.
> 34 rules. 10 categories. Prioritized by real-world impact.

📖 Built for developers who are tired of half-migrated codebases where half the files are `.ts` and half are still `require()`-ing everything.

---

## What this is

This is a **Claude Code skill** (and compatible agent context) that teaches an AI assistant how to properly migrate a JavaScript codebase to TypeScript — not just rename files, but do it right: strict mode, proper interfaces, typed async, no `any` abuse, ESM imports, the works.

Drop it into your project and your AI agent will follow battle-tested migration patterns instead of guessing.

---

## Installation

```bash
npx skills add Nika-HISK/agent-js-to-ts-migration
```

Then invoke it in Claude Code:

```
/js-to-ts-migration
```

Point it at a file or let it scan your project. It will apply the right rules in the right order.

---

## Compatible Agents

- Claude Code (primary)
- Cursor
- GitHub Copilot (via AGENTS.md)
- Any agent that reads project context files

---

## The 34 Rules

Rules are grouped into 10 categories, ordered by how much damage getting them wrong will cause.

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

### A few highlights

**`setup-tsconfig-base`** — The tsconfig you copy from a tutorial will silently hide type errors during migration. This rule gives you a migration-ready base that starts permissive and tightens as you go.

**`types-avoid-any`** — `any` is a migration trap. Once it's in, it spreads. This rule shows how to replace it with `unknown`, proper interfaces, or generics instead.

**`convert-require-to-import`** — CommonJS `require()` loses type information. Static ESM imports give TypeScript everything it needs to infer types across module boundaries.

**`convert-prototypes-to-classes`** — Prototype-based patterns are the hardest thing for TypeScript to type. The fix is straightforward: convert to class syntax with typed fields.

**`strict-null-checks`** — The single rule that eliminates the most runtime crashes. Enable it, fix the errors, never go back.

Full rule list with before/after examples: see [`AGENTS.md`](./AGENTS.md) or browse [`rules/`](./rules/).

---

## Repository Structure

```
agent-js-to-ts-migration/
├── SKILL.md              # Skill entry point — loaded by Claude Code
├── AGENTS.md             # Full compiled guide (all 34 rules expanded)
├── metadata.json         # Version, author, abstract
├── rules/                # One file per rule
│   ├── _template.md      # Template for new rules
│   ├── _sections.md      # Category definitions
│   ├── setup-*.md
│   ├── types-*.md
│   ├── convert-*.md
│   └── ...
└── scripts/
    └── build.js          # Compiles rules/ into AGENTS.md
```

---

## How the Rules Work

Each rule file in `rules/` follows the same structure:

```markdown
---
title: Human-readable title
impact: CRITICAL | HIGH | MEDIUM-HIGH | MEDIUM | LOW-MEDIUM
impactDescription: "One-line explanation of why this matters"
tags: comma, separated, tags
---

## Title

**Impact: LEVEL — why it matters**

Brief explanation of the problem pattern.

**Incorrect — what people usually write:**
\`\`\`javascript
// bad JS or untyped TS
\`\`\`

**Correct — what it should look like:**
\`\`\`typescript
// properly typed TS
\`\`\`

Reference: [link to official docs]
```

Rules are automatically sorted and compiled into `AGENTS.md` by the build script — no need to manage ordering by hand.

---

## Adding a New Rule

1. Copy `rules/_template.md` and name it using the appropriate prefix (`setup-`, `types-`, `convert-`, etc.)
2. Fill in the frontmatter: title, impact level, impact description, tags
3. Write the explanation, incorrect example, correct example, and reference link
4. Run the build script to recompile `AGENTS.md`:

```bash
node scripts/build.js
```

That's it. The rule will be picked up automatically.

---

## Impact Levels

| Level | Meaning |
|-------|---------|
| CRITICAL | Getting this wrong causes silent type holes or broken migrations |
| HIGH | Skipping this leads to real bugs or painful refactors later |
| MEDIUM-HIGH | Important for correctness at scale, easy to defer but costly |
| MEDIUM | Good practice that pays off when the codebase grows |
| LOW-MEDIUM | Incremental polish — do it eventually, not on day one |

---

## Why prioritize setup and type annotations first?

Because the order matters. If you start converting files without a proper tsconfig, the compiler won't catch what it should. If you convert modules but leave everything typed as `any`, you haven't migrated — you've just renamed files. The priority order in this skill reflects the failure modes that actually happen in real migrations, not an alphabetical list of TypeScript features.

---

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
- [typescript-eslint](https://typescript-eslint.io/)
- [Total TypeScript](https://www.totaltypescript.com/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

---

## Contributing

PRs welcome. If you've hit a migration pattern that isn't covered here — a gnarly CommonJS edge case, a tricky third-party typing problem, a strict-mode error that took you a day to figure out — that's exactly the kind of thing that belongs in a rule.

Open an issue or submit a rule file directly.

---

MIT License
