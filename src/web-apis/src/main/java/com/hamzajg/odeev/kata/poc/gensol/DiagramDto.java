package com.hamzajg.odeev.kata.poc.gensol;

public class DiagramDto implements Identifiable {
    public String id;

    @Override
    public String id() { return id; }

    @Override
    public void id(String value) { id = value; }
    public String projectId;
    public String name;
    public String description;
    public String type;
    public String createdAt;
    public String updatedAt;
}
