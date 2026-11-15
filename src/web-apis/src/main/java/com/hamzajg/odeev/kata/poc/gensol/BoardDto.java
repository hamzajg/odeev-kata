package com.hamzajg.odeev.kata.poc.gensol;

import java.util.List;

public class BoardDto implements Identifiable {
    public String id;

    @Override
    public String id() { return id; }

    @Override
    public void id(String value) { id = value; }
    public String diagramId;
    public String nodes;
    public String edges;
}