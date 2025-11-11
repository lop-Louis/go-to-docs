---
name: decision rollout
about: implement a decision entry with traceability and receipts
title: '[decision] <short name> – vyyyy.mm-<seam>'
labels: ['decision', 'ops']
assignees: ['louis']
---

<!-- opener pattern: one-sentence why, two actions, exit metric -->

## why

<one sentence: problem + tradeoff accepted>

<!-- L4: required. Sets traceability spine. Tone lint applies (ops_pack/tone_lint.json). -->

## actions (choose two)

- <action a>
- <action b>
  <!-- L2: nudge if not exactly two. Use soft verbs from allowlist in ops_pack/tone_lint.json. -->

## exit metric

<one line: metric id + expected change>

<!-- L4: required. Pick metric ids from ops_pack/signal_registry_seed.csv. -->

---

## scope

- in: <covered now>
- out: <explicitly excluded>
<!-- L3: allowed to ship with exception if missing (see ops_pack/exception_template.md). -->

## acceptance (paste, then adjust)

- [ ] opener pattern above first section on covered pages
- [ ] required frontmatter present (`bucket, north_star_id, guardrail_id, owner, band, date, cta_primary_label, cta_secondary_label, leading_metric, lagging_metric`)
- [ ] `decision_link` added where scope/metrics change
- [ ] traceability complete (pr ↔ decision/exception ↔ guardrail ↔ page ↔ signal ↔ receipt)
- [ ] ci cold-start ≤ 5m; red-lines/traceability block; tone nudge (l2)
<!-- L4: list must exist. Keys and ids: see ops_pack/canonical_ids.md. CI rules: ops_pack/ci_rule_map.md. -->

## signals (ids; ≤ 8 sitewide)

- leading: <m-...>
- lagging: <m-...>
<!-- L4: at least one leading and one lagging. Use ids from ops_pack/signal_registry_seed.csv. Caps enforced in CI. -->

## baseline window

last-30-days

- m-time-to-answer: <value + range>
- m-lab-pass: <value + range>
<!-- L3: fill numbers before merge. Pull from your dashboard or receipts; see ops_pack/dashboard_home_stub.md for anchors. -->

## tag

`vyyyy.mm-<seam>` <!-- seams: navigation | governance | signals | tests | releases -->

<!-- L4: lowercase, exact format. -->

## links

- decision: </governance/decisions/<decision_id>.md>
- snapshot: </governance/state/vyyyy.mm-<seam>.md>
- receipts: </signals/receipts/vyyyy.mm-<seam>.md>
- annex_lab: </path/in/repo>
- ci_run: <url>
<!-- L4: decision link must resolve. L3: snapshot/receipts may be "pending" with an exception (ops_pack/exception_template.md).
     L2: annex_lab and ci_run nudged but merge allowed; annex lab pattern in page_archetype_operate.md. -->

## notes (optional)

<extra context if absolutely necessary>
<!-- Deletable: optional narrative. Keep IDs lowercase. -->

<!-- quick references:
- ids, guards, seams: ops_pack/canonical_ids.md
- signals list: ops_pack/signal_registry_seed.csv
- tone/cta verbs: ops_pack/tone_lint.json
- acceptance & ci: ops_pack/ci_rule_map.md
- exceptions: ops_pack/exception_template.md
- archetypes: ops_pack/page_archetype_*.md
-->
