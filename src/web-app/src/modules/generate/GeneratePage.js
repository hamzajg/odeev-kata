import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card, Table, Tabs} from "flowbite-react";
import {ProjectContext} from "../projects/ProjectProvider";
import {DiagramsContext} from "../diagrams/DiagramProvider";
import GenerationSettings from "./components/GenerationSettings";
import RequiredStepsProgress from "./components/RequiredStepsProgress";
import HistoryTab from "./components/HistoryTab";
import CompareTab from "./components/CompareTab";
import OpenApisSpecificationEditorAndSwaggerPreview from "./components/OpenApisSpecificationEditorAndSwaggerPreview";

const GeneratePage = () => {
    const { id } = useParams();
    const { findProjectById } = useContext(ProjectContext);
    const { findDiagramsByProjectId, addDiagram } = useContext(DiagramsContext);

    const navigate = useNavigate();
    const project = findProjectById(id)
    const projectDiagrams = findDiagramsByProjectId(id);

    const [activeTab, setActiveTab] = useState(0);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [formData, setFormData] = useState({id: '', projectId: id, name: '', description: '', type: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        addDiagram(formData);
        setFormData({id: '', projectId: id, name: '', description: '', type: ''});
        setShowRightPanel(false);
    };

    if (!project) {
        navigate("/projects");
    }

    return (
        <div className="p-6">
            <Card>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '48%'}}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {project.name}
                        </h5>
                        <p>Description: {project.description}</p>

                        <RequiredStepsProgress />
                    </div>
                    <div style={{width: '48%'}}>
                        <GenerationSettings />
                    </div>
                </div>
            </Card>

            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Bottom Up Design</h1>
            </div>
            <Tabs activeTab={activeTab} onTabChange={(index) => setActiveTab(index)}>
                <Tabs.TabPanel title="Boards">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Diagram name</Table.HeadCell>
                            <Table.HeadCell>Description</Table.HeadCell>
                            <Table.HeadCell>Type</Table.HeadCell>
                            <Table.HeadCell>Created At</Table.HeadCell>
                            <Table.HeadCell>Updated At</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Board</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {projectDiagrams.map((diagram, index) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {diagram.name}</Table.Cell>
                                    <Table.Cell>{diagram.description}</Table.Cell>
                                    <Table.Cell>{diagram.type}</Table.Cell>
                                    <Table.Cell>{diagram.createdAt}</Table.Cell>
                                    <Table.Cell>{diagram.updatedAt}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-wrap gap-2">
                                            <Button color="green"><a
                                                href={"/projects/" + diagram.projectId + "/diagrams/" + diagram.id + "/board"}>Board</a></Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Tabs.TabPanel>
                <Tabs.TabPanel title="Revision/History">
                    <HistoryTab/>
                </Tabs.TabPanel>
                <Tabs.TabPanel title="Compare/Merge">
                    <CompareTab/>
                </Tabs.TabPanel>
            </Tabs>
            <div className="flex justify-between mb-4 mt-2">
                <h1 className="text-2xl font-bold">Top Down Design</h1>
            </div>
                <Tabs activeTab={activeTab} onTabChange={(index) => setActiveTab(index)}>
                    <Tabs.TabPanel title="Editor">
                        <OpenApisSpecificationEditorAndSwaggerPreview />
                    </Tabs.TabPanel>
                    <Tabs.TabPanel title="Revision/History">
                        <HistoryTab/>
                    </Tabs.TabPanel>
                    <Tabs.TabPanel title="Compare/Merge">
                        <CompareTab/>
                    </Tabs.TabPanel>
                </Tabs>
        </div>
    );
};

export default GeneratePage;
