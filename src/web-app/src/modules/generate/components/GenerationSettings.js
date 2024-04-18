import {Button, Tabs} from "flowbite-react";
import React, {useContext, useState} from "react";
import ServerSideSettings from "./ServerSideSettings";
import CloudProviderSettings from "./CloudProviderSettings";
import ClientSideSettings from "./ClientSideSettings";
import {SolutionContext} from "../../solutions/SolutionProvider";

const GenerationSettings = ({ project }) => {
    const [settings, setSettings] = useState({});
    const {handleSaveMetadata, handleGenerateProject} = useContext(SolutionContext);

    return (
        <>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Choose solution generation settings:
        </h5>
            <Tabs>
                <Tabs.Item title="Backend / Server Side">
                    <ServerSideSettings settings={settings} setSettings={setSettings} />
                </Tabs.Item>
                <Tabs.Item title="Frontend / Client Side">
                    <ClientSideSettings settings={settings} setSettings={setSettings} />
                </Tabs.Item>
                <Tabs.Item title="Cloud & Infrastructure as Code">
                    <CloudProviderSettings settings={settings} setSettings={setSettings} />
                </Tabs.Item>
            </Tabs>

            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}} className="gap-2">
                <Button onClick={e => handleGenerateProject(project, settings)}>Generate</Button>
                <Button onClick={e => handleSaveMetadata(project, settings)}>Save Metadata</Button>
            </div>
        </>
    )
}

export default GenerationSettings;