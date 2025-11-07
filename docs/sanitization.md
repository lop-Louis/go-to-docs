---
title: Sanitization Guidance
band: A
owner: '@lop'
refresh_after_days: 60
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Contributors preparing public-safe guidance
tone: Plainspoken, candid, energetic
narrative_goal: Show how to strip risk while keeping guidance useful
primary_action: Run these sanitization checks before shipping or reviewing a page
---

# Sanitization Guidance

Northbook only publishes guidance that the public can quote without a second thought. Use these guardrails to keep every page linkable while chore-like checklists stay in `/runbooks`.

> **Primary action:** Run these sanitization checks before shipping or reviewing a page.

## What Sanitization Protects

- **People** — strip personal data, names, emails, or avatars that could identify someone.
- **Systems** — remove URLs, ticket IDs, and architecture breadcrumbs tied to internal tools.
- **Signals** — convert precise numbers or dates into ranges and relative time so nothing leaks velocity or runway.
- **Brand** — recreate screenshots with dummy data instead of redacting; avoid dragging internal UI chrome into public view.

If a fact is safe enough for a press release, it is safe enough for Northbook.

## Rewrite Instead of Redact

| Risky detail                               | Public-safe rewrite                                               |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `Ticket like JIRA-#### blocked our deploy` | `TICKET-ID blocked the deploy`                                    |
| `Shipped 17 dashboards on March 12`        | `Shipped the dashboards mid-March`                                |
| `Internal billing URL: https://billing`    | `INTERNAL-URL` or describe the action (“Open the billing portal”) |
| `Contact Alice for access`                 | `Contact @handle for access`                                      |

This table is not exhaustive—sanitization is a judgment call. When in doubt, swap in a placeholder or cut the detail entirely.

## Code and Content Requirements

- Use original or permissively licensed snippets; cite the source inline when you adapt code.
- Never ship tokens, secrets, or environment values. Obvious, but easy to miss—run the guard script if you touched config.
- Prefer intent-focused prose (“Explain why the guard exists”) over step-by-step chores.

## Frontmatter Contract

Every guidance page must open with Band A frontmatter so automation can track ownership and freshness:

```yaml
---
title: Page Title
band: A
owner: '@handle'
refresh_after_days: 60 # adjust for volatility (60–120 typical)
change_type: patch | minor | major
status: live | stale | archived | draft
---
```

## Sizing Your Edit

| Declared | Suggested scope                     | Typical delta | Example                               |
| -------- | ----------------------------------- | ------------- | ------------------------------------- |
| patch    | Nudge clarity, swap a sentence      | ≤ 50 lines    | Tighten wording, add a public link    |
| minor    | New subsection or sustained rewrite | ≤ 250 lines   | Extend a pattern, update the guard    |
| major    | New page or large restructure       | > 250 lines   | Introduce a practice or retire legacy |

Declare the change size honestly—automation will catch suspicious diffs.

## Local Ritual Before You Open a PR

```bash
pnpm run docs:dev   # Preview the story you're telling
pnpm run guard      # Band A and sanitization rules
pnpm run docs:build # Ensure production build is happy
```

- Grep for lingering sensitive words: `rg -i "(secret|password|internal)" docs/`.
- Keep frontmatter accurate; stale metadata gets flagged by the guard script.
- Large link sweeps? Run `pnpm run links` to avoid noisy follow-up PRs.

## After You Push

1. CI re-runs guard, link check, and secret scan.
2. Green pipelines auto-merge; yellow warnings need a human glance.
3. Red blocks ship until you resolve the breach.

Policy, stop rules, and SLOs live in [Governance Policy](./governance).

## Educational Placeholders

Use consistent stand-ins whenever you need to demonstrate a redaction pattern:

| Placeholder    | Meaning                                |
| -------------- | -------------------------------------- |
| `TICKET-ID`    | Internal tracker reference omitted     |
| `INTERNAL-URL` | Non-public link removed                |
| `REDACTED`     | Sensitive detail intentionally removed |
| `@handle`      | Any valid GitHub username              |

If you need deeper task choreography, hand it off to the relevant `/runbooks` entry so the guidance stays lightweight.
