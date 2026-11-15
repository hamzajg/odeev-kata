package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/boards")
public class BoardController {
    private final BoardStore store;
    private final DiagramStore diagrams;

    public BoardController(BoardStore store, DiagramStore diagrams) {
        this.store = store;
        this.diagrams = diagrams;
    }

    @GetMapping
    public List<BoardDto> getAllBoards() {
        return store.all();
    }

    @PostMapping
    public BoardDto createBoard(@RequestBody BoardDto boardDto) {
        if (!diagrams.exists(boardDto.diagramId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Diagram not found: " + boardDto.diagramId);
        }
        return store.create(boardDto);
    }

    @GetMapping("/{id}")
    public BoardDto getBoard(@PathVariable("id") String id) {
        return store.get(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id));
    }

    @PutMapping("/{id}")
    public BoardDto updateBoard(@PathVariable("id") String id, @RequestBody BoardDto boardDto) {
        BoardDto existing = store.get(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id));
        existing.nodes = boardDto.nodes;
        existing.edges = boardDto.edges;
        return existing;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("id") String id) {
        if (!store.delete(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id);
        }
        return ResponseEntity.noContent().build();
    }
}
