package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.stereotype.Component;

/** One store bean per resource — injected into controllers for parent checks. */
@Component
class SolutionStore extends ResourceStore<SolutionDto> {
}

@Component
class ProjectStore extends ResourceStore<ProjectDto> {
}

@Component
class DiagramStore extends ResourceStore<DiagramDto> {
}

@Component
class BoardStore extends ResourceStore<BoardDto> {
}

@Component
class TeamStore extends ResourceStore<TeamDto> {
}
