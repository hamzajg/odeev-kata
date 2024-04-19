package com.hamzajg.odeev.kata.poc.gensol;

import java.util.List;

public class TeamDto {
    public String id;
    public String name;
    public String description;
    public String guild;
    public List<MemberDto> members;

    static class MemberDto {
        public String id;
        public String name;
    }
}