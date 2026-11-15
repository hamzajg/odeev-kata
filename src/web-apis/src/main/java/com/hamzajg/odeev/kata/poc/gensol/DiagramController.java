package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/diagrams")
public class DiagramController {
    private final DiagramStore store;
    private final ProjectStore projects;

    public DiagramController(DiagramStore store, ProjectStore projects) {
        this.store = store;
        this.projects = projects;
    }

    @GetMapping
    public List<DiagramDto> getAllDiagrams() {
        return store.all();
    }

    @PostMapping
    public DiagramDto createDiagram(@RequestBody DiagramDto diagramDto) {
        if (!projects.exists(diagramDto.projectId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found: " + diagramDto.projectId);
        }
        return store.create(diagramDto);
    }

    @GetMapping("/{id}")
    public DiagramDto getDiagram(@PathVariable("id") String id) {
        return store.get(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Diagram not found: " + id));
    }

    @PutMapping("/{id}")
    public DiagramDto updateDiagram(@PathVariable("id") String id, @RequestBody DiagramDto diagramDto) {
        if (!store.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Diagram not found: " + id);
        }
        if (!projects.exists(diagramDto.projectId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found: " + diagramDto.projectId);
        }
        return store.replace(id, diagramDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiagram(@PathVariable("id") String id) {
        if (!store.delete(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Diagram not found: " + id);
        }
        return ResponseEntity.noContent().build();
    }
}
