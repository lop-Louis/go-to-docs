---
title: site-v2025.11
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
last_reviewed: '2025-11-06'
audience: Readers tracking what changed in the v2025.11 release
tone: 'Plainspoken, candid, energetic'
narrative_goal: 'Summarize the notable additions, updates, and fixes in this tag'
primary_action: Use this changelog to understand what shipped in the tag.
---

Back to [Releases](../release.md)

# site-v2025.11 · Patch hygiene

<a href="#added" data-primary-action>Use this changelog to understand what shipped in the tag.</a>

**Tag date:** Mid-November release window

## Added

- **Decision Tripwires** page: three condition → action prompts for missing owner/date, SLA breaches, and metric regression.
- **Runbooks:** Handover RACI template, Transition operating promises, Shared metric visibility, and State visibility map now live with sanitized examples.
- **UX + UI Standard:** Playbook entry codifying layout width, typography scale, link styling, color rules, a11y guardrails, allowed components, and media requirements.
- **Tooling:** `scripts/ux-scan.mjs` enforces primary-action tone plus heading rhythm; CTA verifier now scans every published route.

## Updated

- Governance policy now references the internal `GOVERNANCE.md` for automation/RACI, removing redundant Band A copy.
- Every doc with `primary_action` exposes it above the fold via a `data-primary-action` anchor; legacy runbooks cleaned up to match.
- Runbooks index, Decision Spine, Handshake Contracts, RACI by Seams, Stop Rules, Scoreboard, and other Playbook pages now link to the new templates and use underlined cross-links per the UX standard.
- Homepage CTA clarified (“Use these starting links…”), and multiple guidance pages (Band A, FAQ, Sanitization, Start Here, etc.) refreshed to the new tone.

## Fixed

- Removed duplicate CTA callouts and ensured CTA placement ignores the home layout to prevent false positives.
- Styled global link underline in the VitePress theme so anchors stay accessible without wrapping everything in `<u>`.
- Changelog page itself now carries a `data-primary-action` and the release flow documents the shared metric snapshot link.

### Governance receipts

- Zero 404s at build.
- At least one page emitted `doc_helped` events.
