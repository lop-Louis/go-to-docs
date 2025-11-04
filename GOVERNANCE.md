# Governance and Drift Prevention

## Purpose

Keep public documentation useful, safe, and small. Bots chase compliance; humans think strategically.

---

## Content Bands

### Band A Only (PUBLIC)

**What belongs:**

- Generic role definitions and responsibilities
- Process patterns without company-specific details
- Anonymized examples with no identifying information
- Publicly available metrics as ranges or deltas
- Original code samples or properly licensed material

**What does NOT belong:**

- Internal product names, URLs, screenshots
- Ticket IDs (JIRA-1234, Linear-ABC, etc.)
- Employee names or identifying details
- Exact revenue, costs, or customer counts
- Internal infrastructure specifics
- Vendor-specific implementations
- Calendar dates or project timelines

See `docs/band-a.md` for detailed examples.

---

## Content Lifecycle

```
Draft → Review → Live → Watch → Stale → Archive
```

1. **Draft**: Content in progress, not yet published
2. **Review**: PR open, undergoing sanitization checks
3. **Live**: Published and within refresh window
4. **Watch**: Approaching staleness threshold (automated alerts)
5. **Stale**: Exceeded `refresh_after_days`, needs review
6. **Archive**: No longer maintained, kept for reference with tombstone

---

## Required Frontmatter

Every markdown page must include:

```yaml
---
title: Page Title # Human-readable title
band: A # Content classification (only A allowed)
owner: '@handle' # Responsible maintainer (GitHub handle)
refresh_after_days: 90 # Review window (typically 60-90)
change_type: patch # patch | minor | major
status: live # live | stale | archived | draft
---
```

**Field Validation:**

- `title`: Required, non-empty string
- `band`: Must be exactly 'A'
- `owner`: GitHub handle starting with @
- `refresh_after_days`: Integer between 1-365
- `change_type`: patch (≤200 lines), minor (≤400 lines), major (>400 lines)
- `status`: One of: live, stale, archived, draft

---

## PR Gates (Automated Checks)

All pull requests undergo these automated checks:

### 🔴 Red (Blocking)

- Missing required frontmatter fields
- `band` set to anything other than 'A'
- Forbidden patterns detected (internal URLs, ticket IDs, secrets)
- Invalid `change_type` or `status` values
- Secret scan fails (gitleaks)
- Build fails

**Action:** PR is blocked until fixed

### 🟡 Yellow (Warning)

- File size exceeds `change_type` limit
- Broken external links detected
- TODO/FIXME markers in content
- Possible internal references flagged
- Owner format unusual (missing @)

**Action:** Requires one reviewer approval before merge

### 🟢 Green (Auto-merge)

- All checks pass
- No warnings
- Sanitization checklist complete

**Action:** Auto-merged within 1 minute via squash merge

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
- Release tag: `site-YYYY.MM` with changelog
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

**Last Reviewed:** 2024-11-04  
**Next Review:** 2025-02-04 (90 days)  
**Owner:** @lop  
**Policy Owner Approval:** @manager-handle  
**Change Control:** Amend only via PR tagged `governance` + approval from Policy Owner
