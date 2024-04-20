import React, { createContext, useState, useEffect } from 'react';
import {BoardService} from "./BoardService";
import {Utilities} from "../../utilities/Utillties";

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
            BoardService.putBoard({...updatedBoards[existingBoardIndex], nodes: JSON.stringify(updatedBoards[existingBoardIndex].nodes), edges: JSON.stringify(updatedBoards[existingBoardIndex].edges)})

        } else {
            newBoard.createdAt = new Date().toISOString();
            newBoard.updatedAt = new Date().toISOString();
            setBoards([...boards, newBoard]);
            BoardService.postBoard({...newBoard, nodes: JSON.stringify(newBoard.nodes), edges: JSON.stringify(newBoard.edges)})
        }
    };

    useEffect(() => {
        BoardService.fetchBoards()
            .then(result =>
                setBoards(result.map(board => ({
                    ...board,
                    nodes: JSON.parse(board.nodes),
                    edges: JSON.parse(board.edges),
                }))));
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
        const defaultPath =  "domain-context-"+ diagram.type +".json";
        window.postMessage({type: "createFile", filePath: "/domain-context-"+ diagram.type +".json", fileContent: diagramCode}, '*');
        await Utilities.showSaveFilePickerFor(defaultPath, diagramCode)
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