import {Label, Radio} from "flowbite-react";
import React from "react";

const GenerationSettings = () => <>
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

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetPlatform">
                Target Architecture Style
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="jvm" name="targetPlatform" value="JVM"/>
                <Label htmlFor="jvm">Modular Monolith</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">Microservice</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetLanguage">
                Target Architecture Pattern
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="java" name="targetLanguage" value="Java"/>
                <Label htmlFor="java">Classic Layered Architecture</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                <Label htmlFor="kotlin">Onion/Clean Architecture</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="c-sharp" name="targetLanguage" value="C#"/>
                <Label htmlFor="c-sharp">Port & Adapter</Label>
            </div>
        </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetPlatform">
                Target Communication Protocol
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="jvm" name="targetPlatform" value="JVM"/>
                <Label htmlFor="jvm">HTTP</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">gRPC</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">Messaging</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetLanguage">
                Target CQRS Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="java" name="targetLanguage" value="Java"/>
                <Label htmlFor="java">Light CQRS (No Event Sourcing)</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                <Label htmlFor="kotlin">CQRS</Label>
            </div>
        </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetPlatform">
                Target Persistence Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="jvm" name="targetPlatform" value="JVM"/>
                <Label htmlFor="jvm">InMemory</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">Sql</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">NoSQl</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetLanguage">
                Target Persistence Technologies
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="java" name="targetLanguage" value="Java"/>
                <Label htmlFor="java">Event Store</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                <Label htmlFor="kotlin">MySQL</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                <Label htmlFor="kotlin">MongoDB</Label>
            </div>
        </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetPlatform">
                Target Deployment Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="jvm" name="targetPlatform" value="JVM"/>
                <Label htmlFor="jvm">Docker</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">k8s</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetLanguage">
                Target Messaging Technologies
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="java" name="targetLanguage" value="Java"/>
                <Label htmlFor="java">RabbitMQ</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                <Label htmlFor="kotlin">Apache Kafka</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                <Label htmlFor="kotlin">Microsoft Service Bus</Label>
            </div>
        </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetPlatform">
                Target Security Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="jvm" name="targetPlatform" value="JVM"/>
                <Label htmlFor="jvm">Open ID Connect</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">Auth0</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"/>
                <Label htmlFor="dot-net">Social Media</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetLanguage">
                Target Observability Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="java" name="targetLanguage" value="Java"/>
                <Label htmlFor="java">Monitoring</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="kotlin" name="targetLanguage" value="Kotlin"/>
                <Label htmlFor="kotlin">Health Check</Label>
            </div>
        </div>
    </div>
</>

export default GenerationSettings;