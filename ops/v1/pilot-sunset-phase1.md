/v1 inventory – Phase 1 (pilot_id: web_frontend_chapter_v1)

Checks by page

- /v1/ role: front-gate frontmatter: ok
- navigate/frontend-charter role: front-gate frontmatter: ok
- changelog/state/web-frontend role: front-gate frontmatter: ok
- navigate/ role: bucket-index frontmatter: ok
- operate/ role: bucket-index frontmatter: ok
- learn/ role: bucket-index frontmatter: ok
- mitigate/ role: bucket-index frontmatter: ok
- operate/ops-defaults-meetings role: bucket-leaf frontmatter: ok
- operate/stewards role: bucket-leaf frontmatter: ok
- learn/signals-roster role: bucket-leaf frontmatter: ok
- mitigate/exception-cloud-access role: bucket-leaf frontmatter: ok
- changelog/releases role: ops-only frontmatter: ok
- ops contract page role: ops-only frontmatter: missing (no /docs page found yet)

Phase 1 output

1. Roles confirmed

- Front gate: /v1/, navigate/frontend-charter, changelog/state/web-frontend
- Bucket indices: navigate/, operate/, learn/, mitigate/
- Key bucket leaves: operate/ops-defaults-meetings, operate/stewards, learn/signals-roster, mitigate/exception-cloud-access
- Ops-only: changelog/releases, <ops contract page path – not present in /docs yet>

2. Frontmatter fixes applied

- Added mode: pilot + pilot_id: web_frontend_chapter_v1 to: /v1/ (index.md); navigate/ and navigate/frontend-charter; operate/ and operate/ops-defaults-meetings; operate/stewards; learn/ and learn/signals-roster; mitigate/ and mitigate/exception-cloud-access; changelog/state/web-frontend; changelog/releases and changelog/releases/site-v2025.11

3. Candidates for /draft (obvious experiments)

- None flagged in this pass.

4. Label drift to fix later

- operate/ops-defaults-meetings: sidebar item “Defaults Meeting” vs page title “Casual vs Operation meeting defaults”
