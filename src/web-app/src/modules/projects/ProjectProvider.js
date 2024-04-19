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
        postProject(newProject)
    };

    const postProject = async (newProject) => {
        try {
            const response = await fetch('http://localhost:8081/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                console.error('Project added:');
            } else {
                console.error('Error adding project:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8081/projects');

                if (response.ok) {
                    const fetchedProjects = await response.json();
                    setProjects(fetchedProjects);
                } else {
                    console.error('Error fetching projects:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const removeProject = (projectId) => {
        const updatedProjects = projects.filter((project) => project.id !== projectId);
        setProjects(updatedProjects);
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
        removeProject,
        findProjectById,
        findProjectsBySolutionId
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export { ProjectProvider, ProjectContext };