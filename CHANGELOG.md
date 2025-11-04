# Changelog

All notable changes to the public documentation site are tracked here. Format follows monthly tags: `site-vYYYY.MM`.

## site-v2025.11 (2025-11-04)

### Added

- Initial public Band A pages (decision spine, facilitation, answer ledger, accessibility quick wins, FAQ)
- Governance policy (`GOVERNANCE.md`)
- Content guard and stale detection scripts
- Monthly release rhythm doc (`docs/monthly-release.md`)

### Updated

- Band A guidelines with neutral substitution table
- Sanitization checklist with enhanced final self-check section

### Fixed

- Removed examples that triggered false-positive guard warnings (ticket IDs now placeholders)
- Feedback component SSR compatibility (no `location` reference server-side)

### Tooling / Automation

- CI pipelines: deploy, guard, stale audit
- Issue templates (contribution, stale report, security incident)
- Dependabot configuration

### Governance / Policy

- Added approval tracking fields to version history

### Metrics (placeholder – fill next cycle)

- Pages viewed: TBD
- Feedback issues: TBD helpful / TBD not-helpful
- Stale pages at tag time: 0

### Next Focus

- Add page-level view metrics (optional)
- Expand answer ledger examples for reuse patterns
- Introduce educational ADR section

---

## Unreleased

### Planned

- Release workflow for automated tagging
- Improved guard differentiation (educational examples vs violations)
