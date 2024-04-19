package com.hamzajg.odeev.kata.poc.gensol;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/diagrams")
public class DiagramController {
    private List<DiagramDto> diagrams = new ArrayList<>();

    @GetMapping
    public List<DiagramDto> getAllDiagrams() {
        return diagrams;
    }

    @PostMapping
    public DiagramDto createDiagram(@RequestBody DiagramDto diagramDto) {
        diagrams.add(diagramDto);
        return diagramDto;
    }
}