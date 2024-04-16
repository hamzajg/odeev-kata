// src/App.js
import React from 'react';
import HomePage from "./modules/home/HomePage";
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import Layout from "./modules/Layout";
import ProjectsPage from "./modules/projects/ProjectsPage";
import {ModulesProvider} from "./modules/ModulesProvider";
import DiagramsPage from "./modules/diagrams/DiagramsPage";
import BoardPage from "./modules/board/BoardPage";
import GeneratePage from "./modules/generate/GeneratePage";

const App = () => {
    return (
        <Router>
            <Layout>
                <ModulesProvider>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/projects" element={<ProjectsPage/>}/>
                        <Route path="/projects/:id/diagrams" element={<DiagramsPage/>}/>
                        <Route path="/projects/:id/diagrams/:id/board" element={<BoardPage/>}/>
                        <Route path="/projects/:id/generate" element={<GeneratePage/>}/>
                    </Routes>
                </ModulesProvider>
            </Layout>
        </Router>
    );
};

export default App;