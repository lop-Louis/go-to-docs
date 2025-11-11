---
title: Answer Ledger Pattern
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
last_reviewed: '2025-11-04'
audience: Team leads and knowledge stewards who maintain shared answers
tone: 'Plainspoken, candid, energetic'
narrative_goal: Show how to capture recurring questions into a searchable ledger
nav_group: Operate
nav_order: 20
nav_label: Answer ledger pattern
nav:
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-04'
---

# Answer Ledger Pattern

Answer ledgers turn recurring questions into searchable, linkable answers. [Stand up your ledger](#what-it-is) or [Browse the runbooks index](./index).

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
