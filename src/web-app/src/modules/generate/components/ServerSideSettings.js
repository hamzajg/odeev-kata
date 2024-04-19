import {Checkbox, Label, Radio} from "flowbite-react";
import React from "react";

const ServerSideSettings = ({settings, setSettings}) => <>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetSolutionType">
                Target Solution Type
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="greenfield" name="targetSolutionType" value="Greenfield"
                       onChange={e => setSettings({...settings, targetSolutionType: e.target.id})}/>
                <Label htmlFor="greenfield">Greenfield</Label>
            </div>

            <div className="flex items-center gap-2">
                <Radio id="integration" name="targetSolutionType" value="Integration"
                       onChange={e => setSettings({...settings, targetSolutionType: e.target.id})}/>
                <Label htmlFor="integration">Integration</Label>
            </div>
        </div>
        {settings.targetSolutionType === 'integration' && <div style={{width: '48%'}}>
            <Label htmlFor="targetIntegrationPlatform">
                Target Integration Platform (Finance Domain)
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="oracle-ebs" name="targetIntegrationPlatform" value="Oracle EBS"
                       onChange={e => setSettings({
                           ...settings,
                           targetIntegrationPlatform: e.target.id
                       })}/>
                <Label htmlFor="oracle-ebs">Oracle EBS</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="sap" name="targetIntegrationPlatform" value="SAP"
                       onChange={e => setSettings({
                           ...settings,
                           targetIntegrationPlatform: e.target.id
                       })}/>
                <Label htmlFor="sap">SAP</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="salesforce" name="targetIntegrationPlatform" value="Salesforce"
                       onChange={e => setSettings({
                           ...settings,
                           targetIntegrationPlatform: e.target.id
                       })}/>
                <Label htmlFor="salesforce">Salesforce</Label>
            </div>
        </div>}
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetPlatform">
                Target Platform
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="jvm" name="targetPlatform" value="JVM"
                       onChange={e => setSettings({...settings, targetPlatform: e.target.id})}/>
                <Label htmlFor="jvm">JVM</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="dot-net" name="targetPlatform" value=".NET"
                       onChange={e => setSettings({...settings, targetPlatform: e.target.id})}/>
                <Label htmlFor="dot-net">.NET</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="javascript" name="targetPlatform" value="Javascript"
                       onChange={e => setSettings({...settings, targetPlatform: e.target.id})}/>
                <Label htmlFor="javascript">Javascript</Label>
            </div>
        </div>
        {settings.targetPlatform && <div style={{width: '48%'}}>
            <Label htmlFor="targetLanguage">
                Target Language
            </Label>
            {settings.targetPlatform === "jvm" && <>
                <div className="flex items-center gap-2">
                    <Radio id="java" name="targetLanguage" value="Java"
                           onChange={e => setSettings({...settings, targetLanguage: e.target.id})}/>
                    <Label htmlFor="java">Java</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="kotlin" name="targetLanguage" value="Kotlin"
                           onChange={e => setSettings({...settings, targetLanguage: e.target.id})}/>
                    <Label htmlFor="kotlin">Kotlin</Label>
                </div>
            </>}
            {settings.targetPlatform === "dot-net" && <>
                <div className="flex items-center gap-2">
                    <Radio id="c-sharp" name="targetLanguage" value="C#"
                           onChange={e => setSettings({...settings, targetLanguage: e.target.id})}/>
                    <Label htmlFor="c-sharp">C#</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="f-sharp" name="targetLanguage" value="F#"
                           onChange={e => setSettings({...settings, targetLanguage: e.target.id})}/>
                    <Label htmlFor="f-sharp">F#</Label>
                </div>
            </>}
            {settings.targetPlatform === "javascript" && <>
                <div className="flex items-center gap-2">
                    <Radio id="c-sharp" name="targetLanguage" value="Javascript"
                           onChange={e => setSettings({...settings, targetLanguage: e.target.id})}/>
                    <Label htmlFor="c-sharp">Javascript</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="typescript" name="targetLanguage" value="Typescript"
                           onChange={e => setSettings({...settings, targetLanguage: e.target.id})}/>
                    <Label htmlFor="typescript">Typescript</Label>
                </div>
            </>}
        </div>}
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetLanguageStyle">
                Target Language Style
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="imperative" name="targetLanguageStyle" value="Imperative"
                       onChange={e => setSettings({...settings, targetLanguageStyle: e.target.id})}/>
                <Label htmlFor="imperative">Imperative</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="declarative" name="targetLanguageStyle" value="Declarative"
                       onChange={e => setSettings({...settings, targetLanguageStyle: e.target.id})}/>
                <Label htmlFor="declarative">Declarative</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="reactive" name="targetLanguageStyle" value="Reactive"
                       onChange={e => setSettings({...settings, targetLanguageStyle: e.target.id})}/>
                <Label htmlFor="reactive">Reactive</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetConcurrencyModel">
                Target Concurrency Model
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="multithreading" name="targetConcurrencyModel" value="Multithreading"
                       onChange={e => setSettings({...settings, targetConcurrencyModel: e.target.id})}/>
                <Label htmlFor="multithreading">Multithreading</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="actor-model" name="targetConcurrencyModel" value="Actor Model"
                       onChange={e => setSettings({...settings, targetConcurrencyModel: e.target.id})}/>
                <Label htmlFor="actor-model">Actor Model</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="parallel" name="targetConcurrencyModel" value="Parallel"
                       onChange={e => setSettings({...settings, targetConcurrencyModel: e.target.id})}/>
                <Label htmlFor="parallel">Parallel</Label>
            </div>
        </div>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetArchitectureStyle">
                Target Architecture Style
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="modular-monolith" name="targetArchitectureStyle" value="Modular Monolith"
                       onChange={e => setSettings({
                           ...settings,
                           targetArchitectureStyle: e.target.id
                       })}/>
                <Label htmlFor="modular-monolith">Modular Monolith</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="microservice" name="targetArchitectureStyle" value="Microservice"
                       onChange={e => setSettings({
                           ...settings,
                           targetArchitectureStyle: e.target.id
                       })}/>
                <Label htmlFor="microservice">Microservice</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetArchitecturePattern">
                Target Architecture Pattern
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="layered-architecture" name="targetArchitecturePattern"
                       value="Classic Layered Architecture" onChange={e => setSettings({
                    ...settings,
                    targetArchitecturePattern: e.target.id
                })}/>
                <Label htmlFor="layered-architecture">Classic Layered Architecture</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="clean-architecture" name="targetArchitecturePattern"
                       value="Onion/Clean Architecture" onChange={e => setSettings({
                    ...settings,
                    targetArchitecturePattern: e.target.id
                })}/>
                <Label htmlFor="clean-architecture">Onion/Clean Architecture</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="port-adapter" name="targetArchitecturePattern" value="Port & Adapter"
                       onChange={e => setSettings({
                           ...settings,
                           targetArchitecturePattern: e.target.id
                       })}/>
                <Label htmlFor="port-adapter">Port & Adapter</Label>
            </div>
        </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetCommunicationProtocol">
                Target Communication Protocol
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="object-method-call" name="targetCommunicationProtocol" value="Object Method Call"
                       onChange={e => setSettings({
                           ...settings,
                           targetCommunicationProtocol: e.target.id
                       })}/>
                <Label htmlFor="object-method-call">Object Method Call</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="http" name="targetCommunicationProtocol" value="HTTP"
                       onChange={e => setSettings({
                           ...settings,
                           targetCommunicationProtocol: e.target.id
                       })}/>
                <Label htmlFor="http">HTTP</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="grpc" name="targetCommunicationProtocol" value="gRPC"
                       onChange={e => setSettings({
                           ...settings,
                           targetCommunicationProtocol: e.target.id
                       })}/>
                <Label htmlFor="grpc">gRPC</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="messaging" name="targetCommunicationProtocol" value="Messaging"
                       onChange={e => setSettings({
                           ...settings,
                           targetCommunicationProtocol: e.target.id
                       })}/>
                <Label htmlFor="messaging">Messaging</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetCqrsOptions">
                Target CQRS Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="light-sqrs" name="targetCqrsOptions" value="Light CQRS (No Event Sourcing)"
                       onChange={e => setSettings({...settings, targetCqrsOptions: e.target.id})}/>
                <Label htmlFor="light-sqrs">Light CQRS (No Event Sourcing)</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="cqrs" name="targetCqrsOptions" value="CQRS"
                       onChange={e => setSettings({...settings, targetCqrsOptions: e.target.id})}/>
                <Label htmlFor="cqrs">CQRS</Label>
            </div>
        </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetDatabaseOptions">
                Target Database Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="in-memory" name="targetDatabaseOptions" value="InMemory"
                       onChange={e => setSettings({...settings, targetDatabaseOptions: e.target.id})}/>
                <Label htmlFor="in-memory">InMemory</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="sql" name="targetDatabaseOptions" value="SQL"
                       onChange={e => setSettings({...settings, targetDatabaseOptions: e.target.id})}/>
                <Label htmlFor="sql">SQL</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="no-sql" name="targetDatabaseOptions" value="NOSQL"
                       onChange={e => setSettings({...settings, targetDatabaseOptions: e.target.id})}/>
                <Label htmlFor="no-sql">NoSQl</Label>
            </div>
        </div>
        {settings.targetDatabaseOptions !== 'in-memory' && <div style={{width: '48%'}}>
            <Label htmlFor="targetDatabaseTechnologies">
                Target Database Technologies
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="event-store" name="targetDatabaseTechnologies" value="Event Store"
                       onChange={e => setSettings({
                           ...settings,
                           targetDatabaseTechnologies: e.target.id
                       })}/>
                <Label htmlFor="event-store">Event Store</Label>
            </div>
            {settings.targetDatabaseOptions === 'sql' && <>
                <div className="flex items-center gap-2">
                    <Radio id="my-sql" name="targetDatabaseTechnologies" value="MySQL"
                           onChange={e => setSettings({
                               ...settings,
                               targetDatabaseTechnologies: e.target.id
                           })}/>
                    <Label htmlFor="my-sql">MySQL</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="ms-sql" name="targetDatabaseTechnologies" value="Microsoft SQL Server"
                           onChange={e => setSettings({
                               ...settings,
                               targetDatabaseTechnologies: e.target.id
                           })}/>
                    <Label htmlFor="ms-sql">Microsoft SQL Server</Label>
                </div>
            </>}
            <div className="flex items-center gap-2">
                <Radio id="mongo-db" name="targetDatabaseTechnologies" value="MongoDB"
                       onChange={e => setSettings({
                           ...settings,
                           targetDatabaseTechnologies: e.target.id
                       })}/>
                <Label htmlFor="mongo-db">MongoDB</Label>
            </div>
        </div>}
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetDeploymentOptions">
                Target Deployment Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="docker-compose" name="targetDeploymentOptions" value="Docker Compose"
                       onChange={e => setSettings({
                           ...settings,
                           targetDeploymentOptions: e.target.id
                       })}/>
                <Label htmlFor="docker-compose">Docker Compose</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="k8s" name="targetDeploymentOptions" value="K8s" onChange={e => setSettings({
                    ...settings,
                    targetDeploymentOptions: e.target.id
                })}/>
                <Label htmlFor="k8s">K8s</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetMessagingTechnologies">
                Target Messaging Technologies
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="rabbit-mq" name="targetMessagingTechnologies" value="RabbitMQ"
                       onChange={e => setSettings({
                           ...settings,
                           targetMessagingTechnologies: e.target.id
                       })}/>
                <Label htmlFor="rabbit-mq">RabbitMQ</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="apache-kafka" name="targetMessagingTechnologies" value="Apache Kafka"
                       onChange={e => setSettings({
                           ...settings,
                           targetMessagingTechnologies: e.target.id
                       })}/>
                <Label htmlFor="apache-kafka">Apache Kafka</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="ms-service-bus" name="targetMessagingTechnologies"
                       value="Microsoft Service Bus" onChange={e => setSettings({
                    ...settings,
                    targetMessagingTechnologies: e.target.id
                })}/>
                <Label htmlFor="ms-service-bus">Microsoft Service Bus</Label>
            </div>
        </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetSecurityOptions">
                Target Security Options
            </Label>
            <div className="flex items-center gap-2">
                <Radio id="open-id-connect" name="targetSecurityOptions" value="Open ID Connect"
                       onChange={e => setSettings({...settings, targetSecurityOptions: e.target.id})}/>
                <Label htmlFor="open-id-connect">Open ID Connect</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="auth0" name="targetSecurityOptions" value="Auth0"
                       onChange={e => setSettings({...settings, targetSecurityOptions: e.target.id})}/>
                <Label htmlFor="auth0">Auth0</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="social-media" name="targetSecurityOptions" value="Social Media"
                       onChange={e => setSettings({...settings, targetSecurityOptions: e.target.id})}/>
                <Label htmlFor="social-media">Social Media</Label>
            </div>
        </div>
        <div style={{width: '48%'}}>
            <Label htmlFor="targetObservabilityOptions">
                Target Observability / Proxy / Cache Options
            </Label>
            <div className="flex items-center gap-2">
                <Checkbox id="monitoring" name="targetObservabilityOptions" value="Monitoring"
                          onChange={e => setSettings({
                              ...settings,
                              targetObservabilityOptions: e.target.id
                          })}/>
                <Label htmlFor="monitoring">Monitoring</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="health-check" name="targetObservabilityOptions" value="Health Check"
                          onChange={e => setSettings({
                              ...settings,
                              targetObservabilityOptions: e.target.id
                          })}/>
                <Label htmlFor="health-check">Health Check</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="health-check" name="targetObservabilityOptions" value="Health Check"
                          onChange={e => setSettings({
                              ...settings,
                              targetObservabilityOptions: e.target.id
                          })}/>
                <Label htmlFor="health-check">APIs Gateway</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="reverse-proxy" name="targetObservabilityOptions" value="Reverse Proxy"
                          onChange={e => setSettings({
                              ...settings,
                              targetObservabilityOptions: e.target.id
                          })}/>
                <Label htmlFor="reverse-proxy">Reverse Proxy</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="redis-cache" name="targetObservabilityOptions" value="Redis Cache"
                          onChange={e => setSettings({
                              ...settings,
                              targetObservabilityOptions: e.target.id
                          })}/>
                <Label htmlFor="redis-cashe">Redis Cache</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="health-check" name="targetObservabilityOptions" value="Health Check"
                          onChange={e => setSettings({
                              ...settings,
                              targetObservabilityOptions: e.target.id
                          })}/>
                <Label htmlFor="health-check">Health Check</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="native-image" name="targetObservabilityOptions" value="Native Image"
                          onChange={e => setSettings({
                              ...settings,
                              targetObservabilityOptions: e.target.id
                          })}/>
                <Label htmlFor="native-image">Native Image (GraalVM, Microsoft Native Image)</Label>
            </div>
        </div>
    </div>
</>

export default ServerSideSettings;