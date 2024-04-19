import React, { createContext, useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

const BoardsContext = createContext();

const BoardsProvider = ({ children }) => {
    const [boards, setBoards] = useState(() => {
        const savedBoards = localStorage.getItem('boards');
        return savedBoards ? JSON.parse(savedBoards) : [];
    });

    useEffect(() => {
        localStorage.setItem('boards', JSON.stringify(boards));
    }, [boards]);

    const addOrUpdateBoard = (newBoard) => {
        const existingBoardIndex = boards.findIndex(board => board.id === newBoard.id);
        if (existingBoardIndex !== -1) {
            const updatedBoards = [...boards];
            updatedBoards[existingBoardIndex] = {
                ...updatedBoards[existingBoardIndex],
                ...newBoard,
                updatedAt: new Date().toISOString()
            };
            setBoards(updatedBoards);
            putBoard({...updatedBoards[existingBoardIndex], nodes: JSON.stringify(updatedBoards[existingBoardIndex].nodes), edges: JSON.stringify(updatedBoards[existingBoardIndex].edges)})

        } else {
            newBoard.createdAt = new Date().toISOString();
            newBoard.updatedAt = new Date().toISOString();
            setBoards([...boards, newBoard]);
            postBoard({...newBoard, nodes: JSON.stringify(newBoard.nodes), edges: JSON.stringify(newBoard.edges)})
        }
    };

    const postBoard = async (newBoard) => {
        try {
            const response = await fetch('http://localhost:8081/boards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBoard),
            });

            if (response.ok) {
                console.error('Board added:');
            } else {
                console.error('Error adding board:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding board:', error);
        }
    }

    const putBoard = async (updatedBoard) => {
        try {
            const response = await fetch(`http://localhost:8081/boards/${updatedBoard.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBoard),
            });

            if (response.ok) {
                console.error('Board added:');
            } else {
                console.error('Error adding board:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding board:', error);
        }
    }

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await fetch('http://localhost:8081/boards');
                if (response.ok) {
                    const fetchedBoards = await response.json();
                    setBoards(fetchedBoards.map(board => ({
                        ...board,
                        nodes: JSON.parse(board.nodes),
                        edges: JSON.parse(board.edges),
                    })));
                } else {
                    console.error('Error fetching boards:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        };

        fetchBoards();
    }, []);

    const findBoardById = (id) => {
        return boards.find(board => board.id === id);
    }

    const generateJsonModel = (id, diagramId, nodes, edges) => {
        const model = {
            id: id,
            diagramId: diagramId,
            nodes: nodes.map(({ id, type, data, position, sourcePosition, targetPosition, style }) => ({
                id,
                type,
                label: data.label,
                color: data.color,
                x: position.x,
                y: position.y,
                source: sourcePosition,
                target: targetPosition,
                style: {
                    backgroundColor: style.backgroundColor,
                },
            })),
            edges: edges.map(({ id, source, target }) => ({ id, source, target })),
        };
    };

    const saveFlowModel = (id, diagramId, nodes, edges) => {
        const model = {
            id: id,
            diagramId: diagramId,
            nodes: nodes,
            edges: edges,
        };
        generateJsonModel(id, diagramId, nodes, edges);
        addOrUpdateBoard(model);
    };

    const handleSaveDiagramAsCodeChange = async (diagram, diagramCode) => {
        const workspacePath = localStorage.getItem('workspace-path');
        const defaultPath =  workspacePath + "/domain-context-"+ diagram.type +".json";
        window.postMessage({type: "createFile", filePath: "/domain-context-"+ diagram.type +".json", fileContent: diagramCode}, '*');

        if(!workspacePath) {
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
    const value = {
        boards,
        addOrUpdateBoard,
        findBoardById,
        generateJsonModel,
        saveFlowModel,
        handleSaveDiagramAsCodeChange
    };

    return <BoardsContext.Provider value={value}>{children}</BoardsContext.Provider>;

};

export { BoardsProvider, BoardsContext };