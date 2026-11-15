# Waves — resource-lifecycle

Each wave IS an iteration: a time-boxed, independently shippable
increment — one branch, one PR, green tests, demoable outcome.
Do not start wave N+1 until wave N merges.

## Wave 1 — iteration 1

Scenarios proven by this wave:
- Create assigns server id
- Create child with unknown parent fails
- Resource lifecycle by id
- Parent delete does not cascade

| Item | Title | Size | Deps | Notes |
|------|-------|------|------|-------|
| US1 | As an API consumer, I want full CRUD with hierarchy validation on every resource, so that the backend is the single source of truth for what exists | L | — | shared in-memory store helper; id assignment; GET/PUT/DELETE /{id}; parent checks (project→solution, diagram→project, board→diagram); no cascade; JUnit tests per controller. |

## Wave 2 — iteration 2

Scenarios proven by this wave:
- UI mutations persist via API

| Item | Title | Size | Deps | Notes |
|------|-------|------|------|-------|
| US2 | As a web app user, I want deletes and edits to actually persist, so that what I see matches what the API holds | M | US1 | services gain delete*/update*/getById; providers stop filtering local state only; Projects/Diagrams/Teams pages wire mutations; yarn build must stay green. |
