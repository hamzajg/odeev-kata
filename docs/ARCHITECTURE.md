# Architecture — odeev-kata

Current-state map. Descriptive, not aspirational; see `docs/adr/` and
`docs/decisionsRecords/` for rationale.

## Shape

```
odeev-kata/
├── src/
│   ├── web-apis/          Spring Boot 3.2.4 REST API (Java/Gradle)
│   │   └── src/main/java/com/hamzajg/odeev/kata/poc/gensol/
│   │       ├── *Controller.java   Board, Team, Solution, CodeGenerator
│   │       └── *Dto.java          Diagram, Project, Metadata, Team, Solution
│   ├── web-app/           React CRA app (react-scripts, Tailwind, yarn)
│   ├── vscode-extension/  VSCode extension (TS: extension.ts, utilities.ts)
│   └── cli-tool/          cli-tool.sh scaffolding CLI (bash)
├── docs/
│   └── decisionsRecords/  001 ADRs, 002 bottom-up solution modeling
├── docker-compose.yml     supporting services
└── README.md              exploration log + kata links
```

## Components

- **web-apis** — Spring Boot on port **8081**; spring-ai-ollama for AI
  generation, springdoc-openapi for API docs. PoC code generator
  (`gensol` package): boards, teams, solutions, code generation.
- **web-app** — React SPA (CRA) consuming the APIs; yarn-based.
- **vscode-extension** — minimal TS extension scaffold.
- **cli-tool** — bash scaffolding commands for solutions/projects/
  domains/services/endpoints/tests.

## Flows

1. User describes a solution (web-app / IDE / CLI).
2. `web-apis` receives it, uses AI (Ollama) + templates to generate
   project artifacts.
3. Generated code is consumed by the target tool (IDE extension, CLI,
   or web app).

## Integration surfaces

- REST API (port 8081) — primary contract; OpenAPI docs via springdoc.
- `cli-tool.sh` — shell contract (commands listed in `--help`).
- VSCode extension — thin client over the API.

## State

PoC-stage: DTOs + controllers in `web-apis`; no persistent domain model
visible — generation is the product. `docs/decisionsRecords/` records
why bottom-up generation was chosen.
