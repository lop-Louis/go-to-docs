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
primary_action: Review the sections to understand the release scope
---

Back to [Releases](../release.md)

# site-v2025.11 · Patch hygiene

**Tag date:** Mid-November release window

## Added

- “Was this helpful?” control on Playbook pages with GA4 events (`doc_helped` Yes/No).
- CI: Markdown link checker with allowlist (`.github/workflows/linkcheck.yml`).
- CI: PR required-fields enforcer for Why, Exit metric, Stream/Seam ID, Exception (`.github/workflows/pr-fields.yml`).
- CI: Homepage ↔ Runbooks assertion to prevent false promises (`.github/workflows/homepage-runbooks-assert.yml`).
- Frontmatter presence linter requirement (policy): every Playbook/Guide page must include  
  `audience`, `tone`, `narrative_goal`, `primary_action`.  
  _(Implementation note: enforcement starts next train if not merged in this one.)_

## Updated

- **Homepage:** removed “Runbooks live here” claim until the `/runbooks/` index ships in _Playbook v0.1_.
- **Decision primitives:** added Governance cross-links to **Decision Spine** and **Answer Ledger**.
- **PR template:** now includes
  - Why (one line)
  - Exit metric (baseline → target + review date)
  - Stream/Seam ID
  - Exception (reason · owner · date)

## Fixed

- Broken/stale internal links identified by linkcheck in `docs/**`.
- Prevented future 404s caused by a missing `/runbooks/` index via CI assertion.
- Homepage tagline now links directly to `/runbooks/` to keep the promise honest.

---

### Governance & acceptance receipts

- Build passes with zero 404s.
- At least one updated page emits `doc_helped` GA4 events.
- Any edited Playbook/Guide page now contains the required frontmatter keys.
- `PR` template fields verified by CI on a sample pull request.

### Notes

- The `/runbooks/` link and index will be introduced in **Playbook v0.1** and re-enabled on the homepage in that train.
