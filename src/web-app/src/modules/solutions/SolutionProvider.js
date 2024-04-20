import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {SolutionService} from "./SolutionService";

const SolutionContext = createContext();

const SolutionProvider = ({ children }) => {
    const [solutions, setSolutions] = useState(() => {
        const savedSolutions = localStorage.getItem('solutions');
        return savedSolutions ? JSON.parse(savedSolutions) : [];
    });

    useEffect(() => {
        localStorage.setItem('solutions', JSON.stringify(solutions));
    }, [solutions]);

    const addSolution = (newSolution) => {
        newSolution.id = uuidv4();
        setSolutions([...solutions, newSolution]);
        SolutionService.postSolution(newSolution)
    };

    useEffect(() => {
        SolutionService.fetchSolutions()
            .then(setSolutions);
    }, []);

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
        const metadataContent = JSON.stringify(metadata, undefined, 2);
        window.postMessage({type: "createProject", filePath: "/metadata.json", fileContent: metadataContent}, '*');
    }

    const handleSaveMetadata = async (project, settings) => {
        const defaultPath =  "/metadata.json";
        const metadata = {...project,
            frameworkVersion: "1.0.0",
            settings: settings,
            openApiSpecFilePath: "open-apis-specs.yml",
            domainEventModelFilePath: "domain-context-event-modeling.json",
            domainSpecificationModelFilePath: "domain-context-specification-by-example.json",
        }
        const metadataContent = JSON.stringify(metadata, undefined, 2);
        window.postMessage({type: "createFile", filePath: "/metadata.json", fileContent: metadataContent}, '*');
        try {
            const opts = {
                suggestedName: defaultPath
            };
            const handle = await window.showSaveFilePicker(opts);
            const writableStream = await handle.createWritable();
            await writableStream.write(metadataContent);
            await writableStream.close();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('File save operation aborted by the user.');
            } else {
                console.error('Error saving file:', error);
            }
        }
    };
    const value = {
        solutions,
        addSolution,
        findSolutionById,
        handleSaveMetadata,
        handleGenerateProject
    };

    return <SolutionContext.Provider value={value}>{children}</SolutionContext.Provider>;
};

export { SolutionProvider, SolutionContext };