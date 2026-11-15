# resource-lifecycle — specifications by example
# Scenario tags @w<N> map items to delivery waves (see WAVES.md / BACKLOG.md).

Feature: resource-lifecycle

  @w1 @happy-path
  Scenario: Create assigns server id
    Given the API is running
    When POST /solutions is called with {"name":"Storefront","description":"shop"}
    Then the response contains a non-empty id
    And GET /solutions returns the solution with that id

  @w1
  Scenario: Create child with unknown parent fails
    Given no solution with id "missing"
    When POST /projects is called with {"solutionId":"missing","name":"API"}
    Then the response status is 404
    And no project is stored

  @w1
  Scenario: Resource lifecycle by id
    Given a team "Platform" exists with id "t1"
    When GET /teams/t1 is called
    Then the response contains the team
    When PUT /teams/t1 is called with a new description
    Then GET /teams/t1 returns the updated description
    When DELETE /teams/t1 is called
    Then GET /teams/t1 returns 404
    And GET /teams no longer lists it

  @w1
  Scenario: Parent delete does not cascade
    Given a solution with a project
    When DELETE /solutions/{id} is called
    Then GET /projects still returns the project with its solutionId

  @w2
  Scenario: UI mutations persist via API
    Given the web app is running against the API
    When a user deletes a project from the projects page
    Then DELETE /projects/{id} is called
    And refetching projects does not return it
    When a user edits a board's nodes and saves
    Then PUT /boards/{id} is called and the change is returned on reload
