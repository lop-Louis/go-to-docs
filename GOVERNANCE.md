# Project Governance (Automation & Drift Prevention)

## Purpose

Keep public documentation useful, safe, and small. Bots chase compliance; humans think strategically.

> Public-facing readers should use `docs/governance.md` (rendered on the site). This file adds internal-only automation, RACI, and SLO details so we do not duplicate guidance.

---

## Content Bands & Lifecycle

The public policy for Band A scope, lifecycle states, and frontmatter validation now lives in `docs/governance.md` (and the published site) under the **Anti-drift Content Governance** name. Instead of duplicating the rules here, treat that doc as the single source. This file simply adds operational context:

- **Band A:** Follow the public-facing [Band A reference](docs/band-a.md). Anything forbidden there is also forbidden here.
- **Lifecycle:** Apply the Draft→Review→Live→Watch→Stale→Archive model from `docs/governance.md`. This internal file only tracks the automation owners for each state.
- **Frontmatter + CTAs:** Use the required fields documented in `docs/governance.md`; CTA text now lives in the body via `data-primary-action` + `data-secondary-action` pairs, which drift prevention enforces. Frontmatter is validated by `schemas/frontmatter.schema.json` through the `pnpm run frontmatter:lint` script in CI.

Whenever you update those rules, update `docs/governance.md` first, then link back here if new context is needed.

---

## PR Gates (Automated Checks)

All pull requests undergo these automated checks:

### 🔴 Red (Blocking)

- Frontmatter schema violations (missing metadata, band≠A, invalid change_type/status/refresh windows)
- Forbidden patterns detected (internal URLs, ticket IDs, secrets)
- Secret scan fails (gitleaks)
- Build fails

**Action:** PR is blocked until fixed

### 🟡 Yellow (Warning)

- Link validation failures
- UX scan misses (missing CTA pair before the first heading)
- Drift audit warnings (storytelling metadata gaps, change-size heuristics, inclusive-language nudge)

**Action:** Requires one reviewer approval before merge. Drift alerts never block the workflow but surface inside the CI comment for visibility.

### 🟢 Green (Auto-merge)

- All checks pass
- No warnings
- Sanitization checklist complete

**Action:** Auto-merged within 1 minute via squash merge

### Automation routing

- **Guard:** Runs only on PRs (`pnpm run guard`). Its JSON output is posted as a PR comment so reviewers see red/yellow context without combing through CI logs. Guard checks must be read-only; generation/mutation scripts belong in separate steps. The CI job summary just links to the comment.
- **Anti-drift:** Runs on every push to non-default working branches (`pnpm run drift`). Results stay inside the job summary; PRs do not repeat the drift report.
- **Lighthouse:** Executes after deployment against <https://northbook.guide>. The Lighthouse workflow records its scores in the job summary; PRs do not need to attach or comment the report.
- **Navigation sync:** Frontmatter owns nav placement (`nav` plus optional `nav_label`, `nav_group`, `nav_order`). Run `pnpm run nav:sync` to regenerate `.vitepress/navigation.generated.ts`, and rerun `pnpm run docs:build`. The build fails on dead links; reviewers should bounce PRs that skip the nav update.

---

## Drift Detection (Weekly)

Automated weekly scan on Mondays at 2 AM UTC checks for:

### Staleness Indicators

- **Age > refresh_after_days**: Page hasn't been updated within promised window
- **Broken links increased**: External link rot detected
- **No views in 90 days**: Analytics show no traffic (if enabled)
- **Severely stale**: 2x past threshold (flagged as priority)

### Automated Actions

1. Bot opens/updates "Stale Pages Report" issue
2. Pages marked `status: stale` in frontmatter
3. Bot creates PR with status updates
4. Stale banner displayed on affected pages
5. Issue auto-closes when all pages reviewed

### Manual Review Required

- Review content accuracy
- Update if needed
- Extend `refresh_after_days` if still valid
- Set `status: archived` if obsolete

---

## RACI Matrix

| Activity            | Responsible | Accountable | Consulted  | Informed |
| ------------------- | ----------- | ----------- | ---------- | -------- |
| Content creation    | Author      | Owner       | Reviewers  | Team     |
| Sanitization checks | CI Bot      | DevOps      | Security   | Manager  |
| Content review      | Owner       | Manager     | SMEs       | Watchers |
| Drift detection     | CI Bot      | DevOps      | Owner      | Team     |
| Security incidents  | Security    | Manager     | Legal      | All      |
| Policy updates      | DevOps      | Manager     | Team Leads | All      |

### Roles

- **CI Bot**: Automated GitHub Actions workflows
- **Owner**: Page maintainer listed in frontmatter
- **Manager**: Policy owner (approver for GOVERNANCE.md changes)
- **DevOps**: Pipeline maintenance, workflow configuration
- **Security**: Secret scanning, incident response
- **Reviewers**: Code review for yellow/red PRs

---

## Service Level Objectives (SLOs)

| Metric                | Target    | Measurement           |
| --------------------- | --------- | --------------------- |
| Build success rate    | ≥ 99%     | Weekly aggregation    |
| Link errors per month | ≤ 5       | Lychee weekly scans   |
| Stale pages           | ≤ 10%     | Weekly stale report   |
| PR auto-merge (green) | < 2 min   | GitHub Actions timing |
| Security scan         | 100% pass | Every PR via gitleaks |

### Monitoring

- GitHub Actions workflow status
- Weekly stale report issue
- Monthly metrics review in team retrospective

---

## Stop Rules

### Immediate Halt (Red Flag)

**Any of these trigger deployment freeze:**

1. Security incident (leaked credentials, PII, secrets)
2. Legal/Brand violation flagged by leadership
3. Multiple build failures (>3 in 24h)
4. Critical link to malicious/inappropriate content

**Process:**

1. Pause all publishes (disable auto-merge)
2. Open security incident issue
3. Notify manager and security team
4. Investigate and remediate
5. Post-incident review before resuming

### Sunset Decision (Lack of Use)

**If after 60-day trial:**

- Zero or minimal page views (if analytics available)
- No questions answered via site links
- No community adoption

**Action:** Conduct retrospective, then either:

- Pivot to internal-only documentation
- Archive and redirect to alternative resource
- Extend trial with adjusted success metrics

---

## Maintenance Windows

### Weekly (Automated)

- Monday 2 AM UTC: Stale page scan
- Monday morning: Dependabot updates

### Monthly (Manual)

- First week: Review stale report, close or extend
- Release tag: `site-YYYY.MM` with updated release manifest and State ledger entry
- SLO review in team retrospective

### Quarterly (Strategic)

- Content audit: Archive unused pages
- Policy review: Update GOVERNANCE.md if needed
- Success metrics: Track link adoption, repeat questions

---

## Change Process

### To This Document (GOVERNANCE.md)

1. Open PR with rationale
2. Requires approval from Manager (Policy Owner)
3. Notify team of changes
4. Update training materials if needed

### To Content Guard Rules

1. Update `scripts/guard.mjs` forbidden patterns
2. Test against existing content
3. Document in PR why pattern is added
4. Approve via normal green/yellow/red flow

### To Workflows

1. Test in feature branch
2. Validate on sample PRs
3. Merge only after successful dry-run
4. Monitor first few runs closely

---

## Emergency Contacts

For urgent issues:

| Issue Type        | Contact            | Response Time  |
| ----------------- | ------------------ | -------------- |
| Security leak     | @security-team     | 15 minutes     |
| Pipeline down     | @devops-oncall     | 1 hour         |
| Content dispute   | @manager           | 1 business day |
| General questions | #docs-help channel | Best effort    |

---

## Compliance Checklist

Before ANY commit to main:

- [ ] Sanitization checklist complete
- [ ] All CI checks green (or yellow with approval)
- [ ] No placeholder tokens (YOUR_TOKEN_REPLACE_ME)
- [ ] Frontmatter validated
- [ ] Links checked
- [ ] Secret scan clean

---

## Version History

| Version | Date       | Changes            | Author | Approved By     |
| ------- | ---------- | ------------------ | ------ | --------------- |
| 1.0     | 2024-11-04 | Initial governance | @lop   | @manager-handle |

---

## Measurement Policy

- North star: helpfulness ≥ 60% Yes over ≥ 100 views/month per page.
- Sanity: time to first answer, search-refine rate, dead-end exits.
- Action rule: any page under threshold gets needs-revision and an issue titled "Revise narrative: \<page\>" in the next train. Dead-end > 25% adds a top-of-page CTA before rewriting.

---

## Voice and Tone Guidelines

Every Playbook/Guide/Runbook page must include:

```yml
title: …
change_type: minor
band: A
audience: squad|leads|exec
tone: practical|coaching|policy
narrative_goal: resolve|decide|teach
primary_action: /operate/handover-20-min
review_after_days: 90
owner_role: chapter-lead
```

### CI enforcement

- Presence (Milestone A).
- Allowed values + primary_action is an internal link (Milestone B).

---

**Last Reviewed:** 2024-11-04  
**Next Review:** 2025-02-04 (90 days)  
**Owner:** @lop  
**Policy Owner Approval:** @manager-handle  
**Change Control:** Amend only via PR tagged `governance` + approval from Policy Owner
