package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/teams")
public class TeamController {
    private final TeamStore store;

    public TeamController(TeamStore store) {
        this.store = store;
    }

    @GetMapping
    public List<TeamDto> getAllTeams() {
        return store.all();
    }

    @PostMapping
    public TeamDto createTeam(@RequestBody TeamDto teamDto) {
        return store.create(teamDto);
    }

    @GetMapping("/{id}")
    public TeamDto getTeam(@PathVariable("id") String id) {
        return store.get(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found: " + id));
    }

    @PutMapping("/{id}")
    public TeamDto updateTeam(@PathVariable("id") String id, @RequestBody TeamDto teamDto) {
        if (!store.exists(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found: " + id);
        }
        return store.replace(id, teamDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable("id") String id) {
        if (!store.delete(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found: " + id);
        }
        return ResponseEntity.noContent().build();
    }
}
