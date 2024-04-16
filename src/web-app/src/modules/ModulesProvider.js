import React, {createContext} from 'react';
import {ProjectProvider} from './projects/ProjectProvider';
import {DiagramsProvider} from "./diagrams/DiagramProvider";
import {BoardsProvider} from "./board/BoardProvider";

const ModulesContext = createContext();

const ModulesProvider = ({children}) => {
    return (
        <ModulesContext.Provider value={{}}>
            <ProjectProvider>
                <DiagramsProvider>
                    <BoardsProvider>
                        {children}
                    </BoardsProvider>
                </DiagramsProvider>
            </ProjectProvider>
        </ModulesContext.Provider>
    );
};

export {ModulesContext, ModulesProvider};