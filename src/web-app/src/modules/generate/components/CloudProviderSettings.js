import {Label, Radio} from "flowbite-react";
import React from "react";

const CloudProviderSettings = ({settings, setSettings}) => <>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetCloudSettings">
                Target Cloud Type
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="private-vps" name="targetCloudSettings" value="Private VPS"
                       onChange={e => setSettings({...settings, targetCloudSettings: e.target.id})}/>
                <Label htmlFor="private-vps">Private VPS</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="private-cloud" name="targetCloudSettings" value="Private Cloud"
                       onChange={e => setSettings({...settings, targetCloudSettings: e.target.id})}/>
                <Label htmlFor="private-cloud">Private Cloud</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="public-cloud" name="targetCloudSettings" value="Public Cloud"
                       onChange={e => setSettings({...settings, targetCloudSettings: e.target.id})}/>
                <Label htmlFor="public-cloud">Public Cloud</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="hybrid-cloud" name="targetCloudSettings" value="Hybrid Cloud"
                       onChange={e => setSettings({...settings, targetCloudSettings: e.target.id})}/>
                <Label htmlFor="hybrid-cloud">Hybrid Cloud</Label>
            </div>
        </div>
        {settings.targetCloudSettings !== 'private-vps' && <div style={{width: '48%'}}>
            <Label htmlFor="targetCloudProviderSettings">
                Target Cloud Provide
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="azure-cloud" name="targetCloudProviderSettings" value="Microsoft Azure Cloud"
                       onChange={e => setSettings({...settings, targetCloudProviderSettings: e.target.id})}/>
                <Label htmlFor="azure-cloud">Microsoft Azure Cloud</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="amazon-cloud" name="targetCloudProviderSettings" value="Amazon Cloud"
                       onChange={e => setSettings({...settings, targetCloudProviderSettings: e.target.id})}/>
                <Label htmlFor="amazon-cloud">Amazon Cloud</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="google-cloud" name="targetCloudProviderSettings" value="Google Cloud"
                       onChange={e => setSettings({...settings, targetCloudProviderSettings: e.target.id})}/>
                <Label htmlFor="google-cloud">Google Cloud</Label>
            </div>
        </div>}
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetCloudInfrasAsCodeSettings">
                Target Cloud Infrastructure as Code
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="terraform" name="targetCloudInfraAsCodeSettings" value="Terraform"
                       onChange={e => setSettings({...settings, targetCloudInfraAsCodeSettings: e.target.id})}/>
                <Label htmlFor="terraform">Terraform</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="ansible" name="targetCloudInfraAsCodeSettings" value="Ansible"
                       onChange={e => setSettings({...settings, targetCloudInfraAsCodeSettings: e.target.id})}/>
                <Label htmlFor="ansible">Ansible</Label>
            </div>

            {settings.targetCloudProviderSettings === 'azure-cloud' && <div className="flex items-center gap-2">
                <Radio id="azure-bicep" name="targetCloudInfraAsCodeSettings" value="Azure Bicep"
                       onChange={e => setSettings({...settings, targetCloudInfraAsCodeSettings: e.target.id})}/>
                <Label htmlFor="azure-bicep">Azure Bicep</Label>
            </div>}
        </div>
    </div>
</>

export default CloudProviderSettings;