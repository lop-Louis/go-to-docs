---
title: Voice & Tone Guide
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
audience: Anyone writing or editing Northbook content
tone: 'Plainspoken, candid, energetic'
narrative_goal: Define how our voice should sound across channels
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

# Voice & Tone Guide

Sounding like Northbook is deliberate, not accidental. [Use the voice and tone pillars](#voice-pillars) or [Browse the runbooks index](../operate/index).

## Guardrail ID gr-101 — narrator tone guide

- **Purpose:** Keep Band-A guidance plainspoken, candid, and respectful across every seam so tone drifts are caught early.
- **Positive behaviors:** short sentences, clear owners, explicit metrics, CTA verbs from the allowlist (`try`, `use`, `choose`, `see example`, `compare`, `preview`, `adapt`, `learn more`), and receipts linked near the fold.
- **Red-lines (blockers):** banned copy like "must", "always", "fix now", "comply", "mandatory", "best practice", "do this", "enforce" appearing more than twice per 500 words.
- **Enforcement:** CI lints for CTA labels + banned terms; human review checks tone when landing pages drift past the cap.

What: Shared language rules for anything public-facing—docs, release notes, support replies.
Why: Keeps every channel tight, human, and on-brand so readers know it's us.
When: Use this before writing net-new content or auditing drafts from others.

## Voice Pillars

- **Plainspoken:** Prefer everyday words over jargon; anchor on verbs.
- **Candid:** Name tradeoffs and limits directly—no hedging or marketing fluff.
- **Energetic:** Show momentum with active voice and short sentences.

## Tone by Scenario

| Scenario         | Approach                                              | Example                                                                  |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| Launch / win     | Celebrate briefly, then explain the value.            | "Shipped decision templates: drop-in frames cut planning time in half."  |
| Incident / risk  | Lead with status, own impact, give next step.         | "Guardrail failed at 14:32 UTC. We rolled back to 1.7. Patch ETA 30m."   |
| Guidance / docs  | Front-load the action, keep paragraphs under 4 lines. | "Set exit metrics before you file a PR. Start with baseline → target."   |
| Asking for input | Specify what you need and by when.                    | "Need design eyes on nav spacing by 17:00 PT. Comment in Figma frame B." |

## Word Choices

### Do

- Use present tense: "Guard passes" vs. "Guard will pass."
- Swap adverbs for data: "Merge after two green builds" vs. "Merge carefully."
- Prefer lists over long paragraphs when citing steps.

### Avoid

- Emojis in docs (save them for async chatter).
- Hyped adjectives ("amazing", "incredible")—state proof instead.
- Passive constructions that hide ownership.

Pair this with [Sanitization](../operate/sanitization) and [Decision Spine](../operate/decision-spine) to keep content actionable.
