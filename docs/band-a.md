---
title: What is Band A
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
last_reviewed: '2025-11-04'
---

# What is Band A

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

| Topic Type   | Safe (Band A)                                         | Unsafe (Remove)                     |
| ------------ | ----------------------------------------------------- | ----------------------------------- |
| Metrics      | "response times ~100–500ms"                           | Exact SLA tied to internal contract |
| Roles        | "A tech lead reviews PRs and mentors engineers"       | Listing individual engineer names   |
| Tools        | "Static analysis runs in CI"                          | Internal CI server hostname / URL   |
| Decisions    | Generic frameworks & criteria                         | Internal approval chains with names |
| Incidents    | Pattern: "post-incident review focuses on prevention" | Specific incident IDs + timeline    |
| Architecture | High-level pattern ("event-driven workflow")          | Internal topology, IP ranges        |

## Band A Review Triggers

Flag for re-review if:

- Content references an internal codebase path or proprietary repo name
- More than 30% line change without `change_type: major`
- Owner field removed or replaced with non-handle
- New section includes operational metrics beyond ranges

## Common Neutral Substitutions

| Internal Term                       | Replace With                          |
| ----------------------------------- | ------------------------------------- |
| Product codename                    | "the product" / "the service"         |
| Team name                           | "the team"                            |
| Specific metric (e.g. exact count)  | Range or approximate ("~50", "40–60") |
| Internal system (e.g. Jenkins host) | "CI pipeline"                         |
| Specific incident date              | "recent incident"                     |
