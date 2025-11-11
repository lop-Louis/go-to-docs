---
title: Cloudflare analytics snapshot
band: A
owner: '@lop'
change_type: patch
status: live
refresh_after_days: 30
audience: Maintainers publishing receipts and signal updates
tone: 'Plainspoken, candid, energetic'
narrative_goal: >-
  Show how to export Cloudflare analytics and convert it into the Signal
  Registry snapshot
nav_group: Operate
nav_order: 90
nav_label: Cloudflare analytics
nav:
  - sidebar
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
cta_primary_label: Use this guardrail
cta_secondary_label: See example runbook
leading_metric: m-lab-pass
lagging_metric: m-defect-rate-changed-pages
decision_link: /decisions/dec-2025-11-ia-overhaul.md
date: '2025-11-11'
---

# Cloudflare analytics snapshot

Keep adoption, quality, and credibility signals honest in under 10 minutes. [Run the export](#export-cloudflare-analytics) or [Update the Signal Registry](./signal-registry.md).
Exit metric: sanitized snapshot + registry refresh complete within 30 days and ≤10 minutes per run.

## Why this exists

The Northbook contract requires receipts for:

- **Adoption:** Pages touched and time-to-answer.
- **Quality:** Lab pass rate and broken link count.
- **Credibility:** State freshness and exceptions resolved.

Cloudflare already sees every visit to `northbook.guide`. This runbook turns that aggregated telemetry into a sanitized JSON snapshot that automation can post to Receipts without collecting personal data.

## Export Cloudflare analytics

1. **Set env vars (local shell only):**

   ```bash
   export CF_API_TOKEN=cf_pat_with_analytics_scope
   export CF_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxx
   export CF_ZONE_ID=yyyyyyyyyyyyyyyyyyyyy
   export CF_ANALYTICS_DAYS=14 # optional, defaults to 14
   export CF_ANALYTICS_SINCE=$(node -e "const days=Number(process.env.CF_ANALYTICS_DAYS||14);const d=new Date(Date.now()-days*24*60*60*1000);process.stdout.write(d.toISOString())")
   export CF_ANALYTICS_UNTIL=$(node -e "process.stdout.write(new Date().toISOString())")
   ```

2. **Run the GraphQL export:** Cloudflare’s API supports a GraphQL query that returns per-path aggregates and custom events. Paste the query below into `curl` or GraphiQL and save the response to `reports/cloudflare-export.json`.

```bash
curl -s -X POST https://api.cloudflare.com/client/v4/graphql \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query ($zone:String!, $since:Time!, $until:Time!) { viewer { zones(filter:{zoneTag:$zone}) { httpRequestsAdaptiveGroups(filter:{datetime_geq:$since, datetime_leq:$until}, orderBy:[sum_requests_DESC], limit:500, dimensions:[clientRequestPath]) { dimensions { clientRequestPath } quantiles { responseTime95th } sum { requests } } rumSpeedPageInsightsAdaptiveGroups(filter:{datetime_geq:$since, datetime_leq:$until}, limit:500) { dimensions { path } median { pageLoadTime } } workersInvocationsAdaptiveGroups(filter:{datetime_geq:$since, datetime_leq:$until}, orderBy:[sum_requests_DESC], limit:500) { dimensions { scriptName } sum { requests } } } } }",
    "variables": {
      "zone": "'"$CF_ZONE_ID"'",
      "since": "'"$CF_ANALYTICS_SINCE"'" ,
    "until": "'"$CF_ANALYTICS_UNTIL"'"
  }
}' > reports/cloudflare-export.json
```

> **Privacy note:** The query only returns aggregated per-path totals and CTA/feedback events (captured via Workers). No IPs, emails, or user IDs leave Cloudflare.
> Need a reference file? See `reports/cloudflare-export.sample.json` in the repo.

## Convert to a snapshot

1. Ensure `reports/labs.json` reflects the latest lab runs (Quick-Run, Link Drift, etc.).
2. Run the converter:

   ```bash
   pnpm run analytics:snapshot \
     --input reports/cloudflare-export.json \
     --output reports/cloudflare-snapshot.json
   ```

3. The script writes:

   ```json
   {
     "collected_at": "2025-11-09T18:04:01.000Z",
     "window": { "since": "2025-10-26T00:00:00.000Z", "until": "2025-11-09T00:00:00.000Z" },
     "adoption": {
       "pages_touched": 18,
       "total_views": 2412,
       "median_time_to_answer_ms": 47000,
       "not_helpful_clicks": 3
     },
     "quality": {
       "lab_pass_rate": 1,
       "labs_failed": 0,
       "broken_links": 0
     },
     "credibility": {
       "state_fresh_within_days": 12,
       "exceptions_open": 1,
       "exceptions_resolved": 2
     }
   }
   ```

4. Commit the sanitized snapshot (no IP data) and reference it from Receipts.

## Update the Signal Registry

- Edit [`docs/operate/signal-registry.md`](./signal-registry.md).
- For each signal, set:
  - `source`: Cloudflare analytics export, labs report, or exceptions log.
  - `refresh_after_days`: 14 for adoption, 7 for quality, 30 for credibility.
  - `owner`: Analytics steward (default `@lop`).
  - `thresholds`: e.g., “time-to-answer median ≤ 60 seconds”.
  - `kill_criteria`: Stop collecting the signal if accuracy drops or the value stays flat for two consecutive cycles.

## Publish receipts

1. Update `ops/releases/YYYY-MM/manifest.json` with the new `metrics` summary.
2. Run `pnpm run state:build` so `do../navigate/state-ledger.md` reflects the new adoption/quality/credibility values.
3. Commit the manifest + generated files and mention the Cloudflare snapshot path in the release bundle.

## Troubleshooting

- **API token missing:** Script exits with a helpful message. Generate a token scoped to “Analytics: Read”.
- **Export size > 10 MB:** Reduce the window (`CF_ANALYTICS_DAYS=7`) or filter to the most-viewed paths in GraphQL.
- **Custom events empty:** Ensure the CTA/Feedback Worker forwards events to Cloudflare Logs with sanitized payloads (`path`, `event`, `count` only).
- **Pipeline >10 minutes:** Run the export locally, commit the snapshot, and let CI reuse the file. Reassess automation if the fetch continually exceeds the budget.

## Related references

- [Signal Registry](./signal-registry.md) — Canonical list of signals and owners.
- [Cloudflare API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/?utm_source=northbook) — How to scope the analytics token.
- [State ledger](../navigate/state-ledger.md) — Where the snapshot is quoted each cycle.
