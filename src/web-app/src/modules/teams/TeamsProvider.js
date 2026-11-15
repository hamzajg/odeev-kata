import React, { createContext, useState, useEffect } from 'react';
import {TeamService} from "./TeamService";

const TeamContext = createContext();

const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState(() => {
        const savedTeams = localStorage.getItem('teams');
        return savedTeams ? JSON.parse(savedTeams) : [];
    });

    useEffect(() => {
        localStorage.setItem('teams', JSON.stringify(teams ?? []));
    }, [teams]);

    const refreshTeams = () => {
        TeamService.fetchTeams()
            .then(data => setTeams(data ?? []));
    };

    useEffect(refreshTeams, []);

    const addTeam = (newTeam) => {
        TeamService.postTeam(newTeam).then(refreshTeams);
    };

    const updateTeam = (id, updatedTeam) => {
        TeamService.updateTeam(id, updatedTeam).then(refreshTeams);
    };

    const removeTeam = (id) => {
        TeamService.deleteTeam(id).then(refreshTeams);
    };

    const value = {
        teams,
        addTeam,
        updateTeam,
        removeTeam
    };

    return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export { TeamProvider, TeamContext };