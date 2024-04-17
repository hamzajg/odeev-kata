import React, {useState} from "react";
import {Table} from "flowbite-react";

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

export default HistoryTab;