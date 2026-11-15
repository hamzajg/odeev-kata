import React, {createContext, useState, useEffect} from 'react';
import {DiagramService} from "./DiagramService";

const DiagramsContext = createContext();

const DiagramsProvider = ({children}) => {
    const [diagrams, setDiagrams] = useState(() => {
        const savedDiagrams = localStorage.getItem('diagrams');
        return savedDiagrams ? JSON.parse(savedDiagrams) : [];
    });

    useEffect(() => {
        localStorage.setItem('diagrams', JSON.stringify(diagrams ?? []));
    }, [diagrams]);

    const refreshDiagrams = () => {
        DiagramService.fetchDiagrams()
            .then(data => setDiagrams(data ?? []));
    };

    useEffect(refreshDiagrams, []);

    const addDiagram = (newDiagram) => {
        newDiagram.createdAt = new Date().toISOString();
        newDiagram.updatedAt = new Date().toISOString();
        DiagramService.postDiagram(newDiagram).then(refreshDiagrams);
    };

    const updateDiagram = (id, updatedDiagram) => {
        DiagramService.updateDiagram(id, updatedDiagram).then(refreshDiagrams);
    };

    const removeDiagram = (diagramId) => {
        DiagramService.deleteDiagram(diagramId).then(refreshDiagrams);
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
        updateDiagram,
        removeDiagram,
        findDiagramsByProjectId,
        findDiagramById
    };

    return <DiagramsContext.Provider value={value}>{children}</DiagramsContext.Provider>;

};

export {DiagramsProvider, DiagramsContext};