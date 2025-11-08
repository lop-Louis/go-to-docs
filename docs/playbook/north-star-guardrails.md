---
title: North Star & Guardrails
band: A
owner: '@lop'
refresh_after_days: 90
change_type: patch
status: live
audience: Leaders, sponsors, and chapter teams wanting clarity without deep technical detail
tone: Plainspoken, candid, reassuring
narrative_goal: Explain how North Stars, guardrails, roles, and rhythm keep delivery steady without excess process
nav_group: Guides
nav_order: 20
nav_label: North Star & Guardrails
nav:
  - sidebar
---

# North Star & Guardrails

Keep direction, autonomy, and accountability in balance. <a href="#executive-summary" data-primary-action>Align your stream on the brief</a> or <a href="#watch-the-brief" data-secondary-action>Drop a walkthrough video when it is ready</a>.

## Executive summary {#executive-summary}

We align on a clear **North Star** so everyone knows the destination. We set a few **guardrails** so teams do not drift. Chapter members own the **why** and the work. The **Chapter Lead** keeps the rails healthy and the rhythm steady. Lightweight **automation** handles the boring checks so people can focus on judgment. When we must step outside the rails, we log the reason and learn from it.

## Watch the brief {#watch-the-brief}

_Video placeholder: embed the walkthrough for this brief here once it is recorded._

## WHY — the reasoning

1. **Direction beats speed.** A one-line North Star turns scattered actions into progress.
2. **Autonomy needs boundaries.** Clear guardrails reduce rework and politics while keeping creativity alive.
3. **Accountability must be simple.** Public state, named owners, and short reviews make priorities obvious.
4. **Automation should be boring.** Machines check repeatable parts and free people to debate the exceptions.
5. **Learning is a habit.** Exceptions stay visible and owned so the team improves together.

## WHAT — the core concepts

### North Star

- Write one sentence that describes the outcome and how we know it landed.
- Example: _"Customers can complete a policy change in under 3 minutes with fewer than 5 clicks."_

### Guardrails

- A small set of checks that prevent surprises: required fields, decision log present, broken links avoided, design tokens consistent.
- Guardrails are **overridable** with a written reason so autonomy stays intact.

### Roles

- **Chapter Members** — Responsible and accountable for the **why**, the plan, and delivery.
- **Chapter Lead** — Responsible for the rails and rhythm; accountable for visibility and escalations.
- **Sponsor / Product** — Consulted on outcomes and trade-offs.
- **Northbook Assistant** — Runs automation and posts results.

### Rhythm

- **Weekly 15-minute review** — Current state for each stream, risks, and exceptions.
- **Biweekly sweep** — Tidy decisions and adjust guardrails if they create noise.
- **Per change** — Guardrail checks run automatically and exceptions are logged.

### Visibility

Each stream keeps an owner, one-line why, exit metric, and current state label. State changes stay public so people can see progress without meetings.

## HOW — practical structure

### RACI overview

| Activity                          | Chapter Member | Chapter Lead | Sponsor/Product | Northbook Assistant |
| --------------------------------- | -------------- | ------------ | --------------- | ------------------- |
| Write the **why** and exit metric | R/A            | C            | C               | I                   |
| Define guardrails for the stream  | C              | R/A          | C               | I                   |
| Run routine checks                | I              | I            | I               | R                   |
| Log decisions and exceptions      | R              | A            | C               | I                   |
| Keep public state up to date      | R              | A            | I               | I                   |
| Escalate when outside rails       | R              | A            | I               | I                   |

**Legend**: R responsible, A accountable, C consulted, I informed.

### SLII model — adapt support to development level

SLII (Situational Leadership® II) ties the leadership style to a person’s competence and commitment for a specific stream.

| Development level              | Typical signs                               | What they need           | Leadership style    | How we provide it                                                    | Northbook’s help                                  |
| ------------------------------ | ------------------------------------------- | ------------------------ | ------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| **D1 – Enthusiastic beginner** | High energy, low experience, many questions | Direction and quick wins | **S1 – Directing**  | Give a clear why, break work into steps, set short checkpoints       | Templates, default guardrails, starter checklists |
| **D2 – Disillusioned learner** | Stuck, frustrated, progress uneven          | Coaching and structure   | **S2 – Coaching**   | Pair on scoping, review decisions together, celebrate small progress | Comment nudges, highlight risks, show examples    |
| **D3 – Capable but cautious**  | Good skills, inconsistent confidence        | Support and trust        | **S3 – Supporting** | Agree outcomes, let them choose method, review outcomes not steps    | Quiet checks, exception logging without noise     |
| **D4 – Self-reliant achiever** | Delivers consistently, anticipates risks    | Space and recognition    | **S4 – Delegating** | Set the target, step back, ask for a demo on a date                  | Minimal checks, periodic metric snapshots         |

We set a level per stream, adjust as context shifts, and match our style accordingly. This keeps support proportional—neither over-managing nor under-supporting.

### Guardrails v1 — light and useful

1. **Decision log exists** for each stream.
2. **Change request** includes the why, a risk note, and the stream card link.
3. **Documentation checks** confirm required headings, links, and no orphaned pages.
4. **Design token or config drift** stays in sync with `main`.
5. **Exception rule** allows overrides with a one-line reason, date, and owner.

### Measures that matter

We track simple trends, not punitive targets:

- **Guardrail pass rate** — Fewer surprises.
- **Lead time to first value** — How fast we get something small in front of users.
- **Rework in 14 days** — How often we fix or revert.
- **Decision latency** — Time from proposal to decision.

### Stop rule and backup plan

- **Stop rule** — If two consecutive 14-day cycles fail to improve pass rate or reduce drift, pause automation changes and run a short root-cause session. Cut scope by 20% for the next cycle.
- **Backup** — If automation is unstable, freeze at the last stable version and replace checks with a short checklist in the change request for one cycle. Re-automate only the two checks that saved the most time.

## Philosophy

1. **Direction first. Methods are free.** People do their best work when the destination is clear and the path is flexible.
2. **Transparency builds trust.** Public state and simple receipts prevent hidden work.
3. **Defaults, not diktats.** Good defaults make the right behavior the easy behavior. Exceptions need a reason, not permission.
4. **Small bets, steady gains.** We improve a little every cycle instead of chasing silver bullets.
5. **People over process.** SLII reminds us to adjust support to people, not the other way around.

## FAQ

**Is this more bureaucracy?** No. If a guardrail adds more than a minute for no clear benefit, we strip or relax it.

**Does automation block work?** Only when a check catches an issue we agreed matters. Anyone can override with a reason.

**What if teams need different rules?** Guardrails are local to each stream. Start light, then tune as needed.

**How will I see progress?** Each stream page shows the owner, why, exit metric, and current state. Reviews take 15 minutes.

## Appendix A — Example entries

- **Example North Star** — _Reduce claims submission time from 12 minutes to 6 minutes while keeping satisfaction above 4.5/5._
- **Example exit metric** — _Median time under 6 minutes for two consecutive weeks._
- **Example guardrail** — _A change request is rejected if the decision log link is missing, unless an exception line is added._

## Appendix B — Minimal artifacts

- One charter page (this document) per stream.
- A shared table listing streams, owners, North Star, exit metric, SLII level, and state.
- A decision log per stream.
- The Northbook Assistant running the four checks above.
