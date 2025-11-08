---
title: Voice & Tone Guide
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
audience: Anyone writing or editing Northbook content
tone: Plainspoken, candid, energetic
narrative_goal: Define how our voice should sound across channels
nav:
  - none
---

Need to fix this fast? [Run the Ops Quick-Run](/ops/quick-run) · [Try the 10-minute lab](/labs/link-drift)
<a href="/ops/quick-run" data-primary-action>Run the Ops Quick-Run</a> or <a href="/labs/link-drift" data-secondary-action>Try the 10-minute lab</a>.


# Voice & Tone Guide

Sounding like Northbook is deliberate, not accidental. <a href="#voice-pillars" data-primary-action>Use the voice and tone pillars</a> or <a href="../runbooks/index" data-secondary-action>Browse the runbooks index</a>.

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

**Do**

- Use present tense: "Guard passes" vs. "Guard will pass."
- Swap adverbs for data: "Merge after two green builds" vs. "Merge carefully."
- Prefer lists over long paragraphs when citing steps.

**Avoid**

- Emojis in docs (save them for async chatter).
- Hyped adjectives ("amazing", "incredible")—state proof instead.
- Passive constructions that hide ownership.

Pair this with [Sanitization](../sanitization) and [Decision Spine](../decision-spine) to keep content actionable.
