import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card, Table, Tabs, FooterIcon, Progress, Badge, Label, Select, Radio} from "flowbite-react";
import {ProjectContext} from "../projects/ProjectProvider";
import {DiagramsContext} from "../diagrams/DiagramProvider";
import CodeEditor from '@uiw/react-textarea-code-editor';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

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
        navigate("/projects");
    }const [yamlValue, setYAMLValue] = useState('openapi: 3.0.0\n' +
        'info:\n' +
        '  title: Todo API\n' +
        '  description: Odeev Kata PoC Todo APIs\n' +
        '  version: 1.0.0\n' +
        'servers:\n' +
        '  - url: https://api.example.com/v1\n' +
        'paths:\n' +
        '  /todos:\n' +
        '    get:\n' +
        '      summary: Retrieve all Todo items\n' +
        '      operationId: getTodos\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: A list of Todo items\n' +
        '          content:\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                type: array\n' +
        '                items:\n' +
        '                  $ref: \'#/components/schemas/Todo\'\n' +
        '    post:\n' +
        '      summary: Create a new Todo item\n' +
        '      operationId: createTodo\n' +
        '      requestBody:\n' +
        '        required: true\n' +
        '        content:\n' +
        '          application/json:\n' +
        '            schema:\n' +
        '              $ref: \'#/components/schemas/NewTodo\'\n' +
        '      responses:\n' +
        '        \'201\':\n' +
        '          description: The created Todo item\n' +
        '          content:\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Todo\'\n' +
        'components:\n' +
        '  schemas:\n' +
        '    Todo:\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        id:\n' +
        '          type: integer\n' +
        '          format: int64\n' +
        '          description: The unique identifier for the Todo item\n' +
        '        title:\n' +
        '          type: string\n' +
        '          description: The title of the Todo item\n' +
        '        description:\n' +
        '          type: string\n' +
        '          description: The description of the Todo item\n' +
        '        completed:\n' +
        '          type: boolean\n' +
        '          description: Indicates if the Todo item is completed\n' +
        '      required:\n' +
        '        - title\n' +
        '    NewTodo:\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        title:\n' +
        '          type: string\n' +
        '          description: The title of the new Todo item\n' +
        '        description:\n' +
        '          type: string\n' +
        '          description: The description of the new Todo item\n' +
        '      required:\n' +
        '        - title\n');

    const handleYAMLChange = (newValue) => {
        setYAMLValue(newValue);
    };

    const HistoryTab = () => {
        const [changeHistory, setChangeHistory] = useState([
            { id: 1, date: '2024-04-16', user: 'User 1', change: 'Added feature X' },
            { id: 2, date: '2024-04-17', user: 'User 2', change: 'Fixed issue Y' },
            { id: 3, date: '2024-04-18', user: 'User 1', change: 'Updated component Z' },
        ]);
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>User</th>
                    <th>Change</th>
                </tr>
                </thead>
                <tbody>
                {changeHistory.map((change) => (
                    <tr key={change.id}>
                        <td>{change.id}</td>
                        <td>{change.date}</td>
                        <td>{change.user}</td>
                        <td>{change.change}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    };
    const CompareTab = () => {
        const [changeHistory, setChangeHistory] = useState([
            { id: 1, date: '2024-04-16', user: 'User 1', change: 'Added feature X' },
            { id: 2, date: '2024-04-17', user: 'User 2', change: 'Fixed issue Y' },
            { id: 3, date: '2024-04-18', user: 'User 1', change: 'Updated component Z' },
        ]);
        return (
            <div><p>Compere & Merge Changes</p></div>
        );
    };
    return (
        <div className="p-6">
            <Card>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '48%'}}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {project.name}
                        </h5>
                        <p>Description: {project.description}</p>

                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Ready to be generated
                        </h5>
                        <div className="flex items-center gap-2 mb-4">
                            <FooterIcon icon="check-circle" className="text-green-500"/>
                            <span className="text-gray-700">Require: At least One Bottom Up Design</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <FooterIcon icon="check-circle" className="text-green-500"/>
                            <span className="text-gray-700">Require: At least One Specification by Example design for Acceptance Tests</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <FooterIcon icon="check-circle" className="text-green-500"/>
                            <span className="text-gray-700">Require: At least One Top Down Design</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <FooterIcon icon="x-circle" className="text-red-500"/>
                            <span className="text-gray-700">Require: Specific Target Platform</span>
                        </div>

                        <Progress progress={50} className="mb-4"/>

                        <div className="">
                            <Badge color="danger">Not Ready</Badge>
                        </div>
                    </div>
                    <div style={{width: '48%'}}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Choose solution generation settings:
                        </h5>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{width: '48%'}}>
                                <Label htmlFor="targetSolution">
                                    Target Solution
                                </Label>

                                <div className="flex items-center gap-2">
                                    <Radio id="greenfield" name="targetSolution" value="Greenfield"/>
                                    <Label htmlFor="greenfield">Greenfield</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Radio id="integration" name="targetSolution" value="Integration"/>
                                    <Label htmlFor="integration">Integration</Label>
                                </div>
                            </div>
                            <div style={{width: '48%'}}>
                                <Label htmlFor="targetIntegrationPlatform">
                                    Target Integration Platform (Finance Domain)
                                </Label>

                                <div className="flex items-center gap-2">
                                    <Radio id="oracle-ebs" name="targetIntegrationPlatform" value="Oracle EBS"/>
                                    <Label htmlFor="oracle-ebs">Oracle EBS</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Radio id="sap" name="targetIntegrationPlatform" value="SAP"/>
                                    <Label htmlFor="sap">SAP</Label>
                                </div>
                            </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{width: '48%'}}>
                                <Label htmlFor="targetPlatform">
                                    Target Platform
                                </Label>

                                <div className="flex items-center gap-2">
                                    <Radio id="jvm" name="targetPlatform" value="JVM"/>
                                    <Label htmlFor="jvm">JVM</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                                    <Label htmlFor="dot-net">.NET</Label>
                                </div>
                            </div>
                            <div style={{width: '48%'}}>
                                <Label htmlFor="targetLanguage">
                                    Target Language
                                </Label>

                                <div className="flex items-center gap-2">
                                    <Radio id="java" name="targetLanguage" value="Java"/>
                                    <Label htmlFor="java">Java</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                                    <Label htmlFor="kotlin">Kotlin</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio id="c-sharp" name="targetLanguage" value="C#"/>
                                    <Label htmlFor="c-sharp">C#</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio id="f-sharp" name="targetLanguage" value="F#"/>
                                    <Label htmlFor="f-sharp">F#</Label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">

                        </div>
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
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{width: '48%'}}>
                                <CodeEditor
                                    value={yamlValue}
                                    language="yaml"
                                    placeholder="Please enter OpenAPI Specification here."
                                    onChange={(evn) => setYAMLValue(evn.target.value)}
                                    padding={15}
                                    style={{
                                        backgroundColor: "#f5f5f5",
                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
                                    }}
                                />
                            </div>
                            <div style={{width: '48%'}}>
                                <SwaggerUI spec={yamlValue} />
                            </div>
                        </div>
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
