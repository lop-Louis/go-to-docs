---
title: Handshake Contracts
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 60
status: 'draft'
audience: Teams aligning expectations between partners
tone: Plainspoken, candid, energetic
narrative_goal: Capture the structure of handshake agreements before the full writeup ships
primary_action: Draft your contract using the approval, escalation, and cadence prompts
---

# Handshake Contracts

Handshake contracts spell out how two groups promise to work together without waiting for a formal policy. Treat them as a compact to surface expectations, response times, and how you’ll recover when things slip.

<a href="#example-outline" data-primary-action>Draft your handshake contract with the outline</a>

## When to draft one

- A stream depends on another team to hit a shared milestone.
- You’re piloting a new way of working and need clarity before bureaucracy catches up.
- An incident exposed unclear ownership and you need a fast correction.

## Core ingredients

| Piece       | Guidance                                               | Example                                                                                                                                    |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Purpose     | One line that names the shared outcome.                | “Keep release notes current within 24 hours of merge.”                                                                                     |
| Approvals   | Who signs off and how fast they respond.               | “Decisions acknowledged within 48h. Backups listed in the contract.”                                                                       |
| Escalation  | Default path when something blocks progress.           | “Owner → Backup → Sponsor, each with 24h to respond.”                                                                                      |
| Cadence     | How you review whether the contract still makes sense. | “Weekly 15-minute checkpoints referencing the [state visibility map](../runbooks/state-visibility.md); update metrics in the monthly tag.” |
| Exit metric | Signal that shows the contract is working—or isn’t.    | “Support backlog stays under 5 tickets older than 3 days.”                                                                                 |
| Sunsets     | Trigger for rewriting or retiring the contract.        | “Revisit after the quarterly retrospective or any severity-1 incident.”                                                                    |

## How to stand one up

1. **Draft the one-line intent.** If you can’t explain why the contract exists, you’re not ready.
2. **Name owners and backups.** Contracts fail when they rely on “the team” instead of specific roles.
3. **Define turnaround times.** State the SLA for approvals, escalations, and status pings.
4. **Agree on the exit metric.** Choose a signal you can measure weekly so drift is obvious.
5. **Write the escalation ladder.** Include response windows so no one wonders how long to wait.
6. **Schedule a cadence review.** Protect 15 minutes to inspect the metric, walk the [state visibility map](../runbooks/state-visibility.md), and renew the agreement.
7. **Share the contract link.** Pin it in both teams’ channels and reference it in relevant docs.

## Example outline

```markdown
### Handshake: API team ↔ Support

- **Purpose:** Keep production incidents under 1 per month through faster triage.
- **Approvals:** Support leads respond within 48h; API backups cover PTO.
- **Escalation:** Support → API on-call → Engineering sponsor (24h each hop).
- **Cadence:** Friday 10:00 ET sync for 15m. Log notes in shared doc.
- **Exit metric:** 90% of Sev-2 issues resolved in < 2 business days.
- **Sunset:** Revisit after Q1 or any Sev-1 escalation.
```

Store the contract beside related docs (Decision Spine, Answer Ledger) so people can find the why, the decision history, and the support structure in one hop.
