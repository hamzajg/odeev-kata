package com.hamzajg.odeev.kata.poc.gensol;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Cross-resource lifecycle: parent validation on create and the
 * documented no-cascade delete semantics.
 */
class ResourceLifecycleTest {

    // covers scenario: Create child with unknown parent fails
    @Test
    void projectRequiresExistingSolution() {
        SolutionStore solutions = new SolutionStore();
        ProjectController projects = new ProjectController(new ProjectStore(), solutions);

        ProjectDto dto = new ProjectDto();
        dto.solutionId = "missing";
        dto.name = "API";

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> projects.createProject(dto));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertTrue(projects.getAllProjects().isEmpty());
    }

    @Test
    void diagramRequiresExistingProject() {
        ProjectStore projects = new ProjectStore();
        DiagramController diagrams = new DiagramController(new DiagramStore(), projects);

        DiagramDto dto = new DiagramDto();
        dto.projectId = "missing";
        dto.name = "ER";

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> diagrams.createDiagram(dto));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    // covers scenario: Parent delete does not cascade
    @Test
    void deletingSolutionLeavesProjectIntact() {
        SolutionStore solutions = new SolutionStore();
        SolutionController solutionController = new SolutionController(solutions);
        ProjectController projects = new ProjectController(new ProjectStore(), solutions);

        SolutionDto solution = new SolutionDto();
        solution.name = "Storefront";
        SolutionDto created = solutionController.createSolution(solution);

        ProjectDto project = new ProjectDto();
        project.solutionId = created.id();
        project.name = "API";
        ProjectDto createdProject = projects.createProject(project);

        solutionController.deleteSolution(created.id());

        assertEquals(createdProject.id(), projects.getProject(createdProject.id()).id());
        assertEquals(created.id(), projects.getProject(createdProject.id()).solutionId);
    }

    // covers scenario: Resource lifecycle by id
    @Test
    void teamLifecycleById() {
        TeamController teams = new TeamController(new TeamStore());

        TeamDto team = new TeamDto();
        team.id = "t1";
        team.name = "Platform";
        team.description = "core";
        teams.createTeam(team);

        assertEquals("Platform", teams.getTeam("t1").name);

        TeamDto update = new TeamDto();
        update.name = "Platform";
        update.description = "renamed";
        teams.updateTeam("t1", update);
        assertEquals("renamed", teams.getTeam("t1").description);

        assertEquals(HttpStatus.NO_CONTENT, teams.deleteTeam("t1").getStatusCode());
        assertThrows(ResponseStatusException.class, () -> teams.getTeam("t1"));
        assertTrue(teams.getAllTeams().isEmpty());
    }
}
