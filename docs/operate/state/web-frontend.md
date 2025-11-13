---
title: Chapter state · Web frontend pilot
owner: '@louis'
band: A
refresh_after_days: 30
change_type: minor
status: live
bucket: operate
north_star_id: ns-001
guardrail_id: gr-103
decision_id: dec-2025-11-chapter-ops-defaults
date: '2025-11-15'
cta_primary_label: review
cta_secondary_label: share
leading_metric: m-dashboard-freshness-days
lagging_metric: m-decision-hit-rate
decision_link: operate/decisions/dec-2025-11-chapter-baseline.md
release_tag: site-v2025.11
---

This page gives a simple picture of where the **web frontend chapter** is right now for the Northbook pilot.

It is meant to answer three questions:

1. What are we currently testing in chapter ops?
2. Who and what is in play for this pilot?
3. Where should I look before I walk into a chapter ops conversation?

There is no full playbook here on purpose. This is a small, honest slice of how we are currently running.

## What this page is for

Use this page as your starting point before you:

- join a chapter ops session
- make a change to how the chapter runs
- want to understand what this pilot actually covers

If it does not help you answer those, it needs to change.

## Current focus for this pilot

For this pilot, the web frontend chapter is focusing on three small pieces of ops:

- **Stewardship**: making it clear who looks after scope, signals, and exceptions.
- **Two health checks**: keeping a basic picture of the roster and whether people leave sessions with a clear next step.
- **Cloud access blocks**: logging serious access problems early and agreeing on a safe temporary way to keep work moving.

Everything else stays out of scope until we prove these pieces are useful.

## Active ops pages in this pilot

These are the pages that are "in play" right now. If you only have a few minutes, start here.

- **Steward roster**
  See who is currently on point for scope, signals, and exceptions, plus their expected response window.
  → [Open steward roster](../stewards)

- **Signals roster**
  See the two health checks we are watching: how fresh the roster is, and whether people leave sessions knowing their next step.
  → [Open signals roster](../../learn/signals-roster)
- **Cloud-access exception stub**
  Use this when cloud access is seriously blocking work. Log the blocker, name an owner, set an expiry, and use the agreed temporary path.
  → [Open cloud-access stub](../../mitigate/exception-cloud-access)

If a page is not listed here, it is not part of this pilot yet.

## What to look at before a chapter ops session

Before you walk into a chapter ops session, a quick pass over this page should help you:

- check whether the steward roles still match reality
- see if the roster and "next step" health checks look roughly healthy
- notice any open cloud-access blockers that might affect the work

Bring stories, not just numbers: what felt stuck, what felt clearer, where you had to improvise.

## How we react when things drift

Drift is expected. When something looks off:

- we adjust the way we run sessions or share information
- we change roles or coverage if someone is carrying too much
- we improve the way we log and handle blockers

We do **not** treat this page as a scoreboard for individuals. It is a shared picture of how the system is behaving.

## If this state picture is not helpful

If you read this page and still feel unsure about where the chapter stands or what to do next, treat that as useful feedback.

Raise it in the next chapter ops session or with whoever shared Northbook with you. The goal for this page is simple: a calm, honest snapshot that makes the next conversation easier, not heavier.

## If you need history

If you need to see **when** these pages changed or which decisions and guardrails are tied to them,  
open the [Releases view](../../operate/releases/) and use the `site-v2025.11` bundle.

Most people do not need this for day-to-day work.
