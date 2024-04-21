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
            {(!settings.targetClientPlatformTypeSettings || settings.targetClientPlatformTypeSettings === 'web') && <>
                <div className="flex items-center gap-2">
                    <Radio id="javascript" name="targetClientPlatformSettings" value="React JS"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="javascript">React JS</Label>
                </div>

                <div className="flex items-center gap-2">
                    <Radio id="typescript-fetch" name="targetClientPlatformSettings" value="Angular"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="typescript-fetch">Angular</Label>
                </div>

                <div className="flex items-center gap-2">
                    <Radio id="vue-js" name="targetClientPlatformSettings" value="Vue JS"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="vue-js">Vue JS</Label>
                </div>
            </>}
            {settings.targetClientPlatformTypeSettings === 'mobile' && <>
                <div className="flex items-center gap-2">
                    <Radio id="android" name="targetClientPlatformSettings" value="Android"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="android">Android</Label>
                </div>

                <div className="flex items-center gap-2">
                    <Radio id="ios" name="targetClientPlatformSettings" value="iOS"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="ios">iOS</Label>
                </div>

                <div className="flex items-center gap-2">
                    <Radio id="react-native" name="targetClientPlatformSettings" value="React Native (Cross Platform)"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="vue-js">React Native (Cross Platform)</Label>
                </div>

                <div className="flex items-center gap-2">
                    <Radio id="flutter" name="targetClientPlatformSettings" value="Flutter (Cross Platfrom)"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="flutter">Flutter</Label>
                </div>
            </>}
            {settings.targetClientPlatformTypeSettings === 'desktop' && <>
                <div className="flex items-center gap-2">
                    <Radio id="java-fx" name="targetClientPlatformSettings" value="Java FX"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="java-fx">Java FX</Label>
                </div>

                <div className="flex items-center gap-2">
                    <Radio id="microsoft-uwp" name="targetClientPlatformSettings" value=">Microsoft UWP"
                           onChange={e => setSettings({...settings, targetClientPlatformSettings: e.target.id})}/>
                    <Label htmlFor="microsoft-uwp">Microsoft UWP</Label>
                </div>
            </>}
        </div>
    </div>
</>

export default ClientSideSettings;