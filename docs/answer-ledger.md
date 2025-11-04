---
title: Answer Ledger Pattern
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
---

# Answer Ledger Pattern

A living document that captures recurring questions and their canonical answers.

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

**Last updated:** 2024-10-15  
**Owner:** @api-guild  
**Related:** [API Guidelines](./api-guidelines.md)

---

## What's our code review SLA?

**Answer:** First review within 4 business hours for PRs under 200 lines.
Larger PRs should be split or flagged in advance.

**Last updated:** 2024-09-20  
**Owner:** @platform-team
```

## Maintenance

- Review quarterly
- Archive questions not asked in 6 months
- Flag contradictions between answers
- Update when decisions change

## Integration

Works well with:

- [Decision Spine](./decision-spine) - ledger stores decision outcomes
- Team wikis - ledger is the FAQ section
- Onboarding docs - link to ledger entries

## Anti-patterns

- ❌ Dumping everything into one giant page (use sections or multiple pages)
- ❌ Stale answers without dates (always timestamp)
- ❌ No ownership (mark who maintains each answer)
- ❌ Vague questions ("How do we deploy?" - too broad, split into specifics)

## Success metrics

Track:

- Number of repeat questions in chat (should decrease)
- Time to onboard new team members (should decrease)
- Link-back rate (ledger links shared in conversations)
