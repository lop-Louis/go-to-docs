---
title: What is Band A
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
last_reviewed: '2025-11-04'
audience: Anyone publishing public-safe guidance from Northbook
tone: Plainspoken, candid, energetic
narrative_goal: Explain what qualifies as Band A content and how to sanitize it
nav_label: Band A guardrails
nav_group: Start
nav_order: 40
nav:
  - sidebar
---

# What is Band A

Band A keeps our public guidance safe to quote without leaking specifics. <a href="#what-belongs-in-band-a" data-primary-action>Run the Band A checklist</a> or <a href="./runbooks/index" data-secondary-action>Browse the runbooks index</a>.

> Public-safe content only. Internal specifics live elsewhere.

Band A content is **public-safe** material that can be shared openly without risk to the organization or individuals.

## What belongs in Band A

✅ **Include (safe patterns only):**

- Role definitions and common responsibilities (generic, not org-specific)
- Process patterns without company-specific details
- Generic decision frameworks (e.g., lightweight decision spine)
- Anonymized examples with no identifying information
- Publicly available metrics expressed as ranges or relative deltas (e.g., "response times ~100–500ms")
- Code samples that are original or properly licensed
- Accessibility best practices (contrast ratios, ARIA usage)

✅ **Examples (allowed phrasing):**

- "A tech lead typically reviews 5–10 pull requests per day" (range, not exact count tied to individuals)
- "A decision spine can have 4 stages: frame, options, decide, review" (generic pattern)
- "Accessibility quick wins: keyboard navigation, ARIA labels, color contrast" (industry-standard guidance)
- "On-call handoffs should include: context summary, active incidents, next review time" (neutral list)

❌ **Exclude (never publish):**

- Internal product / system names, proprietary URLs, or screenshots of internal tools
- Specific ticket IDs (e.g., replace a reference like `JIRA-123X` with `TICKET-ID` when describing patterns)
- Names of employees, customers, vendors, or identifying details
- Exact financials (revenue, cost, contract values) or customer counts
- Internal infrastructure topology, IPs, environment hostnames
- Vendor-specific implementation secrets or configuration dumps
- Hard calendar dates for internal releases (use relative time windows / ranges)
- Secrets (API keys, tokens), credentials, or access instructions

## Why Band A only

This site is **public on GitHub Pages**. Band A ensures:

- Legal compliance (no proprietary information)
- Privacy protection (no personal data)
- Longevity (generic patterns age better)
- Reusability (others can adapt without context)

## Sanitization process

Before publishing (sanitize in this order):

1. Replace any company / product / vendor names with neutral descriptors ("the organization", "the platform")
2. Convert exact numbers to ranges or relative changes ("~15% increase", "5–10", "a few", "several")
3. Remove or recreate screenshots using dummy data (avoid cropping with sensitive fragments)
4. Strip internal links, ticket references (use `TICKET-ID` placeholder when explaining processes); avoid real calendar dates — use relative phrasing
5. Search for any secrets, access tokens, environment variable values – remove entirely
6. Replace calendar dates with relative phrasing ("within 3 months", "quarterly", "weekly")
7. Review frontmatter: `band: A` and `owner` are present and accurate
8. Run `npm run guard` locally before opening a PR

See [Sanitization Checklist](./sanitization) for the full process and final verification steps.

## Quick Safe/Unsafe Cheat Sheet

| Topic Type | Safe (Band A) | Unsafe (Remove) |
|
