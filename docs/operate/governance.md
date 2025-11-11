---
title: Anti-drift Content Governance
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Maintainers and contributors who publish or review Northbook content
tone: 'Plainspoken, candid, energetic'
narrative_goal: Define the guardrails that keep public docs safe and trustworthy
nav_group: Operate
nav_order: 30
nav_label: Anti-drift governance
nav:
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-04'
---

# Anti-drift Content Governance

Keep public docs anti-drift by following this policy. [Apply the rules](#scope) or [Jump to the runbooks index](./index).

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

> Automation: `pnpm run ux:scan` enforces that every page opens with a plain sentence followed by both `data-primary-action` and `data-secondary-action` anchors before the first section.

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

## Automation surfaces

- **Guard (PR-only):** `pnpm run guard` executes the Band A checks inside the PR workflow and posts the JSON summary as a PR comment (not the CI job summary). Guard tasks must be **read-only**; do not bundle file-mutation or nav-generation scripts in the same command. Treat red output as blocking; yellow requires reviewer judgment.
- **Anti-drift (working branch push):** `pnpm run drift` runs whenever you push to a non-default working branch. The warnings land in that workflow’s job summary (no PR comment spam) so you can clean drift before opening a PR.
- **Lighthouse (post-deploy):** Performance and accessibility checks run _after_ deployment against <https://northbook.guide>. The report lives in the Lighthouse workflow summary; PRs do not need to attach the artifact.
- **Navigation sync:** `pnpm run nav:sync` regenerates `.vitepress/navigation.generated.ts` from frontmatter before `docs:build`. Treat the docs themselves as the source of truth; never hand-edit the generated nav.
- **Guide vs rule escalation:** KL guidance yields to corporate rules. Use the matrix below and escalate according to the project governance playbook.

## Navigation & sidebar verification

Every change that adds, removes, or renames a page must keep the navigation experiences honest:

- Declare nav placement in frontmatter using the `nav` array (`main`, `sidebar`, `external`, `none`). This metadata is the source of truth; config generation scripts read it directly.
- Update `.vitepress/config.ts` (or regenerate `navigation.generated.ts` if you’re using auto-generation) so the top navigation and sidebar still point only to Band A pages that exist.
- If you touch a Playbook/Runbook title or path, make sure the sidebar emoji + ordering remain intentional and update cross-links in the documents themselves.
- Run `pnpm run docs:build` locally; the build fails if nav links are dead. Do not rely on reviewers to chase missing nav updates.
- If you cannot add a permanent nav slot yet, prefer inline links from related docs rather than leaving a dangling placeholder in the config.
- Set `nav` in frontmatter to `main`, `sidebar`, or `none` (plus optional `nav_label`, `nav_group`, `nav_order`). `pnpm run nav:sync` regenerates `.vitepress/navigation.generated.ts` from those values before CI runs.
- Automation regenerates `.vitepress/navigation.generated.ts` during `pnpm run nav:sync` (part of `docs:guard` and `docs:build`), so the nav config always mirrors the frontmatter.

This keeps the published sidebar aligned with the actual docs tree and prevents “secret” pages that drift outside the discoverable structure.

## Allowed Content (Band A)

Band A restricts pages to neutral, non-sensitive patterns:

- Generic role or process descriptions
- Decision-making frameworks and facilitation patterns
- Sanitized examples (no real identifiers) — see the [Handover RACI template runbook](./handover-raci-template) for a ready-to-use pattern
- Ranges/relative metrics ("~15%", "5–10", "few", "several")
- Original or properly licensed code samples

### Forbidden Patterns

### Never publish:

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

## Guide vs rule escalation

|           | Local KL (team-level)                                       | Corporate / enterprise                                                                   |
| --------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Guide** | Preferred practice; can diverge with rationale in PR        | Advisory note; always cite or link to the policy                                         |
| **Rule**  | Enforced via automation; escalate to KL lead for exceptions | Always overrides KL content. Follow it, then document the conflict and inform governance |

Corporate rules always win. If a KL rule conflicts with a corporate mandate, follow the corporate requirement immediately, then document the exception (what changed, who approved, when) and notify the governance owner so the KL doc can be updated. If two guidelines conflict, resolve it locally; escalate only when the conflict blocks delivery or requires a policy update.
