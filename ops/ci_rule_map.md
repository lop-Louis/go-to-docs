# ci rule map (private)

budget: "cold-start ≤ 5 minutes"

blocks (l4):

- sanitization/red-lines (gdpr, secrets, unverifiable numbers)
- broken traceability (cannot map pr → decision/exception → guardrail → page → signal → receipt)

l3 (conscious override):

- missing traceability link (if reversible)
- signals over cap or stale after one release warning

l2 (nudge):

- tone/cta pattern issues
- missing metric mapping
- archetype deviations

notes:

- all ids and tags lowercase
- tag format: `vYYYY.MM-<seam>` (example `v2025.11-navigation`)
- `pnpm run docs:guard` measures total runtime and fails only for red-lines or traceability gaps; drift/state/release/ux issues log warnings (nudge) but do not block.
