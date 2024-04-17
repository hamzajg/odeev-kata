package com.hamzajg.odeev.kata.poc.gensol;

import org.springframework.ai.ollama.OllamaChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class CodeGenChatController {

    private final OllamaChatClient chatClient;

    @Autowired
    public CodeGenChatController(OllamaChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @GetMapping("/ai/generate")
    public Map generate(@RequestParam(value = "message", defaultValue = "Help") String message) {
        return Map.of("generation", chatClient.call(message));
    }

}