---
title: Define Interfaces to Describe Object Contracts
impact: MEDIUM-HIGH
impactDescription: "Interfaces decouple implementation from consumers — critical for testability"
tags: classes, interfaces, contracts, abstraction
---

## Define Interfaces to Describe Object Contracts

**Impact: MEDIUM-HIGH — Interfaces decouple implementation from consumers — critical for testability**

In JS, duck typing is implicit. TypeScript makes it explicit via interfaces. Every class that gets injected, mocked, or substituted should implement a named interface — this is what allows swapping implementations in tests.

**Incorrect — consumers depend on the concrete class:**

```typescript
class EmailService {
  send(to: string, body: string): void { /* SMTP logic */ }
}

class UserService {
  constructor(private email: EmailService) {} // tightly coupled
}
```

**Correct — depend on interface, not implementation:**

```typescript
interface IEmailService {
  send(to: string, subject: string, body: string): Promise<void>;
}

class SmtpEmailService implements IEmailService {
  async send(to: string, subject: string, body: string): Promise<void> {
    // real SMTP implementation
  }
}

class MockEmailService implements IEmailService {
  readonly sent: Array<{ to: string; subject: string; body: string }> = [];

  async send(to: string, subject: string, body: string): Promise<void> {
    this.sent.push({ to, subject, body });
  }
}

class UserService {
  constructor(private email: IEmailService) {} // works with any implementation
}
```

This pattern enables test doubles without mocking frameworks and makes the dependency graph explicit.

Reference: [TypeScript Handbook — Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
