package com.hamzajg.odeev.kata.poc.gensol;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;

class BoardControllerTest {

    private BoardController controller = new BoardController();

    private BoardDto board(String id) {
        BoardDto dto = new BoardDto();
        dto.id = id;
        dto.nodes = "[]";
        dto.edges = "[]";
        return dto;
    }

    @Test
    void updateBoardReturnsUpdatedDto() {
        controller.createBoard(board("b1"));

        BoardDto update = board("b1");
        update.nodes = "[{\"id\":\"n1\"}]";

        BoardDto result = controller.updateBoard("b1", update);

        assertNotNull(result);
        assertEquals("[{\"id\":\"n1\"}]", result.nodes);
    }

    @Test
    void updateBoardThrows404ForUnknownId() {
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.updateBoard("missing", board("missing")));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    @Test
    void createThenGetAllRoundTrips() {
        controller.createBoard(board("b2"));

        assertTrue(controller.getAllBoards().stream().anyMatch(b -> "b2".equals(b.id)));
    }
}
