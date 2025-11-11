---
title: Design System component usage decision
band: A
owner: '@design-system'
refresh_after_days: 60
change_type: patch
status: live
works_here:
  env:
    - prod
  apps:
    - Flos UI
  regions:
    - MY
    - DK
audience: 'engineers, designers'
purpose: Decide use vs extend vs fork in <10 minutes.
owner_role: Design System Lead
last_verified: '2025-11-07'
next_review: '2026-02-07'
tone: practical
narrative_goal: decide
adr_ref: /governance/decisions/ds-fork-policy.html
stop_rule: 'If tokens or a11y rules change, refresh immediately.'
nav:
  - none
nav_group: Mitigate
nav_order: 30
nav_label: Design system component
bucket: mitigate
north_star_id: ns-001
guardrail_id: gr-102
cta_primary_label: Choose a fix flow
cta_secondary_label: See example exception
leading_metric: m-time-to-freeze
lagging_metric: m-time-to-recovery
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

Make a consistent call on whether to use, extend, or fork a DS component without re-litigating. [Walk the decision steps](#quick-path) or [Review the handshake contract pattern](../operate/handshake-contracts).

> **Works here:** prod · Flos UI · Regions: MY, DK  
> **Owner:** Design System Lead

## Quick path

1. **Match**: Does an existing DS component meet the user need? If yes, use as-is.
2. **Extend**: If 1–2 new props solve it without breaking a11y/tokens, propose an extension.
3. **Compose**: Combine DS components before creating something new.
4. **Fork**: Only when 1–3 fail and you have backing from the DS owner.

### “Show me” snippet (safe extend)

```tsx
// Button with icon + loading, token-safe
<Button variant="primary" aria-busy={loading}>
  {loading ? <Spinner size="sm" aria-hidden /> : <IconDownload aria-hidden />}
  <span className="sr-only">{loading ? 'Loading…' : 'Download'}</span>
</Button>
```

### Escalation package (for extension/fork)

```
Problem: <1 line>
Evidence: screenshot + a11y note
Proposal: extend|compose|fork
Owner: <your squad>
Backup owner: <DS maintainer>
Review slot: <date>
```

## Why we do it this way

Forks explode maintenance; extensions keep invariants, tokens, and tests intact.

**Handoff** → [/operate/handshake-contracts](../operate/handshake-contracts)

## Related references

- [Playbook canon](../operate/) — Especially the Handshake Contracts and Decision Spine entries referenced here.
- [Quick-Run check](../navigate/quick-run.md) — Run after editing DS documentation to keep receipts.
- [UI baseline](../navigate/ui.md) — Validate any component extension still honors the a11y baseline.
