# Validation — resource-lifecycle

## Traceability

| AC | Criterion | Scenarios | Wave(s) | Test evidence |
|----|-----------|-----------|---------|---------------|
| 1 | Creating a resource without an id returns one with a server- | 4 | @w1 | BoardControllerTest.java, ResourceLifecycleTest.java |
| 2 | Creating a child under an unknown parent fails with 404 | 4 | @w1 | BoardControllerTest.java, ResourceLifecycleTest.java |
| 3 | GET/PUT/DELETE by id round-trip; unknown id → 404 for all fi | 4 | @w1 | BoardControllerTest.java, ResourceLifecycleTest.java |
| 4 | Deleting a parent leaves children intact (no cascade) | 4 | @w1 | BoardControllerTest.java, ResourceLifecycleTest.java |
| 5 | UI delete/edit calls the API and the change survives refetch | 1 | @w2 | — |

## Scenario coverage

- Scenarios: 5 total, 4 with detected test evidence, 1 without
- ✓ `Create assigns server id` (@w1)
- ✓ `Create child with unknown parent fails` (@w1)
- ✓ `Resource lifecycle by id` (@w1)
- ✓ `Parent delete does not cascade` (@w1)
- ✗ `UI mutations persist via API` (@w2)

## Demo script (manual walkthrough)

1. **Create assigns server id** — run the app, perform the scenario, observe the outcome.

## Gaps

- 1 scenario(s) lack detected test evidence — verify manually or add checks

Note: 'no evidence' means neither the scenario name nor a
token match was found in test files — verify by hand before
treating it as a real gap. '~' marks weak token-match evidence.