import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem('projects');
        return savedProjects ? JSON.parse(savedProjects) : [];
    });

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    const addProject = (newProject) => {
        newProject.id = uuidv4();
        setProjects([...projects, newProject]);
    };

    const removeProject = (projectId) => {
        const updatedProjects = projects.filter((project) => project.id !== projectId);
        setProjects(updatedProjects);
    };

    const findProjectById = (projectId) => {
        return projects.find(project => project.id === projectId);
    }

    const value = {
        projects,
        addProject,
        removeProject,
        findProjectById
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export { ProjectProvider, ProjectContext };