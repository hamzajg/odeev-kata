package com.hamzajg.odeev.kata.poc.gensol;

public class SolutionDto implements Identifiable {
    public String id;

    @Override
    public String id() { return id; }

    @Override
    public void id(String value) { id = value; }
    public String name;
    public String description;
    public int domain;
}
