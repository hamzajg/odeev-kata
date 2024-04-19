import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TeamContext = createContext();

const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState(() => {
        const savedTeams = localStorage.getItem('teams');
        return savedTeams ? JSON.parse(savedTeams) : [];
    });

    useEffect(() => {
        localStorage.setItem('teams', JSON.stringify(teams));
    }, [teams]);

    const addTeam = (newTeam) => {
        newTeam.id = uuidv4();
        setTeams([...teams, newTeam]);
        postTeam(newTeam)
    };

    const postTeam = async (newTeam) => {
        try {
            const response = await fetch('http://localhost:8081/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTeam),
            });

            if (response.ok) {
                console.error('Team added:');
            } else {
                console.error('Error adding team:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:8081/teams');

                if (response.ok) {
                    const fetchedTeams = await response.json();
                    setTeams(fetchedTeams);
                } else {
                    console.error('Error fetching teams:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    const removeTeam = (id) => {
        const updatedTeams = teams.filter((team) => team.id !== id);
        setTeams(updatedTeams);
    };

    const value = {
        teams,
        addTeam,
        removeTeam
    };

    return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export { TeamProvider, TeamContext };