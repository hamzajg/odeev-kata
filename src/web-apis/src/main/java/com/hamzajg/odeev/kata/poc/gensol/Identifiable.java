package com.hamzajg.odeev.kata.poc.gensol;

/**
 * Contract for DTOs stored in a {@link ResourceStore}: an identity that the
 * store can read and assign.
 */
public interface Identifiable {
    String id();

    void id(String id);
}
