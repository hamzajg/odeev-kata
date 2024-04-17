import React, {createContext} from 'react';
import {ProjectProvider} from './projects/ProjectProvider';
import {DiagramsProvider} from "./diagrams/DiagramProvider";
import {BoardsProvider} from "./board/BoardProvider";
import {TeamProvider} from "./teams/TeamsProvider";

const ModulesContext = createContext();

const ModulesProvider = ({children}) => {
    return (
        <ModulesContext.Provider value={{}}>
            <TeamProvider>
                <ProjectProvider>
                    <DiagramsProvider>
                        <BoardsProvider>
                            {children}
                        </BoardsProvider>
                    </DiagramsProvider>
                </ProjectProvider>
            </TeamProvider>
        </ModulesContext.Provider>
    );
};

export {ModulesContext, ModulesProvider};