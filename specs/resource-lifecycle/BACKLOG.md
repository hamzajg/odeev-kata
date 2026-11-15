# Backlog: resource-lifecycle

Items are USER STORIES in the parseable format below — keep the heading
shape `## US<n> — <story>` and the field lines intact so `wave_plan` can
parse them. Write the story as: "As a <role>, I want <goal>, so that
<value>" — the title after the dash IS the story.

```
## US<n> — As a <role>, I want <goal>, so that <value>
- Scenarios: @w1, @w2
- Depends: US1, US3        (optional; omit for wave-1 items)
- Size: S|M|L
- Notes: <one line>
```

Order stories by user value; dependencies express technical order only.

## US1 — As an API consumer, I want full CRUD with hierarchy validation on every resource, so that the backend is the single source of truth for what exists
- Scenarios: @w1
- Size: L
- Notes: shared in-memory store helper; id assignment; GET/PUT/DELETE /{id}; parent checks (project→solution, diagram→project, board→diagram); no cascade; JUnit tests per controller.

## US2 — As a web app user, I want deletes and edits to actually persist, so that what I see matches what the API holds
- Scenarios: @w2
- Depends: US1
- Size: M
- Notes: services gain delete*/update*/getById; providers stop filtering local state only; Projects/Diagrams/Teams pages wire mutations; yarn build must stay green.
