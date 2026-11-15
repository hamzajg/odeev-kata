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
        localStorage.setItem('boards', JSON.stringify(boards ?? []));
    }, [boards]);

    const addOrUpdateBoard = (newBoard) => {
        const existingBoard = boards.find(board => board.diagramId === newBoard.diagramId
            || board.id === newBoard.id);
        if (existingBoard) {
            const updatedBoard = {
                ...existingBoard,
                ...newBoard,
                id: existingBoard.id,
                updatedAt: new Date().toISOString()
            };
            setBoards(boards.map(board => board.id === existingBoard.id ? updatedBoard : board));
            BoardService.putBoard({...updatedBoard, nodes: JSON.stringify(updatedBoard.nodes), edges: JSON.stringify(updatedBoard.edges)})

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
                setBoards(result?.map(board => ({
                    ...board,
                    nodes: JSON.parse(board.nodes),
                    edges: JSON.parse(board.edges),
                }))));
    }, []);

    const findBoardById = (diagramId) => {
        return boards?.find(board => board.diagramId === diagramId || board.id === diagramId);
    }

    const generateJsonModel = (id, nodes, edges) => {
        return {
            id: id,
            nodes: nodes,
            edges: edges,
        };
    };

    const saveFlowModel = (diagramId, nodes, edges) => {
        const model = {
            diagramId: diagramId,
            nodes: nodes,
            edges: edges,
        };
        generateJsonModel(diagramId, nodes, edges);
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