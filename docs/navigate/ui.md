---
title: UI Baseline
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
audience: Designers and engineers building shared UI
tone: 'Plainspoken, candid, energetic'
narrative_goal: Lock in the visual system so product surfaces feel unified
nav:
  - none
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
cta_primary_label: Try the Navigate path
cta_secondary_label: See example route
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# UI Baseline

Consistent UI happens when every team uses the same tokens and states. [Apply the specs](#layout-rules) or [Browse the runbooks index](../operate/index).

What: Canonical specs for spacing, typography, and states across product surfaces.
Why: Prevents drift between teams and keeps polished UI without pixel-policing.
When: Before starting screens, reviewing PRs, or creating shared components.

## Layout Rules

- **Grid:** 8px unit; snap components to multiples of 8. Use 24px gutters on desktop, 16px on mobile.
- **Spacing tokens:** `xs=4`, `sm=8`, `md=16`, `lg=24`, `xl=32`. Never invent new gaps.
- **Containers:** Desktop max width 960px; mobile full bleed with 16px padding.

## Typography

| Token        | Usage                 | Size / Line height | Weight |
| ------------ | --------------------- | ------------------ | ------ |
| `heading-xl` | Landing hero headline | 32 / 40            | 600    |
| `heading-lg` | Page title            | 24 / 32            | 600    |
| `heading-md` | Section heading       | 20 / 28            | 600    |
| `body-base`  | Default copy          | 16 / 24            | 400    |
| `body-sm`    | Captions, metadata    | 14 / 20            | 400    |

Use sentence case. Reserve bold for emphasis or inline labels, not whole paragraphs.

## Color System

- **Primary:** `#2453FF` for actions; hover darken to `#1B40C4`.
- **Success:** `#1F9751`; **Warning:** `#F6A009`; **Critical:** `#E14B42`.
- **Neutrals:** Text `#101828`, secondary text `#475467`, disabled `#98A2B3`, surfaces `#F2F4F7`.
- Respect contrast ≥ 4.5 for body text and ≥ 3.0 for large type.

## Component States

- Buttons: default → hover (raise by 1 shadow step) → focus ring `#2453FF` 2px → disabled uses neutral palette, no border.
- Inputs: 1px neutral border, focus ring 2px primary, error state border `#E14B42`.
- Links: underline on focus/hover; visited color matches default to avoid stale purple.

## Accessibility Pass

- [ ] Keyboard order matches visual flow.
- [ ] Focus indicators never removed.
- [ ] Icon-only buttons include `aria-label`.
- [ ] Content passes [Accessibility Quick Wins](../operate/accessibility-quick-wins).

Reference Figma file: `Northbook / Foundations / UI`. Ping @lop before diverging from tokens.
