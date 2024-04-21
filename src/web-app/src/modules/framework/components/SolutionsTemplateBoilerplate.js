import {Card} from "flowbite-react";
import DirectoryTreeView from "./DirectoryTreeView";
import ReadOnlyFileEditor from "./ReadOnlyFileEditor";
import {useState} from "react";
import folderStructureJava from "./layered-architecture-java.json";
import filesContentJava from "./layered-architecture-code-java.json";
import folderStructureDotNetCore from "./layered-architecture-dot-net-core.json";
import filesContentDotNetCore from "./layered-architecture-code-dot-net-core.json";
import folderStructureTypescript from "./layered-architecture-typescript.json";
import filesContentTypescript from "./layered-architecture-code-typescript.json";

const SolutionsTemplateBoilerplate = () => {
    const [selectedFileName, setSelectedFileName] = useState();
    const onNodeSelected = (node) => {
        setSelectedFileName(node.element.name)
    }
    return (<>
            <div className="flex justify-between gap-2 mb-2">
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Layered Architecture Solution Template Boilerplate - Java
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureJava} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentJava} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Layered Architecture Solution Template Boilerplate - .NET Core
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureDotNetCore} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentDotNetCore} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Layered Architecture Solution Template Boilerplate - Typescript
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureTypescript} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentTypescript} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex justify-between gap-2 mb-2">
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Onion/Clean Architecture Solution Template Boilerplate - Java
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureJava} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentJava} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Onion/Clean Architecture Solution Template Boilerplate - .NET Core
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureDotNetCore} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentDotNetCore} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Onion/Clean Architecture Solution Template Boilerplate - Typescript
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureTypescript} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentTypescript} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex justify-between gap-2 mb-2">
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Port & Adapter Architecture Solution Template Boilerplate - Java
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureJava} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentJava} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Port & Adapter Architecture Solution Template Boilerplate - .NET Core
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureDotNetCore} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentDotNetCore} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
                <Card className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Port & Adapter Architecture Solution Template Boilerplate - Typescript
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <DirectoryTreeView folder={folderStructureTypescript} onNodeSelected={onNodeSelected}/>
                        </div>
                        <div style={{width: '76%'}}>
                            <ReadOnlyFileEditor files={filesContentTypescript} fileName={selectedFileName}/>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
export default SolutionsTemplateBoilerplate;