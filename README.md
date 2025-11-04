# Go-To Docs 📚

A public VitePress documentation site for Band A content (sanitized, public-safe practices and patterns).

**Live Site:** https://lop-Louis.github.io/go-to-docs

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
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
3. Test locally: `npm run docs:dev` and `npm run guard`

### PR Process

- **Green** ✅ - Auto-merged within 1 minute
- **Yellow** ⚠️ - Needs one review
- **Red** 🛑 - Blocked until fixed

---

## Scripts

| Command              | Description                 |
| -------------------- | --------------------------- |
| `npm run docs:dev`   | Start local dev server      |
| `npm run docs:build` | Build production site       |
| `npm run guard`      | Check Band A compliance     |
| `npm run stale`      | Generate stale pages report |
| `npm test`           | Run all tests               |
| `npm run validate`   | Run guard + build           |

---

## DevOps Setup

### GitHub Configuration

1. **Enable GitHub Pages:** Settings → Pages → Source: GitHub Actions
2. **Branch Protection:** Require Content Guard checks on `main`
3. **Labels:** Create `green`, `yellow`, `red`, `stale`, `automated`
4. **Optional:** Add `CLOUDFLARE_TOKEN` secret for analytics

### Acceptance Tests

- [x] Push to `main` deploys to GitHub Pages
- [x] PR with Band A violation is blocked
- [x] Valid PR auto-merges
- [x] Weekly stale report created
- [x] All tests pass: `npm test`

---

## Architecture

### CI/CD Workflows

1. **Pages** (`pages.yml`) - Deploys to GitHub Pages on push to main
2. **Content Guard** (`content-guard.yml`) - Validates PRs, auto-merges green
3. **Stale Pages** (`stale-pages.yml`) - Weekly audit on Mondays at 2 AM UTC

### Key Files

- `scripts/guard.mjs` - Band A validation
- `scripts/stale.mjs` - Staleness detection
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
