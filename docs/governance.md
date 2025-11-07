---
title: Anti-drift Content Governance
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Maintainers and contributors who publish or review Northbook content
tone: Plainspoken, candid, energetic
narrative_goal: Define the guardrails that keep public docs safe and trustworthy
---

# Anti-drift Content Governance

<a href="#scope" data-primary-action>Use these rules when you edit or approve any page.</a>

<a href="./runbooks/index" data-secondary-action>Browse the Runbooks index for hands-on checklists.</a>

> Public-safe content only. Internal specifics live elsewhere. This page is the Anti-drift content governance playbook; project-level governance (RACI, automation owners, SLOs) lives in [`GOVERNANCE.md`](https://github.com/lop-Louis/go-to-docs/blob/main/GOVERNANCE.md).

Content governance ensures public documentation stays small, safe, and current.

## How this differs from project governance

- **Anti-drift content governance (this page):** Defines Band A scope, sanitization rules, review cadence, and anti-drift triggers for anything published under `docs/`.
- **Project governance ([`GOVERNANCE.md`](https://github.com/lop-Louis/go-to-docs/blob/main/GOVERNANCE.md))**: Tracks who owns the automation, how RACI works, what the SLOs and stop rules are, and when workflows change.

Update them together: policy/tone changes go here; ownership/process changes go in the root file with a cross-link back to this guide.

## Scope

This policy applies to all pages under `docs/` published to the public site.
Internal planning, decision records, and handover artifacts remain in `_ADR/` and are not part of the public build.

## CTA + feedback contract

Anti-drift governance treats the CTA pair as part of the narrative, not an afterthought:

1. **Plainspoken opener:** Start each page with one crisp sentence that states the value or outcome in the page’s declared tone.
2. **Inline CTA pair:** Immediately follow that sentence with a single clause that contains _both_ actions, e.g.\
   `Intro sentence. <a … data-primary-action>Run the prep</a> or <a … data-secondary-action>Give feedback</a>.`
3. **Primary CTA:** Short verb phrase (≤ ~8 words) that points to the default action on the page. No trailing period inside the link text.
4. **Secondary CTA:** Offer a real alternative (runbooks index, related guide, deeper policy). When no obvious action exists, point to the GitHub feedback flow used by [`Feedback.vue`](https://github.com/lop-Louis/go-to-docs/blob/main/docs/.vitepress/theme/Feedback.vue):\
   `https://github.com/lop-Louis/go-to-docs/issues/new?labels=kl,feedback&title=[Feedback]%20TITLE&body=Page:%20URL`
5. **Placement:** The CTA sentence must appear before the first `##` heading. Drift checks fail if either action is missing or if the primary action renders more than ~600 px below the H1.

## Frontmatter contract

Every markdown page still needs ownership and review metadata:

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

> CTA text now lives in the body, so you **do not** need a `primary_action` field in frontmatter. Drift prevention scripts enforce the action pair directly in the rendered content.

Frontmatter is linted via `pnpm run frontmatter:lint`, which loads `schemas/frontmatter.schema.json` to keep Band A metadata (owner handle, change type, status, refresh window) consistent before a PR can merge.

## Allowed Content (Band A)

Band A restricts pages to neutral, non-sensitive patterns:

- Generic role or process descriptions
- Decision-making frameworks and facilitation patterns
- Sanitized examples (no real identifiers) — see the [Handover RACI template runbook](./runbooks/handover-raci-template.md) for a ready-to-use pattern
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

| ❌ Avoid | ✅ Prefer |
|
