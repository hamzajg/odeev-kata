# ADR 0002 — Resource lifecycle: shared store, hierarchy validation, no cascade

Date: 2026-11-15
Status: accepted
Spec: `specs/resource-lifecycle/`

## Context

Every `*Controller` kept its DTOs in a private `CopyOnWriteArrayList` and
exposed only `GET all` + `POST`. DTOs already carried parent ids
(`solutionId`, `projectId`, `diagramId`) that the backend ignored, and the
web app's delete buttons filtered React state only — "deleted" resources
reappeared on reload. The UI and API disagreed about what exists.

## Decisions

1. **One shared `ResourceStore<T>`** (`Identifiable` DTOs) replaces the
   per-controller lists. It owns id assignment (server UUID when the
   client omits one), `get/replace/delete` by id, and null-safety, so all
   five resources behave identically. Rationale: DRY — five copies of
   map+CRUD would drift.
2. **Parent validation on write.** project→solution, diagram→project,
   board→diagram; unknown parent → 404. Rationale: the hierarchy is the
   product's core model; silent orphans were the bug.
3. **No cascade deletes.** Deleting a parent leaves children with their
   `parentId` intact. Rationale: MVP semantics — referential cleanup can
   be a later feature; destroying user data implicitly is worse.
4. **In-memory stays.** Restart resets state — documented MVP contract,
   consistent with sibling kata repos; persistence is a separate feature.
5. **UI mutations go through the API.** Providers call services then
   refetch; Edit reuses the create drawer in edit mode. Rationale: single
   source of truth — the server decides what exists.

## Consequences

- All resources expose `GET/POST/PUT/DELETE /{id}` + `GET /`.
- Boards are 1:1 with diagrams client-side; `BoardDto.diagramId` is now
  required on create and is the lookup key in the UI.
- Agent tools / CLI that POST children must now send valid parent ids.
