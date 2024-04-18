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
            // Update existing board
            const updatedBoards = [...boards];
            updatedBoards[existingBoardIndex] = {
                ...updatedBoards[existingBoardIndex],
                ...newBoard,
                updatedAt: new Date().toISOString()
            };
            setBoards(updatedBoards);
        } else {
            // Add new board
            newBoard.createdAt = new Date().toISOString();
            newBoard.updatedAt = new Date().toISOString();
            setBoards([...boards, newBoard]);
        }
    };

    const findBoardById = (id) => {
        return boards.find(board => board.id === id);
    }

    const generateJsonModel = (id, nodes, edges) => {
        const model = {
            id: id,
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

    const saveFlowModel = (id, nodes, edges) => {
        const model = {
            id: id,
            nodes: nodes,
            edges: edges,
        };
        generateJsonModel(id, nodes, edges);
        addOrUpdateBoard(model);
    };

    const handleSaveDiagramAsCodeChange = async (diagram, diagramCode) => {
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