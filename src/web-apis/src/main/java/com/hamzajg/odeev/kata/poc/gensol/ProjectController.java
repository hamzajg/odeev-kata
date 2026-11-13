package com.hamzajg.odeev.kata.poc.gensol;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CopyOnWriteArrayList;
import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final List<ProjectDto> projects = new CopyOnWriteArrayList<>();

    @GetMapping
    public List<ProjectDto> getAllProjects() {
        return projects;
    }

    @PostMapping
    public ProjectDto createProject(@RequestBody ProjectDto projectDto) {
        projects.add(projectDto);
        return projectDto;
    }

}