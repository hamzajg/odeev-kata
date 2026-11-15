package com.hamzajg.odeev.kata.poc.gensol;

import java.util.List;

public class TeamDto implements Identifiable {
    public String id;

    @Override
    public String id() { return id; }

    @Override
    public void id(String value) { id = value; }
    public String name;
    public String description;
    public String guild;
    public List<MemberDto> members;

    static class MemberDto {
        public String id;
        public String name;
    }
}