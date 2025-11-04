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

> Public-safe content only. Internal specifics live elsewhere.

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

### Forbidden Patterns

**Never publish:**

- Internal product / system names, proprietary URLs, screenshots
- Ticket IDs (replace with `TICKET-ID` when teaching patterns)
- Personal or customer data, real names, emails
- Exact financials, volumes, infrastructure specifics
- Hard calendar dates for internal milestones (use relative phrasing)
- Secrets, credentials, access instructions

### Common Pitfalls to Avoid

Based on usage patterns, watch for:

1. **Accidental Internal References:**
   - Wiki links, Confluence URLs → Replace with "internal wiki"
   - Slack channel names → Use "team channel" or "discussion forum"
   - Repository names → Use "the repository" or "codebase"

2. **Over-specific Metrics:**
   - "Exactly 47 PRs merged" → "~45-50 PRs" or "several dozen"
   - "Response time of 234ms" → "~200-250ms" or "sub-300ms"
   - "15 team members" → "~15 members" or "mid-sized team"

3. **Temporal Specificity:**
   - "Launched in a named quarter" → "Launched recently" or "within the past year"
   - "Meeting every Tuesday" → "Weekly meetings" or "regular cadence"
   - "Deploy by March 15" → "Deploy within 2 weeks" or "upcoming sprint"

4. **Organizational Details:**
   - Reporting structures, approval chains → Generic "stakeholders" or "decision makers"
   - Vendor names → "Third-party service" or "external provider"
   - Budget/cost details → Remove entirely or use "within budget constraints"

### Good vs. Bad Examples

| ❌ Avoid                               | ✅ Prefer                        |
| -------------------------------------- | -------------------------------- |
| "Our Acme CRM system handles..."       | "The CRM system handles..."      |
| "Contact Jane at NAME@PRIVATE-EMAIL"   | "Contact the team owner"         |
| "JIRA-123X tracks this issue"          | "TICKET-ID tracks this pattern"  |
| "Deployed on a specific calendar date" | "Deployed in early 2024"         |
| "Exactly 127 users affected"           | "~125 users" or "over 100 users" |
| "https://INTERNAL-URL/wiki"            | "Internal documentation"         |
| "The Phoenix project cost $2.3M"       | "The project" (omit cost)        |
| "Our 23-person team in building 7"     | "A mid-sized team"               |

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

A scheduled workflow (`stale-pages.yml`) scans for:

- Pages past `refresh_after_days`
- Heavily outdated reference patterns
- Accumulated warnings across multiple PRs

A stale report issue is created or updated when drift exists.

**Monitoring Expectations:**

- **Page Owners:** Respond to stale notifications within 2 weeks
- **Content Editors:** Review stale issues monthly, escalate blockers
- **Contributors:** Use `refresh_after_days` appropriately:
  - Fast-changing practices: 30-60 days
  - Stable frameworks: 90-120 days
  - Foundational patterns: 120-180 days

## Quarterly Content Review Cycle

Every quarter (Q1, Q2, Q3, Q4), conduct systematic review:

### Review Process

1. **Week 1:** Content Editors identify high-traffic or critical pages needing refresh
2. **Week 2-3:** Page owners review and update their assigned pages
3. **Week 4:** Consolidate updates, merge PRs, update `last_reviewed` dates

### Quarterly Metrics to Track

- **Stale page count:** Pages exceeding refresh window
- **Content velocity:** PRs merged per month
- **Guard violations:** Red/Yellow trends over time
- **Link health:** Broken link count and resolution time

**Next Quarter Review Target:** < 5 stale pages, < 3 open stale issues

## Monthly Release Tagging

Release cadence uses tags `site-vYYYY.MM`:

- First business day if there were meaningful changes
- Skip if only trivial (patch) hygiene tweaks
- Changelog generated via `changelog` scripts

**Release Process:**

1. **Automated:** `release.yml` workflow runs 1st of each month at 6 AM UTC
2. **Aggregation:** Collects all merged PRs with change_type metadata
3. **Tagging:** Creates `site-vYYYY.MM` git tag
4. **CHANGELOG.md:** Auto-updates with monthly summary

**Versioning Guidance:**

Content changes follow semantic versioning principles:

| Version Component        | Trigger                              | Examples                             |
| ------------------------ | ------------------------------------ | ------------------------------------ |
| **Major** (YYYY.MM)      | Month boundary                       | Monthly release tags                 |
| **Minor** (within month) | New pages, significant restructuring | New guide added, section reorganized |
| **Patch** (within month) | Typos, clarifications, small fixes   | Grammar fixes, link updates          |

**Change Type Selection:**

When updating a page, choose `change_type` based on:

- **patch:** < 50 lines changed, no structural changes, fixes/clarifications
- **minor:** 50-250 lines, new subsections, moderate restructuring
- **major:** > 250 lines, new pages, complete rewrites, major structural changes

**Example Changelog Entry:**

```markdown
## site-v2025.11

### New Pages

- **API Guidelines** (minor) - Added REST API design principles

### Updates

- **Governance Policy** (minor) - Enhanced Band A examples and quarterly review process
- **Band A Guide** (patch) - Fixed typo in sanitization checklist

### Infrastructure

- **PR Checklist** (major) - Comprehensive workflow summary replacing Content Guard-only report
```

**Release Verification:**

Check these after each release:

- Tag created in repository
- CHANGELOG.md updated
- GitHub Release created (manual, optional)
- No stale pages introduced by updates

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

## Accessibility Standards

All interactive components must meet WCAG AA compliance:

### Keyboard Navigation

- All interactive elements (buttons, links, forms) reachable via Tab/Shift+Tab
- Visible focus indicators (2px outline, high contrast)
- No keyboard traps (users can navigate away)
- Enter/Space activate buttons and links

### ARIA Attributes

- Descriptive `aria-label` on buttons without visible text
- `role="region"` with `aria-label` for landmarks
- `aria-hidden="true"` on decorative icons (emojis, SVGs)
- `aria-live="polite"` for dynamic status messages

### Semantic HTML

- Use `<button>` for actions, not `<div onclick>`
- Use `<a>` for navigation, not `<button>`
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- `<label>` elements associated with form inputs

See [Accessibility Quick Wins](./accessibility-quick-wins) for implementation patterns.

## Self-check Before PR

Run these locally:

```bash
pnpm run guard
pnpm run docs:build
pnpm test
```

Ensure no Red failures, build success, and all tests passing.

## Future Enhancements (Non-binding)

- Add optional view analytics for drift heuristics
- Introduce coverage-like score for link freshness
- Expand guard rules for inclusive language patterns
- Add automated accessibility testing in CI (axe-core)

---

Last reviewed: see git history (quarterly review cadence).
