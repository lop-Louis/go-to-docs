# Northbook Roadmap

Direction first, not control. Ship the contracted scope, collect receipts, then expand.

---

## v1.0 • Northbook go-live (single milestone)

> **Stop rule:** If a task does not move one of these ten issues forward within seven days, park it in v1.1 or the icebox.

| # | Issue | Labels | Done when |
| - | ----- | ------ | --------- |
| 1 | **Custom domain + HTTPS is green** | `area:ops`, `change_type:patch`, `band:A` | DNS verified (start grey-cloud), GitHub Pages green check, Enforce HTTPS ON, `www → root` 301 landed. |
| 2 | **Frontmatter contract v2 + Works-here chip** | `area:automation`, `change_type:patch` | Schema requires `works_here`, `purpose`, `audience`, `owner_role`, `last_verified`, `next_review`; UI renders Works-here chip + ownership block. |
| 3 | **Authoring bones enforced** | `area:governance`, `change_type:patch` | Template + PR checklist enforce Quick path, Escalate, Why (ADR link), Stop rule sections. |
| 4 | **Start here** | `area:ia`, `change_type:minor` | Intro explains what this is/isn’t and adds a “Your first 10 minutes” checklist linking into quick checks. |
| 5 | **Quick checks index + top 5 flows** | `area:fix`, `change_type:minor` | Publish MS Teams, Repo/Pipeline access, DS component decision, Staging flag, VWO/Bloomreach; each supplies 3–7 steps, 2 screenshots, 1 snippet, hard Escalate block. |
| 6 | **IT handoff (single page)** | `area:support-it`, `change_type:minor` | Single escalation page with copy/paste fields, ticket links, and exact routing words. |
| 7 | **Design system guardrails (5 non-negotiables)** | `area:playbook`, `change_type:minor` | Five guardrail rules, each with a “why” (2–3 lines) and “show me” example plus a component decision tree. |
| 8 | **Toolbox index** | `area:ia`, `change_type:patch` | One line per tool with owner, scope, limits, and break-glass path. |
| 9 | **Tests: linkcheck + search sanity + dry-runs** | `area:automation`, `change_type:patch` | ✅ **Partial:** `guard-unified.yml` runs linkcheck + frontmatter + primary action as blockers; content guard, drift, stale as warners. Remaining: search sanity + dry-run capture. |
|10 | **Maintainer Contract + Sponsorship one-pager** | `area:governance`, `change_type:minor` | Maintainer contract covers freshness SLA, DoD, deprecation rule; sponsorship one-pager lists KPIs, baseline window, stop rule. |

Seams ↔ issue 1 • Invariants ↔ issues 2–3 • Rollout ↔ 4–6 • Content set ↔ 4–8 • Tests ↔ 9 • Contracts ↔ 10.

### CI Guard Refactoring Progress (Issue #9 slice)

**Shipped:** `guard-unified.yml` replaces 4 workflows with 1 blocker + 1 warner job. See `_ADR/CI_GUARD_REFACTORING.md` for details.

- ✅ Link validation blocks PRs (404s)
- ✅ Frontmatter schema blocks PRs (required fields)
- ✅ Primary action validation blocks PRs (CTA pairs)
- ✅ Content guard, UX scan, drift, stale run as warners (log but don't block)
- ✅ Fork toggle via `NORTHBOOK_STRICT=false`
- 🔄 Old workflows disabled (`.disabled` suffix) for 1-2 week safety window
- ⏳ Delete disabled workflows after validation period

---

## Next 30 days • v1.1 (adoption & hygiene)

These unlock after v1.0 ships:

- Shortlinks (`go.northbook.guide` or `/go/*`)
- Search synonyms (toast→notification, handoff→escalate, RACI→roles/owners)
- “Top 10 unblockers” homepage panel
- Stale banner + hide-from-search once `next_review` lapses
- Escalation quality sampler (80% target)
- Monthly roll-up lines (interrupts/week, escalation quality %, freshness %)
- Link-only stub rule for policy conflicts
- Cloudflare response security headers (if not already enabled)

---

## Icebox (v2+ / spare cycles)

Ideas worth keeping, not shipping now:

- Video intro and HLS/Release-hosted players
- Runbooks section beyond the 20-min handover/community pack
- Allowed-values lint for tone/narrative
- Auto archive task for 90-day zero-view pages
- Worker-based shortlinks with KV
- Fancy 404 with query analytics
- GA4 event taxonomies beyond `doc_helped` and `cta_click`

---

## Kill or merge backlog smells

- Merge overlapping IA work into “Start here + Quick checks + IT handoff + DS guardrails.”
- Combine duplicate governance asks into “Authoring bones + Maintainer Contract.”
- Don’t block v1.0 on automation extras (stale banners, synonym files, KV shortlinks).
