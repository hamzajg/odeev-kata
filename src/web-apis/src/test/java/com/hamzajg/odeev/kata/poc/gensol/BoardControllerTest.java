package com.hamzajg.odeev.kata.poc.gensol;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;

class BoardControllerTest {

    private BoardController controller;

    private BoardDto board(String id) {
        BoardDto dto = new BoardDto();
        dto.id = id;
        dto.nodes = "[]";
        dto.edges = "[]";
        return dto;
    }

    private BoardDto boardForDiagram(String diagramId) {
        BoardDto dto = board(null);
        dto.diagramId = diagramId;
        return dto;
    }

    private void givenDiagram(String id) {
        DiagramStore diagrams = new DiagramStore();
        DiagramDto diagram = new DiagramDto();
        diagram.id(id);
        diagrams.create(diagram);
        controller = new BoardController(new BoardStore(), diagrams);
    }

    @Test
    void updateBoardReturnsUpdatedDto() {
        givenDiagram("d1");
        BoardDto created = controller.createBoard(boardForDiagram("d1"));

        BoardDto update = boardForDiagram("d1");
        update.nodes = "[{\"id\":\"n1\"}]";

        BoardDto result = controller.updateBoard(created.id(), update);

        assertNotNull(result);
        assertEquals("[{\"id\":\"n1\"}]", result.nodes);
    }

    @Test
    void updateBoardThrows404ForUnknownId() {
        givenDiagram("d1");
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.updateBoard("missing", boardForDiagram("d1")));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    @Test
    void createThenGetAllRoundTrips() {
        givenDiagram("d1");
        BoardDto created = controller.createBoard(boardForDiagram("d1"));

        assertNotNull(created.id());
        assertTrue(controller.getAllBoards().stream().anyMatch(b -> created.id().equals(b.id)));
    }

    // covers scenario: Create assigns server id
    @Test
    void createAssignsServerIdWhenMissing() {
        givenDiagram("d1");
        BoardDto created = controller.createBoard(boardForDiagram("d1"));

        assertNotNull(created.id());
        assertFalse(created.id().isBlank());
    }

    // covers scenario: Create child with unknown parent fails
    @Test
    void createBoardWithUnknownDiagramFails() {
        givenDiagram("d1");
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> controller.createBoard(boardForDiagram("missing")));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertTrue(controller.getAllBoards().isEmpty());
    }

    // covers scenario: Resource lifecycle by id
    @Test
    void getPutDeleteByIdRoundTrips() {
        givenDiagram("d1");
        BoardDto created = controller.createBoard(boardForDiagram("d1"));

        assertEquals(created.id(), controller.getBoard(created.id()).id());

        BoardDto update = boardForDiagram("d1");
        update.nodes = "[{\"id\":\"n9\"}]";
        controller.updateBoard(created.id(), update);
        assertEquals("[{\"id\":\"n9\"}]", controller.getBoard(created.id()).nodes);

        assertEquals(HttpStatus.NO_CONTENT, controller.deleteBoard(created.id()).getStatusCode());
        assertThrows(ResponseStatusException.class, () -> controller.getBoard(created.id()));
        assertTrue(controller.getAllBoards().isEmpty());
    }
}
