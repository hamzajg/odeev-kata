import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
    };

    const findSolutionById = (id) => {
        return solutions.find(solution => solution.id === id);
    }

    const value = {
        solutions,
        addSolution,
        findSolutionById
    };

    return <SolutionContext.Provider value={value}>{children}</SolutionContext.Provider>;
};

export { SolutionProvider, SolutionContext };