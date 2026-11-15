package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectStore store;
    private final SolutionStore solutions;

    public ProjectController(ProjectStore store, SolutionStore solutions) {
        this.store = store;
        this.solutions = solutions;
    }

    @GetMapping
    public List<ProjectDto> getAllProjects() {
        return store.all();
    }

    @PostMapping
    public ProjectDto createProject(@RequestBody ProjectDto projectDto) {
        if (!solutions.exists(projectDto.solutionId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Solution not found: " + projectDto.solutionId);
        }
        return store.create(projectDto);
    }

    @GetMapping("/{id}")
    public ProjectDto getProject(@PathVariable("id") String id) {
        return store.get(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found: " + id));
    }

    @PutMapping("/{id}")
    public ProjectDto updateProject(@PathVariable("id") String id, @RequestBody ProjectDto projectDto) {
        if (!store.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found: " + id);
        }
        if (!solutions.exists(projectDto.solutionId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Solution not found: " + projectDto.solutionId);
        }
        return store.replace(id, projectDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable("id") String id) {
        if (!store.delete(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found: " + id);
        }
        return ResponseEntity.noContent().build();
    }
}
