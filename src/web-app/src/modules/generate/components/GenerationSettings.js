import {Label, Radio} from "flowbite-react";
import React from "react";

const Generationsettings = () => <>
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Choose solution generation settings:
    </h5>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetSolution">
                Target Solution
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="greenfield" name="targetSolution" value="Greenfield"/>
                <Label htmlFor="greenfield">Greenfield</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="integration" name="targetSolution" value="Integration"/>
                <Label htmlFor="integration">Integration</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetIntegrationPlatform">
                Target Integration Platform (Finance Domain)
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="oracle-ebs" name="targetIntegrationPlatform" value="Oracle EBS"/>
                <Label htmlFor="oracle-ebs">Oracle EBS</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="sap" name="targetIntegrationPlatform" value="SAP"/>
                <Label htmlFor="sap">SAP</Label>
            </div>
        </div>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetPlatform">
                Target Platform
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="jvm" name="targetPlatform" value="JVM"/>
                <Label htmlFor="jvm">JVM</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">.NET</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetLanguage">
                Target Language
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="java" name="targetLanguage" value="Java"/>
                <Label htmlFor="java">Java</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                <Label htmlFor="kotlin">Kotlin</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="c-sharp" name="targetLanguage" value="C#"/>
                <Label htmlFor="c-sharp">C#</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="f-sharp" name="targetLanguage" value="F#"/>
                <Label htmlFor="f-sharp">F#</Label>
            </div>
        </div>
    </div>
    <div className="mb-4">

    </div>

</>

export default Generationsettings;