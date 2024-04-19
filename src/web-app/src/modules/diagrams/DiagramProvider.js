import React, {createContext, useState, useEffect} from 'react';
import {v4 as uuidv4} from "uuid";

const DiagramsContext = createContext();

const DiagramsProvider = ({children}) => {
    const [diagrams, setDiagrams] = useState(() => {
        const savedDiagrams = localStorage.getItem('diagrams');
        return savedDiagrams ? JSON.parse(savedDiagrams) : [];
    });

    useEffect(() => {
        localStorage.setItem('diagrams', JSON.stringify(diagrams));
    }, [diagrams]);

    const addDiagram = (newDiagram) => {
        newDiagram.id = uuidv4();
        newDiagram.createdAt = new Date().toISOString();
        newDiagram.updatedAt = new Date().toISOString();
        setDiagrams([...diagrams, newDiagram]);
        postDiagram(newDiagram)
    };

    const postDiagram = async (newDiagram) => {
        try {
            const response = await fetch('http://localhost:8081/diagrams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDiagram),
            });

            if (response.ok) {
                console.error('Diagram added:');
            } else {
                console.error('Error adding diagram:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding diagram:', error);
        }
    };

    useEffect(() => {
        const fetchDiagrams = async () => {
            try {
                const response = await fetch('http://localhost:8081/diagrams');

                if (response.ok) {
                    const fetchedTeams = await response.json();
                    setDiagrams(fetchedTeams);
                } else {
                    console.error('Error fetching diagrams:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching diagrams:', error);
            }
        };

        fetchDiagrams();
    }, []);

    const removeDiagram = (diagramId) => {
        setDiagrams(diagrams.filter(diagram => diagram.id !== diagramId));
    };

    const findDiagramsByProjectId = (projectId) => {
        return diagrams.filter(diagram => diagram.projectId === projectId);
    }

    const findDiagramById = (id) => {
        return diagrams.find(diagram => diagram.id === id);
    }

    const value = {
        diagrams,
        addDiagram,
        removeDiagram,
        findDiagramsByProjectId,
        findDiagramById
    };

    return <DiagramsContext.Provider value={value}>{children}</DiagramsContext.Provider>;

};

export {DiagramsProvider, DiagramsContext};