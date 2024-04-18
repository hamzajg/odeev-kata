import React, {useContext, useState} from 'react';
import {Button, Table, TextInput, Textarea} from 'flowbite-react';
import Drawer from "../../ui/components/Drawer";
import {TeamContext} from "./TeamsProvider";
import Multiselect from 'multiselect-react-dropdown';

const TeamsPage = () => {
    const [showRightPanel, setShowRightPanel] = useState(false);
    const { addTeam, teams } = useContext(TeamContext);
    const [formData, setFormData] = useState({id: '', name: '', description: '', guild: '', members: []});

    const handleAddTeam = () => {
        setShowRightPanel(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        addTeam(formData);
        setFormData({id: '', name: '', description: '', guild: '', members: []});
        setShowRightPanel(false);
    };

    const options = [{name: "Hamza Jguerim", id: 1}, {name: "Joe Doe", id: 2}]

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Teams</h1>
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleAddTeam}>Add Team
                </button>

            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Team name</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Tribe/Guild</Table.HeadCell>
                    <Table.HeadCell>Members</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                        <span className="sr-only">Remove</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {teams.map((team, index) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {team.name} </Table.Cell>
                            <Table.Cell>{team.description}</Table.Cell>
                            <Table.Cell>{team.guild}</Table.Cell>
                            <Table.Cell>{team.members.map(item => item.name + ", ")}</Table.Cell>
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

            <Drawer isOpen={showRightPanel} setIsOpen={setShowRightPanel} header="Create Team">
                <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="teamName" className="text-sm font-medium text-gray-900 dark:text-white">
                                Team Name
                            </label>
                        </div>
                        <TextInput
                            id="teamName"
                            placeholder="Enter team name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="teamDescription" className="text-sm font-medium text-gray-900 dark:text-white">
                                Team Description
                            </label>
                        </div>
                        <Textarea
                            id="teamDescription"
                            placeholder="Enter team description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="teamGuild" className="text-sm font-medium text-gray-900 dark:text-white">
                                Team Tripe/Guild
                            </label>
                        </div>
                        <TextInput
                            id="teamGuild"
                            placeholder="Enter team tripe or guild name"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="teamMembers" className="text-sm font-medium text-gray-900 dark:text-white">
                                Team Members
                            </label>
                        </div>
                        <Multiselect
                            id="teamMembers"
                            options={options}
                            selectedValues={formData.members}
                            displayValue="name"
                            onSelect={(list, value) => setFormData({...formData, members: [...formData.members, value]})}/>
                    </div>
                    <div className="w-full">
                        <Button type="submit">Create Team</Button>
                    </div>
                </form>
            </Drawer>
        </div>
    );
};

export default TeamsPage;