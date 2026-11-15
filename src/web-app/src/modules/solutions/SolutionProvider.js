import React, { createContext, useState, useEffect } from 'react';
import {SolutionService} from "./SolutionService";
import {Utilities} from "../../utilities/Utillties";

const SolutionContext = createContext();

const SolutionProvider = ({ children }) => {
    const [solutions, setSolutions] = useState(() => {
        const savedSolutions = localStorage.getItem('solutions');
        return savedSolutions ? JSON.parse(savedSolutions) : [];
    });

    useEffect(() => {
        localStorage.setItem('solutions', JSON.stringify(solutions ?? []));
    }, [solutions]);

    const refreshSolutions = () => {
        SolutionService.fetchSolutions()
            .then(data => setSolutions(data ?? []));
    };

    useEffect(refreshSolutions, []);

    const addSolution = (newSolution) => {
        SolutionService.postSolution(newSolution).then(refreshSolutions);
    };

    const updateSolution = (id, updatedSolution) => {
        SolutionService.updateSolution(id, updatedSolution).then(refreshSolutions);
    };

    const removeSolution = (id) => {
        SolutionService.deleteSolution(id).then(refreshSolutions);
    };

    const findSolutionById = (id) => {
        return solutions.find(solution => solution.id === id);
    }

    const handleGenerateProject = async (project, settings) => {
        const metadata = {...project,
            frameworkVersion: "1.0.0",
            settings: settings,
            openApiSpecFilePath: "open-apis-specs.yml",
            domainEventModelFilePath: "domain-context-event-modeling.json",
            domainSpecificationModelFilePath: "domain-context-specification-by-example.json",
        }

        try {
            const defaultPath =  project.name + ".zip";

            const response = await SolutionService.callSwaggerCodeGen(metadata)
            const reader = new FileReader();
            reader.onload = () => {
                window.postMessage({type: "createProject", filePath: defaultPath, fileContent: reader.result}, '*');
            };
            reader.readAsArrayBuffer(response);

            await Utilities.showSaveFilePickerFor(defaultPath, response)
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    const handleSaveMetadata = async (project, settings) => {
        const defaultPath =  "metadata.json";
        const metadata = {...project,
            frameworkVersion: "1.0.0",
            settings: settings,
            openApiSpecFilePath: "open-apis-specs.yml",
            domainEventModelFilePath: "domain-context-event-modeling.json",
            domainSpecificationModelFilePath: "domain-context-specification-by-example.json",
        }
        const metadataContent = JSON.stringify(metadata, undefined, 2);
        window.postMessage({type: "createFile", filePath: "metadata.json", fileContent: metadataContent}, '*');
        await Utilities.showSaveFilePickerFor(defaultPath, metadataContent)
    };

    const value = {
        solutions,
        addSolution,
        updateSolution,
        removeSolution,
        findSolutionById,
        handleSaveMetadata,
        handleGenerateProject
    };

    return <SolutionContext.Provider value={value}>{children}</SolutionContext.Provider>;
};

export { SolutionProvider, SolutionContext };