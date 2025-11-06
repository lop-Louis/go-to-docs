---
title: SLI States
change_type: minor
band: A
owner: '@lop'
refresh_after_days: 60
status: 'draft'
---

# SLI States

| State        | Entry                        | Exit                  | SLI                      |
| ------------ | ---------------------------- | --------------------- | ------------------------ |
| 0. Idle      | No owner                     | Owner set             | Time in idle             |
| 1. Framing   | One-line why                 | Exit metric agreed    | Decision latency         |
| 2. Ready     | Scope/tests/contracts listed | First PR merged       | Lead time to first value |
| 3. In flight | Active PRs > 0               | Guardrails green      | Guardrail pass rate      |
| 4. Review    | Merged, awaiting verify      | Metric moves/rollback | Verification time        |
| 5. Done      | Metric sustained 14d         | —                     | Rework rate              |
| 9. Drift     | Violation/missing why        | Back to Framing       | Drift incidents          |
