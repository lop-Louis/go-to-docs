## 🤖 Automated Checks

The following checks run automatically on every PR:

- ✅ **Frontmatter validation** - Required fields presence
- ✅ **Change size analysis** - Matches declared `change_type`
- ✅ **Content guard** - Band A compliance, no internal/sensitive data
- ✅ **Link validation** - Internal and external links working
- ✅ **Build test** - VitePress builds successfully
- ✅ **Secret scan** - No API keys, tokens, or credentials

**Check results will be posted as a comment on this PR automatically.**

---

## ✋ Manual Verification Required

### Public Safety ✅

Before submitting, verify these items (not fully automatable):

- [ ] No calendar dates (use relative: "within 3 months" vs "Q2 2024")
- [ ] Code samples are original or properly attributed
- [ ] Screenshots use dummy data (if applicable)
- [ ] Exact numbers replaced with ranges ("10-20" vs "15")

### Testing 🧪

- [ ] Previewed locally: `pnpm run docs:dev`

**Note:** Guard, lint, and link checks run automatically in pre-commit hooks and CI.

## What's Changed

<!-- Brief description of your changes -->

## Context

<!-- Why is this change needed? How does it help? -->

---

**Automated CI will:**

- 🤖 **Post detailed check results** as a comment on this PR
- 🟢 **Auto-merge** if all checks pass (green status)
- 🟡 **Request review** for warnings (yellow status)
- 🔴 **Block merge** until issues fixed (red status)

See [Sanitization Checklist](../docs/sanitization.md) for detailed guidance.
