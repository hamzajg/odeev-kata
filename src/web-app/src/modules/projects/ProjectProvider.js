import React, { createContext, useState, useEffect } from 'react';
import {ProjectService} from "./ProjectService";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem('projects');
        return savedProjects ? JSON.parse(savedProjects) : [];
    });

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects ?? []));
    }, [projects]);

    const refreshProjects = () => {
        ProjectService.fetchProjects()
            .then(data => setProjects(data ?? []));
    };

    useEffect(refreshProjects, []);

    const addProject = (newProject) => {
        ProjectService.postProject(newProject).then(refreshProjects);
    };

    const updateProject = (id, updatedProject) => {
        ProjectService.updateProject(id, updatedProject).then(refreshProjects);
    };

    const removeProject = (projectId) => {
        ProjectService.deleteProject(projectId).then(refreshProjects);
    };

    const findProjectById = (id) => {
        return projects.find(project => project.id === id);
    }

    const findProjectsBySolutionId = (solutionId) => {
        return projects.filter(project => project.solutionId === solutionId);
    }

    const value = {
        projects,
        addProject,
        updateProject,
        removeProject,
        findProjectById,
        findProjectsBySolutionId
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export { ProjectProvider, ProjectContext };