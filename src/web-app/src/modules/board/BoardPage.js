import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Accordion, Button, Sidebar} from 'flowbite-react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useEdgesState,
    useNodesState,
    Position
} from 'react-flow-renderer';
import PaletteItem from "./components/PaletteItem";
import {v4 as uuidv4} from "uuid";
import {useParams} from "react-router-dom";
import CustomNode from "./components/CustomNode";
import AIChatDialog from "./components/AIChatDialog";
import {BoardsContext} from "./BoardProvider";
import {DiagramsContext} from "../diagrams/DiagramProvider";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { saveAs } from 'file-saver';

const nodeTypes = {custom: (props) => <CustomNode {...props}/>};

// we define the nodeTypes outside of the component to prevent re-renderings
function BoardPage() {
    const {id} = useParams();
    const {saveFlowModel, findBoardById} = useContext(BoardsContext);
    const {findDiagramById} = useContext(DiagramsContext);
    const [diagramCode, setDiagramCode] = useState('');
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeName, setNodeName] = useState();
    const diagram = findDiagramById(id);

    useEffect(() => {
        const storedModel = findBoardById(id);
        if (storedModel) {
            const {nodes, edges} = storedModel;
            setNodes(nodes);
            setEdges(edges);
            setDiagramCode(JSON.stringify(nodes, undefined, 2))
        }
    }, [setNodes, setEdges]);


    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onInit = useCallback((instance) => setReactFlowInstance(instance), []);

    const onPaletteItemDoubleClick = (event, element) => {
        if (element.type === 'customNode') {
            const newNodeId = uuidv4();
            setNodes((nodes) =>
                nodes.concat({
                    id: newNodeId,
                    type: "custom",
                    height: '30px',
                    data: {label: element.label, color: element.color},
                    position: {x: event.clientX - 100, y: event.clientY - 50},
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,
                    style: {backgroundColor: element.color},
                })
            );
            saveFlowModel(id, nodes, edges);
            setDiagramCode(JSON.stringify(nodes, undefined, 2))
        }
    };

    const handleDiagramCodeChange = (event) => {
        setDiagramCode(event.target.value);
        try {
            const parsedFlow = JSON.parse(event.target.value);
            setNodes(parsedFlow.board.nodes);
            setEdges([]);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    const handleSaveDiagramAsCodeChange = async () => {
        const defaultPath = localStorage.getItem('workspace-path') + "/domain-context-"+ diagram.type +".json";
        const from = localStorage.getItem('from');
        window.postMessage({type: "createFile", filePath: "/domain-context-"+ diagram.type +".json", fileContent: diagramCode}, '*');

        if(from) {
            var file = new File([diagramCode], defaultPath, {type: "text/plain;charset=utf-8"});
            saveAs(file);
        } else {
            try {
                const opts = {
                    suggestedName: defaultPath
                };
                const handle = await window.showSaveFilePicker(opts);
                const writableStream = await handle.createWritable();
                await writableStream.write(diagramCode);
                await writableStream.close();
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('File save operation aborted by the user.');
                } else {
                    console.error('Error saving file:', error);
                }
            }
        }
    };

    return (
        <div className="flex h-full">
            <div className="w-64 bg-gray-800 text-white">
                <Sidebar>
                    <Sidebar.Logo href="#" img="" className="tracking-tight text-gray-900 dark:text-white">
                        {diagram.type === 'specification-by-example' ? 'BDD' : 'Event Modeling'} Palette
                    </Sidebar.Logo>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            {diagram.type === 'specification-by-example' ? <>
                                <PaletteItem id="given" label="Given" color="#bf9000" onDoubleClick={onPaletteItemDoubleClick}/>
                                <PaletteItem id="when" label="When" color="#1e88e5" onDoubleClick={onPaletteItemDoubleClick}/>
                                <PaletteItem id="given" label="Then" color="#ff9800" onDoubleClick={onPaletteItemDoubleClick}/>
                            </> : <>
                                <PaletteItem id="event" label="Event" color="#ff9800" onDoubleClick={onPaletteItemDoubleClick}/>
                                <PaletteItem id="command" label="Commad" color="#1e88e5" onDoubleClick={onPaletteItemDoubleClick}/>
                                <PaletteItem id="query" label="Query" color="#6aa84f" onDoubleClick={onPaletteItemDoubleClick}/>
                                <PaletteItem id="aggrigate" label="Aggrigate" color="#bf9000" onDoubleClick={onPaletteItemDoubleClick}/>
                                <PaletteItem id="actor" label="Actor" color="#F7C93F" onDoubleClick={onPaletteItemDoubleClick}/>
                                <PaletteItem id="policy" label="Policy" color="#CB73FC" onDoubleClick={onPaletteItemDoubleClick}/></> }
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>

            <div className="flex-grow bg-gray-100 relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={onInit}
                    className="h-full"
                    snapToGrid={true}
                    snapGrid={[15, 15]}
                    nodeTypes={nodeTypes}
                >
                    <MiniMap
                        nodeColor={(node) => {
                            switch (node.type) {
                                case 'input':
                                    return '#ff9800';
                                case 'custom':
                                    return node.data.color;
                                default:
                                    return '#eee';
                            }
                        }}
                    />
                    <Controls/>
                    <Background color="#aaa" gap={16}/>
                </ReactFlow>
            </div>

            <div className="w-64 bg-gray-800 text-white h-screen">
                <Sidebar>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Accordion>
                                <Accordion.Panel>
                                    <Accordion.Title>Diagram as Code</Accordion.Title>
                                    <Accordion.Content>
                                        <Button className="aling-right mb-2" onClick={handleSaveDiagramAsCodeChange}>Save</Button>
                                        <CodeEditor
                                            value={diagramCode}
                                            language="json"
                                            placeholder="type code here or diagram code will generated here"
                                            onChange={handleDiagramCodeChange}
                                            padding={15}
                                            rows={50}
                                            style={{
                                                backgroundColor: "#333",
                                                maxHeight: "100%",
                                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
                                            }}
                                        />
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>Prompt AI</Accordion.Title>
                                    <Accordion.Content>
                                        <AIChatDialog/>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </div>
    );
}

export default BoardPage;