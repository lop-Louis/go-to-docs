---
title: API Guidelines (Stub)
band: A
owner: '@lop'
refresh_after_days: 120
change_type: minor
status: live
last_reviewed: '2025-11-04'
audience: Engineers designing and reviewing HTTP APIs
tone: Plainspoken, candid, energetic
narrative_goal: Capture the baseline rules for Northbook APIs until the full guide ships
primary_action: Apply these defaults when drafting or reviewing API changes
---

# API Guidelines (Stub)

Neutral, public-safe principles for designing and evolving HTTP+JSON APIs. This page is a placeholder until a fuller version is needed.

> **Primary action:** Apply these defaults when drafting or reviewing API changes.

## Core Principles

1. Consistency over cleverness
2. Minimal surface area; evolve additively
3. Predictable pagination, errors, and versioning
4. Clear separation of concerns (resource vs operation)

## Resource Modeling

- Use plural nouns: `/users`, `/invoices`
- Nest only to express containment: `/users/{id}/sessions`
- Avoid deep nesting (>2 levels) — prefer top-level plus filters

## HTTP Methods

| Method | Use                                                  |
| ------ | ---------------------------------------------------- |
| GET    | Fetch resources (no side effects)                    |
| POST   | Create subordinate resource or non-idempotent action |
| PUT    | Full replacement of a resource                       |
| PATCH  | Partial update                                       |
| DELETE | Remove a resource                                    |

## Status Codes

| Code | Meaning                                         |
| ---- | ----------------------------------------------- |
| 200  | Success (single resource or collection)         |
| 201  | Created (include `Location` header)             |
| 202  | Accepted (async processing)                     |
| 204  | No content (successful deletion/update)         |
| 400  | Validation error                                |
| 401  | Authentication required                         |
| 403  | Forbidden                                       |
| 404  | Not found                                       |
| 409  | Conflict (version, uniqueness)                  |
| 429  | Rate limited                                    |
| 500  | Server error (avoid for known validation cases) |

## Errors

Return structured errors:

```jsonc
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "email is required",
    "details": [{ "field": "email", "issue": "missing" }]
  }
}
```

## Versioning

- Prefer additive changes (avoid breaking where possible)
- Use URL prefix for major versions: `/v1/`, `/v2/`
- Deprecate with long runway; document alternatives

## Pagination

- Use `limit` + `cursor` (opaque) for forward-only pagination
- Return `next_cursor` when more results remain

```jsonc
{
  "items": [
    /* ... */
  ],
  "next_cursor": "opaque-token-or-null"
}
```

## Filtering & Sorting

- Query params: `?status=active&sort=created_at.desc`
- Avoid implementing a full query language prematurely

## Field Naming

- snake_case or lowerCamelCase; be consistent
- Timestamps as ISO 8601 UTC (`created_at`, `updated_at`)

## Rate Limiting (Conceptual)

Expose headers:

```
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 497
X-RateLimit-Reset: 1700000000
```

## Security (High-level)

- Use standard auth (e.g., OAuth2, PATs) — no credentials in URLs
- Enforce HTTPS everywhere
- Treat unknown fields in input as errors (avoid silent ignore drift)

## Change Log Hygiene

Document changes monthly in a public-safe format — see [Monthly Release Rhythm](./monthly-release).

## Related Patterns

- [Answer Ledger Pattern](./answer-ledger)
- [Decision Spine](./decision-spine)
- [Sanitization Checklist](./sanitization)

---

This stub remains intentionally minimal; expand only when stable practices require external reference.
