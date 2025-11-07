## 🤖 Automated Checks

Per [Anti-drift Content Governance](../docs/governance.md), every PR runs:

- `pnpm run frontmatter:lint` — validates Band A metadata and `nav` schema
- `pnpm run guard` — Band A forbidden patterns + change-size sanity
- `pnpm run drift` — storytelling, inclusive language, and change-size advisories
- `pnpm run ux:scan` — intro sentence + paired CTA check
- Nav consistency check — generated nav/sidebar matches frontmatter `nav`
- `pnpm run links` — internal/external link validation
- `pnpm run docs:build` — production build with CTA enforcement
- Secret scan (`gitleaks`)

Results post automatically as a PR comment; review that report for red/yellow findings.

---

## ✋ Manual Verification Required

### Public Safety ✅

- [ ] Sanitized per the [checklist](../docs/sanitization.md) (relative dates, dummy data, licensed code, ranges)
- [ ] Opening paragraph follows the CTA contract: one plainspoken sentence + inline primary & secondary actions ([policy](../docs/governance.md#cta--feedback-contract))
- [ ] Frontmatter `nav` array (`main`, `sidebar`, `external`, `none`) reflects where the page should appear. If you changed it, regenerate `.vitepress/navigation.generated.ts` in this PR.

### Testing 🧪

- [ ] Previewed locally: `pnpm run docs:dev`

**Note:** Guard, drift, UX, and link checks run automatically in pre-commit hooks and CI.

---

## What's Changed

- [ ] Add changes into `docs/CHANGELOG/site-vYYYY.MM.md` if applicable

## Context

- [ ] Link to relevant issues, PRs, or decision records

---

**Automated CI will:**

- 🤖 Post detailed check results on the PR
- 🟢 Auto-merge if everything is green
- 🟡 Request review for warnings
- 🔴 Block merges until red issues are fixed

See [Anti-drift Content Governance](../docs/governance.md) and the [Sanitization Checklist](../docs/sanitization.md) for the complete rules.
