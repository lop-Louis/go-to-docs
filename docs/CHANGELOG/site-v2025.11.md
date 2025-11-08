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

Need to fix this fast? [Run the Ops Quick-Run](/ops/quick-run) · [Try the 10-minute lab](/labs/link-drift)
<a href="/ops/quick-run" data-primary-action>Run the Ops Quick-Run</a> or <a href="/labs/link-drift" data-secondary-action>Try the 10-minute lab</a>.


Back to [Releases](../release.md)

# site-v2025.11 · Patch hygiene

This changelog captures the mid-November hygiene release so you can skim what shipped. <a href="#added" data-primary-action>Scan the changes</a> or <a href="../runbooks/index" data-secondary-action>Browse the runbooks index</a>.

**Tag date:** Mid-November release window

## Added

- **Decision Tripwires** page: three condition → action prompts for missing owner/date, SLA breaches, and metric regression.
- **Runbooks:** Handover RACI template, Transition operating promises, Shared metric visibility, State visibility map, and Accessibility Audit runbook now live with sanitized examples.
- **CTA policy:** Anti-drift governance now requires inline primary + secondary CTA pairs per page; frontmatter `primary_action` removed in favor of body-level actions and Feedback.vue fallbacks.
- **Tooling:** `scripts/frontmatter-lint.mjs` (with nav support), and `scripts/sync-navigation.mjs` shipped to keep frontmatter `nav` metadata, generated nav, and `.vitepress/config.ts` aligned.
- **CI Guard Unified Workflow:** Replaced 4 blocking workflows with single `guard-unified.yml` featuring 3 critical blockers (links, frontmatter, primary actions) + 4 warner checks (content guard, UX scan, drift, stale). Fork-friendly via `NORTHBOOK_STRICT` toggle.
- **Infrastructure Hardening:**
  - Custom domain support (`northbook.guide`) with CNAME + sitemap.xml generation
  - Custom 404 page with quick navigation and feedback link
  - Post-deploy smoke tests (homepage, RACI, decision-spine)
  - robots.txt with archive exclusion
- **Quality Gates (5 new automated checks):**
  - Broken anchor validation in link checker (#section-name links)
  - Inclusive language lint (whitelist→allowlist, master→primary, etc.)
  - UTM discipline for external links (analytics tracking)
  - External link security check (rel="noopener noreferrer")
  - Accessibility workflow with axe-core CI gate

## Updated

- Governance policy references the internal `GOVERNANCE.md` for automation/RACI, documents nav metadata as the source of truth, and clarifies guard/drift/Lighthouse/nav routing.
- All guidance pages now open with a single sentence plus inline CTA pair, refreshed copy, and secondary actions pointing to runbooks or the feedback helper.
- README aligns with governance (nav metadata, helpful scripts), and runbook pages now include identical CTA contracts.
- Top-level docs (Band A, FAQ, Sanitization, Start Here, Runbooks index, etc.) all got tone-aligned intros plus CTA pairs, making the UX consistent.
- **VitePress config:** Added sitemap generation, updated OG meta tags with full `northbook.guide` URLs, added `og:url` meta tag.
- **Disabled workflows:** Old guard workflows (content-guard, linkcheck, drift, stale-pages) renamed to `.disabled` for 1-2 week safety window before deletion.
- **Dependabot:** Already configured for weekly npm + GitHub Actions updates with auto-labeling.

## Fixed

- Removed duplicate CTA callouts, ensured `nav` metadata is present across all frontmatter, and added a nav guard so `.vitepress/navigation.generated.ts` matches the docs.
- Styled global link underline in the VitePress theme so anchors stay accessible without wrapping everything in `<u>`.
- Changelog/Releases pages now use the inline CTA/summary pattern.
- **Link checker:** Now validates anchor links (#section-name) both same-file and cross-file, catches broken ToC references.
- **Guard script:** Enhanced with inclusive language patterns, UTM parameter checks, and external link security validation.
- **CNAME location:** Moved from repo root to `docs/public/CNAME` for proper GitHub Pages deployment.

### Technical Debt Resolved

- **CI consolidation:** Reduced from 4 blocking guard workflows to 1 unified workflow, cutting complexity and improving maintainability.
- **Anchor link blindspot:** 1 anchor link tracked (previously unchecked), preventing silent breakage.
- **Accessibility automation:** WCAG AA compliance now runs on every PR with component-level tests.

### Governance receipts

- Zero 404s at build.
- Zero broken anchor links detected.
- At least one page emitted `doc_helped` events.
- 42 files checked by content guard with 4 yellow warnings (UTM tracking suggestions).
- 52 internal links + 1 anchor link + 8 external links validated successfully.
- Accessibility tests passing (WCAG AA component-level compliance).
- CI runtime: Guard unified workflow completes in ~26 seconds.

### Phase 2 Infrastructure (CI_GUARD_REFACTORING.md)

Completed 10 of 12 operational hardening items:

- ✅ CNAME + backups (docs/public/CNAME)
- ✅ Sitemap + robots.txt
- ✅ Custom 404 page
- ✅ Post-deploy smoke tests
- ✅ External link security policy
- ✅ Broken anchor crawl
- ✅ Inclusive language lint
- ✅ UTM discipline check
- ✅ Dependabot weekly cadence
- ✅ Accessibility CI gate

Remaining: CSP header (Cloudflare), cache rules (Cloudflare)
