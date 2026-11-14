# ADR 0001 — Initial architecture

Date: 2026-11-13 (baseline recorded retroactively)
Status: accepted (describes what is built)

## Context

The Odeev kata asks for a development environment spanning platform,
web app, IDE extension, and CLI. The repo is an exploration log + PoC,
not a finished product.

## Decisions

1. **Polyglot PoC, one repo.** Spring Boot API + React web app + VSCode
   extension + bash CLI coexist under `src/`. Rationale: the kata
   explicitly explores multiple integration surfaces; separate repos
   would slow iteration.
2. **Bottom-up solution modeling.** `docs/decisionsRecords/002` records
   generating code from domain primitives upward rather than top-down
   templates. Rationale: solutions compose better when built from
   reusable domain/application-service pieces.
3. **Spring Boot 3 + spring-ai-ollama for generation.** `web-apis`
   (port 8081) hosts the PoC code generator with an Ollama-backed AI
   starter. Rationale: Spring ecosystem maturity + local-model AI keeps
   the PoC self-hostable.
4. **Bash CLI for scaffolding.** `cli-tool.sh` exposes create/add
   commands as a thin shell layer. Rationale: simplest possible client;
   proves the API contract without a compiled tool.
5. **ADR-first for cross-cutting choices.** `docs/decisionsRecords/`
   holds numbered ADRs. Rationale: kata explicitly values documented
   trade-offs.
6. **Evolutionary, not big-bang.** Integrate existing tools first;
   custom surfaces only where needed. Rationale: kata guidance +
   pragmatic scope.

## Consequences / open questions

- No persistent backend model yet — generation is stateless-ish; a real
  platform needs storage, auth, tenancy.
- `web-app` is CRA (react-scripts) — aging; migration is an ADR-worthy
  decision, not a drive-by.
- VSCode extension is a scaffold — JetBrains/console variants are
  unexplored.
- AI generation quality depends on Ollama models — not reproducible
  across environments without pinning.
