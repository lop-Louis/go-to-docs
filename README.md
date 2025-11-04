# Go-To Docs 📚

A public VitePress documentation site for Band A content (sanitized, public-safe practices and patterns).

**Live Site:** https://lop-Louis.github.io/go-to-docs

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run docs:dev

# Build for production
pnpm run docs:build

# Preview production build
pnpm run docs:preview
pnpm run validate
pnpm run review:update
```

---

## What is This?

A self-policing documentation site that:

- ✅ Only publishes **Band A** content (no internal/sensitive data)
- 🤖 Automatically enforces sanitization rules via CI
- 📅 Tracks content staleness and auto-flags drift
- 🚀 Auto-merges green PRs, blocks red ones
- 🔗 Validates links and scans for secrets

See [GOVERNANCE.md](./GOVERNANCE.md) for complete details.

---

## Contributing

### Before You Submit

1. Check the [Sanitization Checklist](./docs/sanitization.md)
2. Add required frontmatter to every page (see [Band A Guidelines](./docs/band-a.md))
3. Test locally: `pnpm run docs:dev`

**Automation handles most checks:**

- Pre-commit hooks run guard + link validation automatically
- CI posts detailed check results as a PR comment
- Manual review only needed for nuanced content decisions

### PR Process

- **🟢 Green** - Auto-merged within 1 minute (all automated checks pass)
- **🟡 Yellow** - Human review needed (warnings detected)
- **🔴 Red** - Blocked until fixed (violations found)

**Automated checks include:**

- Frontmatter validation
- Change size vs declared `change_type`
- Content guard (Band A compliance)
- Link validation (internal + external)
- Build test
- Secret scanning

---

## Scripts

| Command                  | Description                            |
| ------------------------ | -------------------------------------- |
| `pnpm run docs:dev`      | Start local dev server                 |
| `pnpm run docs:build`    | Build production site                  |
| `pnpm run guard`         | Check Band A compliance                |
| `pnpm run links`         | Check internal/external links          |
| `pnpm run stale`         | Generate stale pages report            |
| `pnpm test`              | Run all tests                          |
| `pnpm run validate`      | Lint + type + guard + build + links    |
| `pnpm run review:update` | Set last_reviewed today in frontmatter |

---

## DevOps Setup

### GitHub Configuration

1. **Enable GitHub Pages:** Settings → Pages → Source: GitHub Actions
2. **Branch Protection (Recommended):**
   - Settings → Branches → Add rule for `main`
   - Require status checks: ✅ Content Guard, ✅ PR Checklist, ✅ Lighthouse CI
   - Require review from code owners: ✅
   - Require linear history: ✅
   - Require deployments to succeed: ✅
3. **Labels:** Create `green`, `yellow`, `red`, `stale`, `automated`, `documentation`
4. **Secrets (Optional):**
   - `PLAUSIBLE_DOMAIN` - For analytics integration
   - Custom tokens if using external services

### Branch Protection Rules

Enforce quality gates by requiring these checks to pass:

```yaml
Required status checks:
  - Content Guard (content-guard.yml)
  - PR Checklist Automation (pr-checklist.yml)
  - Lighthouse CI (lighthouse.yml)
  - Build Test (included in content-guard)
```

**Manual Setup:**

1. Go to Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
5. Search and select required checks (after first workflow run)
6. Save changes

### Acceptance Tests

- [x] Push to `main` deploys to GitHub Pages
- [x] PR with Band A violation is blocked
- [x] Valid PR auto-merges (green status)
- [x] Weekly stale report created
- [x] Monthly release tagging automated
- [x] All tests pass: `pnpm test`
- [x] Performance audits via Lighthouse CI
- [ ] Branch protection rules configured (manual GitHub setup required)

---

## Architecture

### CI/CD Workflows

1. **Pages** (`pages.yml`) - Deploys to GitHub Pages on push to main
2. **Content Guard** (`content-guard.yml`) - Validates PRs, auto-labels, enables auto-merge
3. **PR Checklist** (`pr-checklist.yml`) - Posts automated check results as PR comment
4. **Lighthouse CI** (`lighthouse.yml`) - Performance, accessibility, SEO audits
5. **Stale Pages** (`stale-pages.yml`) - Weekly audit on Mondays at 2 AM UTC
6. **Release** (`release.yml`) - Monthly changelog finalization and tagging

### Key Files

- `scripts/guard.mjs` - Band A validation + inclusive language heuristics
- `scripts/stale.mjs` - Staleness detection
- `scripts/link-check.mjs` - Internal/external link validation
- `scripts/update-last-reviewed.mjs` - Frontmatter date injection
- `docs/.vitepress/config.ts` - Site configuration
- `.lychee.toml` - Link checker config
- `GOVERNANCE.md` - Complete governance policy

---

## License

- **Code:** [MIT](./LICENSE)
- **Docs:** [CC BY-NC 4.0](./LICENSE-docs)

---

## Links

- 📖 [Live Site](https://lop-Louis.github.io/go-to-docs)
- 📋 [Governance](./GOVERNANCE.md)
- ✅ [Band A Guidelines](./docs/band-a.md)
- 🔒 [Sanitization Checklist](./docs/sanitization.md)

**Built with** [VitePress](https://vitepress.dev/) • Automated by GitHub Actions 🤖

- **scripts/**: Utility scripts for CI and content maintenance.
- **.github/**: CI workflows, templates, and issue labelers.
- **LICENSE**: MIT for code, CC BY-NC 4.0 for documentation.

## Key Features

- **Feedback System**: Allows the team to suggest improvements or flag outdated content.
- **Versioning**: Content evolves over time with minimal friction. Current version is available under `/v2/`.
- **Stale Detection**: Content marked stale if it hasn't been reviewed or updated in a predefined time.
- **Announcements**: A living log of changes and updates made to the documentation with ownership details.

## Usage

- **Visit**: [Go-To-Docs](https://ORG.github.io/Go-To-Docs) to view the documentation.
- **Contribute**: Fork, create a branch, and submit a PR with your changes. Make sure to update the `change_type` to either `patch`, `minor`, or `major`.
- **Feedback**: Use the "Ask KL" buttons on each page to raise issues or ask questions. Feedback is routed to GitHub Issues for traceability.

## Roadmap

1. **Pilot v1**: 60-day trial period to evaluate effectiveness in reducing repeat questions and streamlining decision-making.
2. **v2 Preview**: Introduce new structure based on feedback with soft A/B testing.
3. **Long-Term**: Scale the platform with additional resources and integrations based on usage patterns.

## Licensing

- **Documentation**: CC BY-NC 4.0
- **Code**: MIT
