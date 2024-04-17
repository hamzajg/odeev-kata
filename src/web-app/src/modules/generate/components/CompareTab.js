import React, {useState} from "react";

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
export default CompareTab;