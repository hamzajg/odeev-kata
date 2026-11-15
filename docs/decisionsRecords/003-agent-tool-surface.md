# 003 — Agent tool surface over the Ollama chat client

## Status

Accepted — implemented on `feat/agent-tools`.

## Context

The kata's AI surface was two ad-hoc endpoints (`/ai/generate`,
`/ai/generateStream`) returning raw chat output. CLI and IDE agent
clients need a stable, discoverable contract: what operations exist,
what parameters they take, and structured results — not free-form chat.

## Decision

`AgentToolRegistry` (`@Component`) holds a named-tool map; each tool is a
thin prompt wrapper over `OllamaChatClient`:

- `generate_code` — `{prompt*, language?}` → code only
- `explain_code` — `{code*, question?}` → explanation
- `review_code` — `{code*}` → review

`AgentToolController` exposes:

- `GET /api/agent/tools` — tool list with JSON-schema-ish parameter specs
- `POST /api/agent/tools/call` — `{tool, input}` → `{tool, ok, output, error}`

Error mapping: unknown tool → 404, missing required param → 400,
LLM/backend failure → 502 (same convention as the fleet's other agent
endpoints). Prompt text lives inside the registry handlers, so prompts
evolve without breaking callers.

## Consequences

- Agents get discovery (`GET /tools`) + a uniform call shape; adding a
  capability = one `ToolSpec` registration, no endpoint changes.
- Deliberately **not** a tool-calling loop: the caller (CLI/IDE/agent
  runtime) owns orchestration. Spring AI function-calling can come later
  if a hosted agent loop is wanted — the registry shape already matches
  that model.
- Read-only/generate-only: tools never mutate boards/solutions. Any
  future write tool needs an explicit confirmation design first.
- Ollama still required at runtime; tests mock `OllamaChatClient`.
