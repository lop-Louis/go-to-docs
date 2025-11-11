<!-- title tip: feat(<seam>): <short change>; tag vyyyy.mm-<seam> -->
<!-- seams: navigation | governance | signals | tests | releases -->

## why

<one sentence: intent + tradeoff>

<!-- L4: required. Tone lint applies (ops_pack/tone_lint.json). -->

## what changed

- <bullet 1>
- <bullet 2>
- <bullet 3>
<!-- L2: nudge if vague or missing. Keep to ~3 bullets. -->

## acceptance checks

- [ ] opener pattern renders above first section
- [ ] required frontmatter valid and lowercase ids
- [ ] traceability complete (see links)
- [ ] ci cold-start ≤ 5m; red-lines/traceability blocking verified
- [ ] annex lab runs in ≤ 10 minutes (attach evidence or path)
<!-- L4: list must exist and be checkable. Frontmatter keys/ids: ops_pack/canonical_ids.md.
     L4: traceability block; red-lines in ci_rule_map.md. L3: annex lab proof allowed with exception if truly pending. -->

## signals baseline (last-30-days)

- m-time-to-answer: <value + range>
- m-lab-pass: <value>
<!-- L4: provide baselines for any claimed movement. Metrics: ops_pack/signal_registry_seed.csv; anchors: dashboard_home_stub.md. -->

## receipts plan

- leading: <metric id + expected direction/range>
- lagging: <metric id + expected direction/range>
- tag: `vyyyy.mm-<seam>`
<!-- L4: tag format lowercase. Receipt categories live in receipts_template.md. -->

## traceability links

- decision: </governance/decisions/<decision_id>.md>
- snapshot: </governance/state/vyyyy.mm-<seam>.md>
- receipts: </signals/receipts/vyyyy.mm-<seam>.md>
- annex_lab: </labs/>
- ci_run: <url>
- exceptions: </governance/exceptions.md> (public) | </governance/\_exceptions_ledger.csv> (private)
<!-- L4: decision link must resolve. L3: snapshot/receipts may be pending with exception (ops_pack/exception_template.md).
     L2: annex_lab and ci_run nudged but merge allowed. -->

## exceptions

- none
<!-- or:
- id: <exc-2025-xx> | owner: louis | expiry: yyyy-mm-dd | exit: proof metric returns within 10% of baseline for 7 days
  -->

<!-- quick references:
- ids & guards: ops_pack/canonical_ids.md
- signals: ops_pack/signal_registry_seed.csv
- tone verbs: ops_pack/tone_lint.json
- ci policy: ops_pack/ci_rule_map.md
- receipts & snapshot shells: ops_pack/receipts_template.md, ops_pack/state_snapshot_template.md
- exceptions: ops_pack/exception_template.md
- archetypes: ops_pack/page_archetype_*.md
-->
