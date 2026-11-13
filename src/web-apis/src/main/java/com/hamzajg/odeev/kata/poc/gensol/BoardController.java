package com.hamzajg.odeev.kata.poc.gensol;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.List;

@RestController
@RequestMapping("/boards")
public class BoardController {
    private final List<BoardDto> boards = new CopyOnWriteArrayList<>();

    @GetMapping
    public List<BoardDto> getAllBoards() {
        return boards;
    }

    @PostMapping
    public BoardDto createBoard(@RequestBody BoardDto boardDto) {
        boards.add(boardDto);
        return boardDto;
    }

    @PutMapping("/{id}")
    public BoardDto updateBoard(@PathVariable("id") String id, @RequestBody BoardDto boardDto) {
        BoardDto existingBoard = boards.stream()
                .filter(board -> id.equals(board.id))
                .findFirst()
                .orElse(null);
        if (existingBoard == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found: " + id);
        }
        existingBoard.nodes = boardDto.nodes;
        existingBoard.edges = boardDto.edges;
        return existingBoard;
    }
}