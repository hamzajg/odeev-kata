import React, {useContext, useState} from 'react';
import {Button, Table, TextInput, Textarea, Select} from 'flowbite-react';
import Drawer from "../../ui/components/Drawer";
import {Link} from "react-router-dom";
import {SolutionContext} from "./SolutionProvider";
import domains from "./Domains.json"

const SolutionsPage = () => {
    const [showRightPanel, setShowRightPanel] = useState(false);
    const {addSolution, solutions} = useContext(SolutionContext);
    const [formData, setFormData] = useState({id: '', name: '', description: '', domain: ''});
    const handleAddSolution = () => {
        setShowRightPanel(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        addSolution(formData);
        setFormData({id: '', name: '', description: '', domain: ''});
        setShowRightPanel(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Solutions</h1>
                <Button color="blue" onClick={handleAddSolution}>Add Solution</Button>
            </div>

            <Table>
                <Table.Head>
                    <Table.HeadCell>Solution name</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Domain</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {solutions.map((solution, index) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <Link to={"/solutions/" + solution.id + "/projects"}> {solution.name} </Link></Table.Cell>
                            <Table.Cell>{solution.description}</Table.Cell>
                            <Table.Cell>{domains.find(d => d.id == solution.domain).name}</Table.Cell>
                            <Table.Cell>
                                <div className="flex flex-wrap gap-2">
                                    <Button color="blue">Edit</Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Drawer isOpen={showRightPanel} setIsOpen={setShowRightPanel} header="Create Solution">
                <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="solutionName" className="text-sm font-medium text-gray-900 dark:text-white">
                                Solution Name
                            </label>
                        </div>
                        <TextInput
                            id="solutionName"
                            placeholder="Enter solution name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="solutionDescription"
                                   className="text-sm font-medium text-gray-900 dark:text-white">
                                Solution Description
                            </label>
                        </div>
                        <Textarea
                            id="solutionDescription"
                            placeholder="Enter solution description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows={3}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="projectTags" className="text-sm font-medium text-gray-900 dark:text-white">
                                Solution Domain
                            </label>
                        </div>
                        <Select
                            id="projectTeams"
                            required={true}
                            value={formData.domain}
                            onChange={e => setFormData({...formData, domain: e.target.value})}>
                            <option value="">Select Domain</option>
                            {domains.map((domain, key) => (
                                <option value={domain.id} key={key}>{domain.name}</option>
                            ))}
                        </Select>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
                        <Button type="submit">Create Solution</Button>
                    </div>
                </form>
            </Drawer>
        </div>
    );
};

export default SolutionsPage;
