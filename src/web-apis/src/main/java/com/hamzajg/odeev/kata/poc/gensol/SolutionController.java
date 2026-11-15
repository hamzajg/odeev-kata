package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/solutions")
public class SolutionController {
    private final SolutionStore store;

    public SolutionController(SolutionStore store) {
        this.store = store;
    }

    @GetMapping
    public List<SolutionDto> getAllSolutions() {
        return store.all();
    }

    @PostMapping
    public SolutionDto createSolution(@RequestBody SolutionDto solutionDto) {
        return store.create(solutionDto);
    }

    @GetMapping("/{id}")
    public SolutionDto getSolution(@PathVariable("id") String id) {
        return store.get(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Solution not found: " + id));
    }

    @PutMapping("/{id}")
    public SolutionDto updateSolution(@PathVariable("id") String id, @RequestBody SolutionDto solutionDto) {
        if (!store.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Solution not found: " + id);
        }
        return store.replace(id, solutionDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolution(@PathVariable("id") String id) {
        if (!store.delete(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Solution not found: " + id);
        }
        return ResponseEntity.noContent().build();
    }
}
