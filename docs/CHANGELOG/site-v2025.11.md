---
title: site-v2025.11
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
last_reviewed: '2025-11-06'
audience: Readers tracking what changed in the v2025.11 release
tone: Plainspoken, candid, energetic
narrative_goal: Summarize the notable additions, updates, and fixes in this tag
nav:
  - none
---

Back to [Releases](../release.md)

# site-v2025.11 · Patch hygiene

This changelog captures the mid-November hygiene release so you can skim what shipped. <a href="#added" data-primary-action>Scan the changes</a> or <a href="../runbooks/index" data-secondary-action>Browse the runbooks index</a>.

**Tag date:** Mid-November release window

## Added

- **Decision Tripwires** page: three condition → action prompts for missing owner/date, SLA breaches, and metric regression.
- **Runbooks:** Handover RACI template, Transition operating promises, Shared metric visibility, State visibility map, and Accessibility Audit runbook now live with sanitized examples.
- **CTA policy:** Anti-drift governance now requires inline primary + secondary CTA pairs per page; frontmatter `primary_action` removed in favor of body-level actions and Feedback.vue fallbacks.
- **Tooling:** `scripts/frontmatter-lint.mjs` (with nav support), and `scripts/sync-navigation.mjs` shipped to keep frontmatter `nav` metadata, generated nav, and `.vitepress/config.ts` aligned.

## Updated

- Governance policy references the internal `GOVERNANCE.md` for automation/RACI, documents nav metadata as the source of truth, and clarifies guard/drift/Lighthouse/nav routing.
- All guidance pages now open with a single sentence plus inline CTA pair, refreshed copy, and secondary actions pointing to runbooks or the feedback helper.
- README aligns with governance (nav metadata, helpful scripts), and runbook pages now include identical CTA contracts.
- Top-level docs (Band A, FAQ, Sanitization, Start Here, Runbooks index, etc.) all got tone-aligned intros plus CTA pairs, making the UX consistent.
- Homepage hero/feature trio now reflects the end-to-end promise (Orientation → Checks → Receipts) with CTAs to Wayfinding, Quick-Run, and the Fast support hub.
- Start, Guides, Runbooks, and Fast support groups gained “Related references” tables so every doc points to the next action (e.g., Quick-Run → Link Integrity, Runbooks ↔ Transition promises, Playbook pages ↔ Runbooks).
- Navigation labels regrouped into Start, Guides, Runbooks, Contributor Kit, Fast support with friendlier names (e.g., “Wayfinding shortcuts,” “Link Integrity,” “Interrupt flows”) and the generated nav now mirrors the governance taxonomy.
- Runbooks now include fully populated checklists/tables (timer-based 20-minute handover, Accessibility audit evidence template, Community pack agenda, Transition promises escalation ladder, Shared/State visibility samples) so the flows are copy-paste ready.

## Fixed

- Removed duplicate CTA callouts, ensured `nav` metadata is present across all frontmatter, and added a nav guard so `.vitepress/navigation.generated.ts` matches the docs.
- Styled global link underline in the VitePress theme so anchors stay accessible without wrapping everything in `<u>`.
- Changelog/Releases pages now use the inline CTA/summary pattern.
- Patched internal links flagged by guard (Wayfinding shortcuts reference, runbooks links inside Monthly cadence) so all Start/Guides/Fast support cross-links resolve.

### Governance receipts

- Zero 404s at build.
- At least one page emitted `doc_helped` events.
