---
title: FAQ for New Joiners
band: A
owner: '@lop'
refresh_after_days: 60
change_type: patch
status: live
last_reviewed: '2025-11-04'
---

# FAQ for New Joiners

Common questions from engineers joining the team, with quick answers.

## Policy → Action in 10 seconds

- **Rule of thumb:** Submit any expense within **14 days**.
- **Action today:** If your last receipt is older than **10 days**, submit it now.
- **If unclear:** Ask "**Which date controls eligibility**?" then follow the SLA.

Need more detail? Read the public-safe pattern: [Expenses: Policy → Action](./pattern-expense-sla)

## Technical Setup

### What's our tech stack?

Varies by team, but common patterns:

- **Frontend**: React/TypeScript, Next.js or Vite
- **Backend**: Node.js, Python, or Go
- **Databases**: PostgreSQL, Redis for caching
- **Infrastructure**: Containerized, CI/CD via GitHub Actions

### How do I get access to systems?

1. Check onboarding ticket for access request links
2. Most tools use SSO (single sign-on)
3. GitHub org invite comes via email
4. For urgent access, ping #help-access channel

### What's the development workflow?

1. Branch from `main`
2. Open PR when ready (draft PRs welcome)
3. Request review from suggested reviewers
4. Address feedback
5. Merge when approved and CI passes

## Process & Culture

### How formal are our meetings?

- Stand-ups: casual, 5-10 min updates
- Planning: structured, bring questions
- Retros: safe space, speak freely
- 1:1s: Your agenda, use it for career chat

### What should I work on first?

Your manager assigns initial tasks. Good starter issues are tagged `good-first-issue`.
After 2 weeks, you'll pick up regular sprint work.

### How do code reviews work?

- Expect first review within 4 business hours
- Reviews focus on: correctness, readability, test coverage
- "Nit" comments are optional to address
- Approvers can merge (or you merge after approval)

### How do I ask for help?

1. Try to unblock yourself for 20-30 min
2. Search docs and past conversations
3. Ask in team channel with context (what you tried, error messages)
4. For urgent: DM whoever is on-call (see rotation doc)

**Pro tip**: Saying what you've already tried speeds up help

### What meetings should I attend?

Required:

- Team stand-up (daily)
- Sprint planning (bi-weekly)
- Retrospectives (bi-weekly)

Optional but useful:

- Guild meetings (topic-specific)
- Office hours (ask experts anything)
- Show & tell (demos)

## Learning & Growth

### How do I learn the codebase?

1. Start with README in main repos
2. Pick a small bug fix to trace through code
3. Pair with team members
4. Read recent PRs to see what's changing

### When can I ship to production?

After you've:

- Merged 2-3 PRs successfully
- Shadowed a deployment
- Understand rollback procedure
- Feel confident (if not, that's okay - just ask)

Usually by week 3-4.

### How do I give feedback?

- To peers: directly, or in retros
- To manager: 1:1s or anytime via DM
- To process: retros or #team-feedback channel
- Anonymous: feedback form (link in handbook)

## Jargon Decoder

- **PR**: Pull Request
- **LGTM**: Looks Good To Me (approval comment)
- **WIP**: Work In Progress
- **POC**: Proof of Concept
- **RFC**: Request for Comments (design doc)
- **On-call**: Rotation for handling production issues

## Still stuck?

- Ping `@your-onboarding-buddy` assigned in week 1
- Ask in `#new-joiners` channel
- DM your manager

**Remember**: There are no dumb questions in your first 90 days (or ever).

---

See also:

- [Decision Spine](./decision-spine) - how we make technical decisions
- [Sanitization Checklist](./sanitization) - for contributing to this site
