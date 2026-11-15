# Spec: resource-lifecycle

> Spec-driven development artifact. This file is the contract: implementation
> is done when every acceptance criterion maps to a scenario in
> `EXAMPLES.feature` and every scenario has a passing check.

## Problem

Every controller stores DTOs in a flat `CopyOnWriteArrayList` and exposes
only `GET all` + `POST`. DTOs already carry parent ids (`solutionId`,
`projectId`, `diagramId`) and the UI sends them — but the backend ignores
parent existence, assigns no ids, and has no `GET/{id}`, `PUT/{id}`, or
`DELETE/{id}` (except board update). Worst: the web app's delete buttons
only filter local React state — the API never hears about it, so "deleted"
resources reappear on reload. Backend and frontend disagree about what
exists.

## Users

- Web app users managing the Solution → Project → Diagram → Board hierarchy
  and Teams.
- CLI/IDE agent clients calling the same REST surface.

## Scope (in)

- All five resources (solutions, projects, diagrams, boards, teams) get:
  - server-assigned `id` on create when the client doesn't supply one
  - `GET /{id}`, `PUT /{id}`, `DELETE /{id}` returning proper status codes
  - parent-existence validation on create (project→solution, diagram→project,
    board→diagram) — unknown parent → 404
- Deleting a parent does NOT cascade (documented decision; children keep
  their parent id — MVP semantics).
- Frontend: services gain `delete*`/`update*`/`getById`; providers call the
  API instead of filtering local state only; deletes/edits persist.
- Unit tests for every new endpoint behaviour.

## Scope (out)

- Persistence beyond in-memory (restart still resets — documented MVP
  contract, same as sibling repos).
- Cascade deletes, referential cleanup, or re-parenting.
- AI/Ollama generation flows, agent-tool surface changes, vscode-extension,
  cli-tool.

## Acceptance criteria

| # | Criterion | Scenario(s) |
|---|-----------|-------------|
| 1 | Creating a resource without an id returns one with a server-assigned id | Create assigns server id |
| 2 | Creating a child under an unknown parent fails with 404 | Create child with unknown parent fails |
| 3 | GET/PUT/DELETE by id round-trip; unknown id → 404 for all five resources | Resource lifecycle by id |
| 4 | Deleting a parent leaves children intact (no cascade) | Parent delete does not cascade |
| 5 | UI delete/edit calls the API and the change survives refetch | UI mutations persist via API |

## Decisions

- In-memory stores stay (kata MVP) — but access goes through a small shared
  store helper so the five controllers don't each re-implement map+CRUD.
- No cascade deletes: children of a deleted parent keep their `parentId`;
  they become unreachable through the UI but are not destroyed. Revisit if
  the kata demands referential integrity.
- Soft semantics: `PUT` replaces mutable fields, keeps the id.
