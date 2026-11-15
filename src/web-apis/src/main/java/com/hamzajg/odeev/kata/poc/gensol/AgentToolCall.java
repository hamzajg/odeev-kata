package com.hamzajg.odeev.kata.poc.gensol;

import java.util.Map;

public record AgentToolCall(String tool, Map<String, Object> input) {
}
