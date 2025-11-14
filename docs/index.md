---
title: Northbook
layout: home
band: A
owner: '@lop'
refresh_after_days: 120
change_type: patch
status: live
last_reviewed: '2025-01-15'
audience: Anyone in the web frontend chapter looking for ops guidance and entry points
tone: 'Plainspoken, calm, practical'
narrative_goal: >-
  Help people see where the chapter stands, who owns what, and what to do when
  blocked
release_tag: site-v2025.11
hero:
  name: Northbook
  text: A small pilot for calmer chapter ops.
  image:
    src: /logo-symbol.png
    alt: Northbook logo
  tagline: >-
    For this pilot, Northbook gives the web frontend chapter one place to see
    where we are, who owns what, and how to handle blocks.
  actions:
    - theme: brand
      text: See the chapter state
      link: /operate/state/web-frontend
    - theme: alt
      text: See who owns what
      link: /operate/stewards
features:
  - title: See where the chapter stands
    details: >-
      Open the chapter state page to see a simple snapshot of what shipped
      recently and which ops pages are in play for this pilot.
    link: /operate/state/web-frontend
    linkText: Open chapter state
  - title: Know who to tap
    details: >-
      Use the steward roster to see who currently looks after scope, signals,
      and exceptions, plus their expected response window.
    link: /operate/stewards
    linkText: Open steward roster
  - title: Watch the two health checks
    details: >-
      The signals roster tracks two things only: how fresh the chapter roster
      is, and whether people leave sessions with a clear next step.
    link: /learn/signals-roster
    linkText: Open signals roster
  - title: Handle cloud access blocks
    details: >-
      When cloud access gets in the way, the cloud-access stub helps you log the
      blocker, name an owner, and use a safe temporary path.
    link: /mitigate/exception-cloud-access
    linkText: Open cloud-access stub
nav:
  - none
bucket: navigate
north_star_id: ns-001
guardrail_id: gr-101
decision_id: dec-2025-11-chapter-ops-defaults
leading_metric: m-nav-open
lagging_metric: m-time-to-answer
date: '2025-01-15'
---

For now, Northbook is a **small pilot** for the web frontend chapter.

It does three things:

1. shows where the chapter stands
2. shows who owns which part of ops
3. gives a simple path when cloud access blocks work

There is no full playbook here yet on purpose. What you see is what we are actually using.

## Start here

Choose what matches your situation today.

### I want to see where the chapter stands

Go to the **chapter state** page:

- see the latest snapshot for this pilot
- see which ops pages are currently in play

> [Open chapter state](./operate/state/web-frontend)

### I want to know who owns what in ops

Open the **steward roster**:

- see who is on point for scope, signals, and exceptions
- see who is backup and how fast they are expected to respond

> [Open steward roster](./operate/stewards)

### I want to see the two health checks

Open the **signals roster**:

- roster freshness: do we have a current picture of each person?
- direction after sessions: do people leave knowing their next step?

You do not have to touch metrics directly. Just use it to sense if we are drifting.

> [Open signals roster](./learn/signals-roster)

### I am blocked by cloud access

Use the **cloud-access stub**:

- log the blocker with an owner and an expiry
- use the agreed temporary path so work can keep moving safely

> [Open cloud-access stub](./mitigate/exception-cloud-access)

## If you help maintain this pilot

If you are updating these pages or wiring automation around them, there is a separate ops contract that explains:

- the few guardrails we keep
- how releases and state are generated
- how traceability works without cluttering these pages

That contract is written for operators, not first-time visitors. Use it when you are working on the system, not when you just need an answer.

## If this home page did not help

If you could not find a useful page or a clear next step from here, tell us.

We will treat it as a signal that the entrance is wrong, not that you are.

> If you help maintain Northbook and need history or traceability, use the [Releases view](./operate/releases/). It is written for operators and auditors, not for first-time visitors.
