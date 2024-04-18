import {Label, Radio} from "flowbite-react";
import React from "react";

const ClientSideSettings = ({settings, setSettings}) => <>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetClientPlatformTypeSettings">
                Target Client Platform Type
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="web" name="targetClientPlatformTypeSettings" value="Web"
                       onChange={e => setSettings({...settings, targetClientPlatformTypeSettings: e.target.id})}/>
                <Label htmlFor="web">Web</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="mobile" name="targetClientPlatformTypeSettings" value="Mobile"
                       onChange={e => setSettings({...settings, targetClientPlatformTypeSettings: e.target.id})}/>
                <Label htmlFor="mobile">Mobile</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="desktop" name="targetClientPlatformTypeSettings" value="Desktop"
                       onChange={e => setSettings({...settings, targetClientPlatformTypeSettings: e.target.id})}/>
                <Label htmlFor="desktop">Desktop</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetClientPlatformSettings">
                Target Client Platform
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="azure-cloud" name="targetClientPlatformSettings" value="Microsoft Azure Cloud"
                       onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                <Label htmlFor="azure-cloud">React JS</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="amazon-cloud" name="targetClientPlatformSettings" value="Amazon Cloud"
                       onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                <Label htmlFor="amazon-cloud">Angular</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="google-cloud" name="targetClientPlatformSettings" value="Google Cloud"
                       onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                <Label htmlFor="google-cloud">Vue JS</Label>
            </div>
        </div>
    </div>
</>

export default ClientSideSettings;