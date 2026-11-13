# AGENTS.md — odeev-kata

Guidance for AI agents (and humans) working in this repository.

## Project

Solution exploration for the **Odeev kata** (Sintegra Odeev): a
comprehensive development environment for building/deploying software —
spanning an integrated platform, custom web app, IDE extension
(VSCode/JetBrains), and console CLI. The repo holds exploration logs,
architecture decisions, and a working PoC.
Approach: **pragmatic and evolutionary** — integrate existing tools first,
generate code bottom-up.
Stack: polyglot PoC — Spring Boot web APIs, React web app, VSCode
extension (TS), bash CLI.

## Commands

Verified 2026-11-13 against CI (`.github/workflows/ci.yml`, two jobs).

| Task | Command |
|---|---|
| Web APIs build (CI) | `cd src/web-apis && ./gradlew build --no-daemon` |
| Web app install (CI) | `cd src/web-app && yarn install --immutable` (corepack) |
| Web app build (CI) | `cd src/web-app && yarn build` |
| CLI help | `src/cli-tool/cli-tool.sh --help` |
| Web APIs run | `cd src/web-apis && ./gradlew bootRun` — port **8081** (`server.port` in application config) |

`docker-compose.yml` at root can bring up supporting services.

## Architecture

```
src/
  web-apis/          Spring Boot 3.2.4 REST API (Java, Gradle)
                     spring-ai-ollama starter, springdoc-openapi,
                     port 8081; controllers: Board, Team, Solution,
                     CodeGenerator + DTOs (Diagram, Project, Metadata,
                     Team, Solution)
  web-app/           React app (react-scripts CRA, Tailwind, yarn)
  vscode-extension/  VSCode extension (TypeScript, minimal:
                     extension.ts + utilities.ts)
  cli-tool/          cli-tool.sh — scaffolding CLI (create-solution,
                     create-project, framework-migration, add-domain/
                     application-service/domain-service/controller/
                     endpoint/event-publisher/event-consumer/command/
                     query/tests)
docs/
  decisionsRecords/  ADRs: 001 ADRs, 002 bottom-up solution modeling
```

### PoC flow

IDE/CLI → `web-apis` (Spring Boot) → generates solution/project code
(`CodeGeneratorController`, spring-ai-ollama for AI assist) → artifacts
consumed by `web-app` / `vscode-extension` / `cli-tool`.

## Conventions

- ADRs live in `docs/decisionsRecords/` — new architectural choices get a
  numbered ADR **before** bulk implementation.
- `web-apis` follows Spring Boot conventions: controllers + DTOs; keep
  generation logic out of controllers.
- `cli-tool.sh` is bash — match its function-per-command style; every
  command needs a `--help` entry.
- `web-app` is CRA (`react-scripts`) — legacy but working; don't migrate
  framework without an ADR.
- KISS: this is a kata PoC — prefer the smallest thing that proves the
  integration over production polish.

## Landmines

- **Default branch is `main`, not `master`.**
- `web-apis` needs **JDK 17+** (Spring Boot 3.x) — not the JDK 8 used by
  sibling Android repos.
- `web-app` uses **yarn** (`yarn install --immutable` in CI) and CRA —
  `npm install` may work but isn't what CI verifies.
- `node_modules/` and `build/` exist under `src/web-app/` — generated,
  don't commit.
- `web-apis/build/` exists — Gradle output.
- Spring AI Ollama starter requires an Ollama instance for AI features —
  API boots without it but generation endpoints need it.
- Port **8081** for web-apis — not the usual 8080.

## Agent rules

- Branch from `main`; name branches `feat/*`, `fix/*`, `chore/*`, `docs/*`.
- Docs-only changes still go through a PR; never commit to `main` directly.
- Verify before claiming: run the CI commands above (`gradlew build`,
  `yarn install --immutable && yarn build`) and report real output.
- New cross-component decisions → add an ADR in `docs/decisionsRecords/`.
- Keep changes minimal and consistent with surrounding code. No drive-by
  refactors.
- Update AGENTS.md / docs/ARCHITECTURE.md when components, ports, or
  commands change.
