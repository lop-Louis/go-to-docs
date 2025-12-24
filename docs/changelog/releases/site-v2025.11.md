---
title: Release bundle · site-v2025.11
mode: platform
owner: '@lop'
band: A
refresh_after_days: 365
change_type: minor
status: live
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
decision_id: dec-2025-11-chapter-ops-defaults
cta_primary_label: open_chapter_state
cta_secondary_label: open_steward_roster
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
date: '2025-11-15'
release_tag: site-v2025.11
nav:
  - none
search: false
list_label: >
  Bundle of everything tagged site-v2025.11 so ops and auditors can see what this release actually
  touched.
---

This release bundle shows what the **web frontend chapter** put in place around November 2025.

- If you only care about where we are today, use the **chapter state page**.
- If you care about **how we got here**, you are in the right place.

<PageCTA />

## What this release was about

This tag collects the first small slice of chapter ops for the web frontend chapter:

- making it clear **who owns what** in ops
- watching **two simple health checks**
- handling **cloud access blocks** in the open

## Pages in this release

These are the main docs that belong to this release.

<ReleaseList release-tag="site-v2025.11" kind="pages" />

## Decisions behind this release

<ReleaseList
  release-tag="site-v2025.11"
  kind="decisions"
  empty-text="No decisions have been attached to this release yet."
/>

As we add more decisions or pages to this tag, they should show up here.

## For auditors and ops

This page is built from frontmatter fields like:

- `release_tag: site-v2025.11`
- `decision_id`, `guardrail_id`, `leading_metric`, `lagging_metric`

If something looks wrong in this bundle, fix the frontmatter on the underlying pages and rebuild. This view should never be edited by hand once automation is in place.
