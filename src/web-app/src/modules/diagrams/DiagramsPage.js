import React, {useContext, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Button, Card, Select, Table, Textarea, TextInput} from "flowbite-react";
import {DiagramsContext} from "./DiagramProvider";
import {ProjectContext} from "../projects/ProjectProvider";
import Drawer from "../../ui/components/Drawer";

const DiagramsPage = () => {
    const { id } = useParams(); // Extract project ID from URL params
    const { findProjectById } = useContext(ProjectContext);
    const { findDiagramsByProjectId, addDiagram } = useContext(DiagramsContext);

    const project = findProjectById(id)
    const projectDiagrams = findDiagramsByProjectId(id);

    const [showRightPanel, setShowRightPanel] = useState(false);
    const [formData, setFormData] = useState({id: '', projectId: id, name: '', description: '', type: ''});

    const handleAddDiagram = () => {
        setShowRightPanel(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission (e.g., send data to backend)
        console.log('Form submitted:', formData);
        // Add the new project to the projects list
        addDiagram(formData);
        // Reset form data
        setFormData({id: '', projectId: id, name: '', description: '', type: ''});
        // Close the drawer
        setShowRightPanel(false);
    };

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="p-6">
            <Card className="mb-2">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.name}
                </h5>
                <p>Description: {project.description}</p>
            </Card>
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Diagrams</h1>
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleAddDiagram}>Add Diagram
                </button>

            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Diagram name</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Created At</Table.HeadCell>
                    <Table.HeadCell>Updated At</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Board</span>
                        <span className="sr-only">Edit</span>
                        <span className="sr-only">Remove</span>
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
                                    <Button color="green"><a href={"/projects/" + diagram.projectId + "/diagrams/" + diagram.id + "/board"}>Board</a></Button>
                                    <Button color="blue">Edit</Button>
                                    <Button color="red">Remove</Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table>

            <Drawer isOpen={showRightPanel} setIsOpen={setShowRightPanel} header="Create Diagram">
                <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="diagramName"
                                   className="text-sm font-medium text-gray-900 dark:text-white">
                                Diagram Name
                            </label>
                        </div>
                        <TextInput
                            id="diagramName"
                            placeholder="Enter diagram name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="diagramDescription"
                                   className="text-sm font-medium text-gray-900 dark:text-white">
                                Diagram Description
                            </label>
                        </div>
                        <Textarea
                            id="diagramDescription"
                            placeholder="Enter diagram description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows={3}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="diagramType"
                                   className="text-sm font-medium text-gray-900 dark:text-white">
                                Diagram Type
                            </label>
                        </div>
                        <Select id="diagramType" value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}>
                            <option value="event-storming-big-picture">Event Storming Big Picture</option>
                            <option value="event-storming-design-level">Event Storming Design Level</option>
                            <option value="event-modeling">Event Modeling</option>
                            <option value="specification-by-example">Specification by Example</option>
                        </Select>
                    </div>
                    <div className="w-full">
                        <Button type="submit">Create Diagram</Button>
                    </div>
                </form>
            </Drawer>
        </div>
    );
};

export default DiagramsPage;
