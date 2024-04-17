import React, {useState} from "react";
import {Handle} from "react-flow-renderer";

const CustomNode = ({ data }) => {
    const [labelText, setLabelText] = useState(data.label);

    const handleInputChange = (event) => {
        setLabelText(event.target.value);
    };

    return (
        <div className="m-2 bg-[#0077b6] rounded-md p-6 cursor-pointer flex justify-center items-center hover:bg-[#005b8d]"
             style={{
                 backgroundColor: data.color,
                 color: '#fff',
                 fontWeight: 'bold',
             }}
        >
            <Handle type="target" position="left" />
            <Handle type="target" position="top" />
            <input style={{ backgroundColor: "transparent", border: "none", outline: "none"}}
                type="text"
                value={labelText}
                       onChange={handleInputChange}
                className="text-white font-semibold"
            />
            <Handle type="source" position="right" />
            <Handle type="source" position="bottom" />
        </div>
    );
};

export default CustomNode;