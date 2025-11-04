---
title: Governance Policy
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
last_reviewed: '2025-11-04'
---

# Governance Policy

Content governance ensures public documentation stays small, safe, and current.

## Scope

This policy applies to all pages under `docs/` published to the public site.
Internal planning, decision records, and handover artifacts remain in `_ADR/` and are not part of the public build.

## Allowed Content (Band A)

Band A restricts pages to neutral, non-sensitive patterns:

- Generic role or process descriptions
- Decision-making frameworks and facilitation patterns
- Sanitized examples (no real identifiers)
- Ranges/relative metrics ("~15%", "5–10", "few", "several")
- Original or properly licensed code samples

Forbidden:

- Internal product / system names, proprietary URLs, screenshots
- Ticket IDs (replace with `TICKET-ID` when teaching patterns)
- Personal or customer data, real names, emails
- Exact financials, volumes, infrastructure specifics
- Hard calendar dates for internal milestones (use relative phrasing)
- Secrets, credentials, access instructions

## Lifecycle States

```
Draft → Review → Live → Watch → Stale → Archive
```

- Draft: Under construction (may omit completeness)
- Review: In a pull request with sanitization checks running
- Live: Published and within `refresh_after_days`
- Watch: Approaching staleness threshold (< 15% of window left)
- Stale: Exceeded window — must be reviewed or archived
- Archive: Preserved for historical reference; not maintained

## Required Frontmatter

Each page must include:

```yaml
---
title: Page Title
band: A
owner: '@handle'
refresh_after_days: 60
change_type: patch | minor | major
status: live | stale | archived | draft
---
```

## Change Size Guidance

| change_type | Typical Impact                          | Approx Content Delta |
| ----------- | --------------------------------------- | -------------------- |
| patch       | Typos, phrasing, 1–2 sentences          | ≤ 50 lines           |
| minor       | New subsection, small structural tweaks | ≤ 250 lines          |
| major       | New page or large restructure           | > 250 lines          |

## Automated Gates

Color statuses applied by `content-guard` workflow:

- Red (blocking): missing frontmatter, disallowed patterns, build failure, secret leakage
- Yellow (review): heuristic warnings (possible internal reference, large change vs declared type)
- Green (auto-merge): no warnings, all checks pass

Auto-merge only occurs for Green PRs; Yellow requires human review; Red requires fixes.

## Weekly Drift Audit

A scheduled workflow scans for:

- Pages past `refresh_after_days`
- Heavily outdated reference patterns
- Accumulated warnings across multiple PRs

A stale report issue is created or updated when drift exists.

## Monthly Release Tagging

Release cadence uses tags `site-vYYYY.MM`:

- First business day if there were meaningful changes
- Skip if only trivial (patch) hygiene tweaks
- Changelog generated via `changelog` scripts

## Responsibilities

| Role               | Responsibility                                |
| ------------------ | --------------------------------------------- |
| Content Editor     | Curate narrative, clarity, cross-link hygiene |
| Compliance Officer | Ensure sanitization and policy adherence      |
| DevOps             | Maintain automation (guard, stale, release)   |
| Maintainers        | Review Yellow PRs, fix Red failures           |

## Cross-Link Conventions

Use relative links without `.md` extension for published pages:
`[Decision Spine](./decision-spine)` ✅
`[Decision Spine](./decision-spine.md)` ❌ (avoid extension; future site flexibility)

## Decommissioning Pages

1. Set `status: archived`
2. Add first line notice: "ARCHIVED – Kept for historical reference; no longer maintained."
3. Remove cross-links from other live pages.

## Self-check Before PR

Run these locally:

```bash
pnpm run guard
pnpm run docs:build
```

Ensure no Red failures and build success.

## Future Enhancements (Non-binding)

- Add optional view analytics for drift heuristics
- Introduce coverage-like score for link freshness
- Expand guard rules for inclusive language patterns

---

Last reviewed: see git history (quarterly review cadence).
