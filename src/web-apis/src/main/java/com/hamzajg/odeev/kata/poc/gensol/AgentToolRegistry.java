package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

/**
 * Named tool surface over the Ollama chat client for CLI/IDE agent clients.
 * Each tool is a thin prompt wrapper — the stable contract agents call;
 * prompts can evolve without breaking callers.
 */
@Component
public class AgentToolRegistry {

    public record ToolSpec(String name, String description,
                           Map<String, Object> parameters,
                           Function<Map<String, Object>, String> handler) {
    }

    private record Field(String name, String description, boolean required) {
    }

    private final OllamaChatModel chatClient;
    private final Map<String, ToolSpec> tools = new LinkedHashMap<>();

    public AgentToolRegistry(OllamaChatModel chatClient) {
        this.chatClient = chatClient;
        register(new ToolSpec("generate_code",
                "Generate source code from a natural-language prompt",
                params(new Field("prompt", "What to build", true),
                        new Field("language", "Target language (optional)", false)),
                this::generateCode));
        register(new ToolSpec("explain_code",
                "Explain what a code snippet does",
                params(new Field("code", "The code to explain", true),
                        new Field("question", "Specific question (optional)", false)),
                this::explainCode));
        register(new ToolSpec("review_code",
                "Review a code snippet for bugs, style, and improvements",
                params(new Field("code", "The code to review", true)),
                this::reviewCode));
    }

    private void register(ToolSpec spec) {
        tools.put(spec.name(), spec);
    }

    public List<AgentToolInfo> list() {
        List<AgentToolInfo> out = new ArrayList<>();
        for (ToolSpec t : tools.values()) {
            out.add(new AgentToolInfo(t.name(), t.description(), t.parameters()));
        }
        return out;
    }

    public AgentToolResult call(String name, Map<String, Object> input) {
        ToolSpec spec = tools.get(name);
        if (spec == null) {
            return new AgentToolResult(name, false, null, "unknown tool: " + name);
        }
        try {
            String output = spec.handler().apply(input == null ? Map.of() : input);
            return new AgentToolResult(name, true, output, null);
        } catch (IllegalArgumentException e) {
            return new AgentToolResult(name, false, null, e.getMessage());
        } catch (RuntimeException e) {
            return new AgentToolResult(name, false, null, "llm error: " + e.getMessage());
        }
    }

    // ── handlers ──────────────────────────────────────────────────────────

    private String generateCode(Map<String, Object> input) {
        String prompt = require(input, "prompt");
        String language = optional(input, "language");
        String user = language == null
                ? prompt
                : "Target language: " + language + "\n\n" + prompt;
        return ask("You are an expert software engineer. Generate clean, "
                + "production-quality code. Output ONLY the code — no "
                + "explanations, no markdown fences unless the language "
                + "requires them.", user);
    }

    private String explainCode(Map<String, Object> input) {
        String code = require(input, "code");
        String question = optional(input, "question");
        String user = "```\n" + code + "\n```";
        if (question != null) {
            user += "\n\nQuestion: " + question;
        }
        return ask("You are a senior engineer mentoring a developer. Explain "
                + "clearly and concisely what the code does and why.", user);
    }

    private String reviewCode(Map<String, Object> input) {
        String code = require(input, "code");
        return ask("You are a strict but constructive code reviewer. Point out "
                + "bugs, edge cases, and concrete improvements. Be brief.",
                "```\n" + code + "\n```");
    }

    // ── helpers ───────────────────────────────────────────────────────────

    private String ask(String system, String user) {
        var response = chatClient.call(new Prompt(List.of(
                new SystemMessage(system), new UserMessage(user))));
        return response.getResult().getOutput().getText();
    }

    private static String require(Map<String, Object> input, String key) {
        Object v = input.get(key);
        if (v == null || v.toString().isBlank()) {
            throw new IllegalArgumentException("missing required parameter: " + key);
        }
        return v.toString();
    }

    private static String optional(Map<String, Object> input, String key) {
        Object v = input.get(key);
        return v == null || v.toString().isBlank() ? null : v.toString();
    }

    private static Map<String, Object> params(Field... fields) {
        Map<String, Object> schema = new LinkedHashMap<>();
        schema.put("type", "object");
        Map<String, Object> properties = new LinkedHashMap<>();
        List<String> required = new ArrayList<>();
        for (Field f : fields) {
            Map<String, Object> p = new LinkedHashMap<>();
            p.put("type", "string");
            p.put("description", f.description());
            properties.put(f.name(), p);
            if (f.required()) {
                required.add(f.name());
            }
        }
        schema.put("properties", properties);
        schema.put("required", required);
        return schema;
    }
}
