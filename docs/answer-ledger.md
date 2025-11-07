---
title: Answer Ledger Pattern
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
last_reviewed: '2025-11-04'
audience: Team leads and knowledge stewards who maintain shared answers
tone: Plainspoken, candid, energetic
narrative_goal: Show how to capture recurring questions into a searchable ledger
nav_group: Contributor Kit
nav_order: 20
nav:
  - sidebar
---

# Answer Ledger Pattern

Answer ledgers turn recurring questions into searchable, linkable answers. <a href="#what-it-is" data-primary-action>Stand up your ledger</a> or <a href="./runbooks/index" data-secondary-action>Browse the runbooks index</a>.

- **What**: Structured, searchable list of recurring questions with their current canonical answers.
- **Why**: Saves time, reduces interruptions, and accelerates onboarding by turning chatter into linkable knowledge.
- **When**: After a question is answered twice, or when a decision needs a stable reference others can reuse.

## What it is

A searchable log of questions teams ask repeatedly, with:

- The question (as commonly phrased)
- The current answer
- When it was last updated
- Who to ask for clarification

## Why use it

- **Saves time**: Answer once, link forever
- **Onboards faster**: New joiners self-serve
- **Reduces interruptions**: Async > tapping on shoulder
- **Tracks drift**: When answers change, you notice

## Format example

```markdown
## How do we handle API versioning?

**Answer:** We use URL path versioning (e.g., `/v1/users`, `/v2/users`).
Breaking changes require a new version. Non-breaking changes can be added
to existing versions.

**Last updated:** YYYY-MM-DD  
**Owner:** @handle  
**Related:** [API Guidelines](./api-guidelines)
```
