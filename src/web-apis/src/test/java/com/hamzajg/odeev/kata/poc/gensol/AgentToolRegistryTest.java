package com.hamzajg.odeev.kata.poc.gensol;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AgentToolRegistryTest {

    private OllamaChatModel chatClient;
    private AgentToolRegistry registry;

    @BeforeEach
    void setUp() {
        chatClient = mock(OllamaChatModel.class);
        when(chatClient.call(any(Prompt.class))).thenReturn(
                new ChatResponse(List.of(new Generation(new org.springframework.ai.chat.messages.AssistantMessage("llm-output")))));
        registry = new AgentToolRegistry(chatClient);
    }

    @Test
    void listExposesAllToolsWithSchemas() {
        List<AgentToolInfo> tools = registry.list();

        assertEquals(3, tools.size());
        assertTrue(tools.stream().anyMatch(t -> t.name().equals("generate_code")));
        AgentToolInfo gen = tools.stream()
                .filter(t -> t.name().equals("generate_code")).findFirst().orElseThrow();
        @SuppressWarnings("unchecked")
        List<String> required = (List<String>) gen.parameters().get("required");
        assertTrue(required.contains("prompt"));
    }

    @Test
    void callReturnsLlmOutput() {
        AgentToolResult result = registry.call("generate_code",
                Map.of("prompt", "a REST endpoint", "language", "java"));

        assertTrue(result.ok());
        assertEquals("generate_code", result.tool());
        assertEquals("llm-output", result.output());
    }

    @Test
    void callBuildsSystemAndUserPrompt() {
        registry.call("explain_code", Map.of("code", "int x = 1;"));

        ArgumentCaptor<Prompt> captor = ArgumentCaptor.forClass(Prompt.class);
        verify(chatClient).call(captor.capture());
        assertEquals(2, captor.getValue().getInstructions().size());
    }

    @Test
    void callRejectsMissingRequiredParam() {
        AgentToolResult result = registry.call("generate_code", Map.of());

        assertFalse(result.ok());
        assertTrue(result.error().contains("prompt"));
        verifyNoInteractions(chatClient);
    }

    @Test
    void callRejectsUnknownTool() {
        AgentToolResult result = registry.call("nope", Map.of());

        assertFalse(result.ok());
        assertTrue(result.error().contains("unknown tool"));
    }

    @Test
    void callSurfacesLlmFailureAsError() {
        when(chatClient.call(any(Prompt.class)))
                .thenThrow(new RuntimeException("ollama down"));

        AgentToolResult result = registry.call("review_code", Map.of("code", "x"));

        assertFalse(result.ok());
        assertTrue(result.error().contains("llm error"));
    }
}
