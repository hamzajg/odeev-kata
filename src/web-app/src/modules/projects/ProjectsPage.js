import React, {useContext, useState} from 'react';
import {Button, Table, TextInput, Textarea} from 'flowbite-react';
import {ProjectContext} from "./ProjectProvider";
import Drawer from "../../ui/components/Drawer";
import Multiselect from 'multiselect-react-dropdown';
import {TeamContext} from "../teams/TeamsProvider";

const ProjectsPage = () => {
    const [showRightPanel, setShowRightPanel] = useState(false);
    const {addProject, projects} = useContext(ProjectContext);
    const {teams} = useContext(TeamContext);
    const [formData, setFormData] = useState({id: '', name: '', description: '', tags: [], teamMembers: []});
    const tags = [{name: "DDD", id: 1}, {name: "Clean Architecture", id: 2}]
    const handleAddProject = () => {
        setShowRightPanel(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        addProject(formData);
        setFormData({id: '', name: '', description: '', tags: [], teamMembers: []});
        setShowRightPanel(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Button color="blue" onClick={handleAddProject}>Add Project</Button>
            </div>

            <Table>
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
                            <Table.Cell>{project.tags.map(item => item.name + ", ")}</Table.Cell>
                            <Table.Cell>{project.teamMembers.map(item => item.name + ", ")}</Table.Cell>
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

            <Drawer isOpen={showRightPanel} setIsOpen={setShowRightPanel} header="Create Project">
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
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="projectDescription"
                                   className="text-sm font-medium text-gray-900 dark:text-white">
                                Project Description
                            </label>
                        </div>
                        <Textarea
                            id="projectDescription"
                            placeholder="Enter project description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                        <Multiselect
                            id="projectTeams"
                            options={tags}
                            displayValue="name"
                            selectedValues={formData.tags}
                            onSelect={(list, value) => setFormData({...formData, tags: [...formData.tags, value]})}/>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="projectTeams" className="text-sm font-medium text-gray-900 dark:text-white">
                                Project Teams
                            </label>
                        </div>

                        <Multiselect
                            id="projectTeams"
                            options={teams}
                            displayValue="name"
                            selectedValues={formData.teamMembers}
                            onSelect={(list, value) => setFormData({...formData, teamMembers: [...formData.teamMembers, value]})}/>
                    </div>
                    <div className="w-full">
                        <Button type="submit">Create Project</Button>
                    </div>
                </form>
            </Drawer>
        </div>
    );
};

export default ProjectsPage;
