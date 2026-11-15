package com.hamzajg.odeev.kata.poc.gensol;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Shared in-memory store for the kata's resources. Assigns a server id on
 * create when the client didn't supply one and owns the CRUD-by-id
 * semantics so every controller behaves identically.
 */
public class ResourceStore<T extends Identifiable> {

    private final Map<String, T> items = new ConcurrentHashMap<>();

    public List<T> all() {
        return List.copyOf(items.values());
    }

    public Optional<T> get(String id) {
        return id == null ? Optional.empty() : Optional.ofNullable(items.get(id));
    }

    public boolean exists(String id) {
        return id != null && items.containsKey(id);
    }

    public T create(T dto) {
        if (dto.id() == null || dto.id().isBlank()) {
            dto.id(UUID.randomUUID().toString());
        }
        items.put(dto.id(), dto);
        return dto;
    }

    /** Replaces the stored entity, keeping the path id authoritative. */
    public T replace(String id, T dto) {
        dto.id(id);
        items.put(id, dto);
        return dto;
    }

    public boolean delete(String id) {
        return id != null && items.remove(id) != null;
    }
}
