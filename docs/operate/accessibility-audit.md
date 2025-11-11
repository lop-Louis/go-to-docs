---
title: Accessibility audit runbook
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 90
status: live
audience: Product ops and accessibility leads running the quarterly sweep
tone: 'Plainspoken, candid, energetic'
narrative_goal: Outline the repeatable tasks for verifying accessibility health
nav_group: Operate
nav_order: 30
nav_label: Accessibility audit
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
date: '2025-11-11'
---

# Accessibility audit runbook

Run this quarterly sweep before release windows to keep public docs accessible. [Start the audit](#purpose) or [Browse the runbooks index](./runbooks-index).

## Purpose

Quarterly accessibility sweep for public Northbook pages. Logs reside in repo history; avoid calendar specifics for public neutrality.

## Checklist

| Step                                                              | Owner              | Tool / Command                   | Receipt                               |
| ----------------------------------------------------------------- | ------------------ | -------------------------------- | ------------------------------------- |
| Build docs locally                                                | Docs steward       | `pnpm run docs:build`            | Screenshot of success output          |
| Preview site                                                      | Docs steward       | `pnpm run docs:preview`          | Preview URL noted in audit log        |
| Lighthouse sweep (hero, Decision Spine, Accessibility Quick Wins) | Accessibility lead | `npx lighthouse <url> --view`    | JSON/HTML report attached             |
| Keyboard & screen reader spot check                               | Accessibility lead | VoiceOver/NVDA walkthrough       | Notes in audit log                    |
| Alt-text & ARIA scan                                              | Content owner      | Manual scan + `pnpm run ux:scan` | Issues logged (label `accessibility`) |
| Remediation tickets filed                                         | Content owner      | GitHub issues template           | Links pasted in audit log             |

## Evidence template

Copy this into your audit doc each quarter:

```
Audit date: YYYY-MM-DD
Preview URL: https://preview-host.example
Pages tested: Home, Decision Spine, Accessibility Quick Wins, Runbooks index
Lighthouse scores: P:XX / A:YY / B:ZZ / SEO:AA
Manual findings:
- [ ] Heading levels sequential (list any violations)
- [ ] Focus ring visible on buttons
- [ ] Images with descriptive alt text
Tickets opened: #123, #124
```

## Notes

- Run Lighthouse in an incognito window to avoid extensions skewing results.
- If new components ship (e.g., custom nav, accordions), add them to the tested page list.
- At least once per half-year, pair with an assistive tech user for a qualitative check.

## Related references

- [Accessibility Quick Wins](../operate/accessibility-quick-wins) — Share this page with partners after the sweep.
- [Wayfinding shortcuts](../navigate/find.md) — Confirm links in navigation tables still map correctly.
- [State ledger](../navigate/state-ledger.md) — Log the audit date and key outcomes with the monthly tag.
