// ProjectsPage.js
import React, {useContext, useState} from 'react';
import {Modal, Button, Table, Select, TextInput, Textarea, Checkbox, ButtonGroup} from 'flowbite-react';
import {ProjectContext} from "./ProjectProvider";

const ProjectsPage = () => {
    const [showRightPanel, setShowRightPanel] = useState(false);
    const { addProject, projects } = useContext(ProjectContext);
    const [formData, setFormData] = useState({id: '', name: '', description: '', tags: '', teamMembers: ''});

    const handleAddProject = () => {
        setShowRightPanel(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission (e.g., send data to backend)
        console.log('Form submitted:', formData);
        // Add the new project to the projects list
        addProject(formData);
        // Reset form data
        setFormData({id: '', name: '', description: '', tags: '', teamMembers: ''});
        // Close the drawer
        setShowRightPanel(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleAddProject}>Add Project
                </button>

            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Project name</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Tags</Table.HeadCell>
                    <Table.HeadCell>Teams</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                        <span className="sr-only">Remove</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {projects.map((project, index) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <a href={"projects/" + project.id + "/diagrams"}> {project.name} </a></Table.Cell>
                            <Table.Cell>{project.description}</Table.Cell>
                            <Table.Cell>{project.tags}</Table.Cell>
                            <Table.Cell>{project.teamMembers}</Table.Cell>
                            <Table.Cell>
                                <div className="flex flex-wrap gap-2">
                                    <Button color="blue">Edit</Button>
                                    <Button color="red">Remove</Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table>

            <Modal
                show={showRightPanel}
                onClose={() => setShowRightPanel(false)}
                size="md"
                popup={true}
                position="fixed"
                className={`
          transition-all duration-300 ease-in-out
          fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-lg
          ${showRightPanel
                    ? 'translate-x-0'
                    : 'translate-x-full'
                }
          right-0
          transform
          translate-x-full
          md:translate-x-0
        `}
            >
                <div className="h-full flex flex-col">
                    <Modal.Header>
                        <h5 className="text-xl font-semibold text-gray-500 dark:text-white">
                            Create Project
                        </h5>
                    </Modal.Header>
                    <Modal.Body className="flex-grow overflow-y-auto">
                        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="projectName" className="text-sm font-medium text-gray-900 dark:text-white">
                                        Project Name
                                    </label>
                                </div>
                                <TextInput
                                    id="projectName"
                                    placeholder="Enter project name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="projectDescription" className="text-sm font-medium text-gray-900 dark:text-white">
                                        Project Description
                                    </label>
                                </div>
                                <Textarea
                                    id="projectDescription"
                                    placeholder="Enter project description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    required={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="projectTags" className="text-sm font-medium text-gray-900 dark:text-white">
                                        Project Tags
                                    </label>
                                </div>
                                <TextInput
                                    id="projectTags"
                                    placeholder="Enter project tags"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    required={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="projectTeams" className="text-sm font-medium text-gray-900 dark:text-white">
                                        Project Teams
                                    </label>
                                </div>
                                <Select
                                    id="projectTeams"
                                    value={formData.teamMembers}
                                    onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                                    multiple={true}
                                >
                                    <option value="team1">Team 1</option>
                                    <option value="team2">Team 2</option>
                                    <option value="team3">Team 3</option>
                                </Select>
                            </div>
                            <div className="w-full">
                                <Button type="submit">Create Project</Button>
                            </div>
                        </form>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    );
};

export default ProjectsPage;
