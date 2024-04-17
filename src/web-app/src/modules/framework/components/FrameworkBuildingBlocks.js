import {Card} from "flowbite-react";
import DirectoryTreeView from "./DirectoryTreeView";
import ReadOnlyFileEditor from "./ReadOnlyFileEditor";
import {useState} from "react";

const FrameworkBuildingBlocks = () => {
    const [selectedFileName, setSelectedFileName] = useState();
    const onNodeSelected = (node) => {
        setSelectedFileName(node.element.name)
    }

    const folderStructure = {
        name: "framework-core",
        children: [
            {
                name: "src",
                children: [{ name: "index.js" }, { name: "styles.css" }],
            },
            {
                name: "node_modules",
                children: [
                    {
                        name: "react-accessible-treeview",
                        children: [{ name: "index.js" }],
                    },
                    { name: "react", children: [{ name: "index.js" }] },
                ],
            },
            {
                name: ".npmignore",
            },
            {
                name: "package.json",
            },
            {
                name: "webpack.config.js",
            },
        ],
    };

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}} className="mb-2">
            <div style={{width: '49%'}}>
                <Card>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Framework Core Building Blocks
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructure} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={[]} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
            </div>
            <div style={{width: '49%'}}>
                <Card>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Framework
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructure} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={[]} fileName={selectedFileName}/>
                        </div>
                    </div>

                </Card>
            </div>
        </div>
    )
}

export default FrameworkBuildingBlocks;