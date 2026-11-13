package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CopyOnWriteArrayList;
import java.util.List;

@RestController
@RequestMapping("/solutions")
public class SolutionController {
    private final List<SolutionDto> solutions = new CopyOnWriteArrayList<>();

    @GetMapping
    public List<SolutionDto> getAllSolutions() {
        return solutions;
    }

    @PostMapping
    public SolutionDto createSolution(@RequestBody SolutionDto solutionDto) {
        solutions.add(solutionDto);
        return solutionDto;
    }

}