import {Button, Card, Popover} from "flowbite-react";

const FrameworkBuildingBlocks = () => {
    const Content = ({title, body}) => {
        return (
            <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <div className="px-3 py-2">
                    <p>{body}</p>
                </div>
            </div>
        )
    }
    const coreContent = {
        core: (<Content title="Core Domain Model" body="Including Aggregate, Entity, Value Object, Factory, Repository, Use Case"/>),
        service: (<Content title="Service" body="Encapsulates business logic that doesn't naturally fit within an entity or value object, promoting separation of concerns."/>),
        event: (<Content title="Event" body="Captures a significant change or occurrence within the system, enabling event-driven architecture and eventual consistency."/>),
        command: (<Content title="Command" body="Encapsulates a request or intention to perform an action, facilitating decoupled communication between components."/>),
        query: (<Content title="Query" body="Represents a request for information from the system, enabling data retrieval and read-only operations."/>),
        cqrs: (<Content title="CQRS" body="Separates read and write operations, optimizing performance and scalability by using different models for querying and commanding."/>),
        codeGeneration: (<Content title="Code Generation" body="Automates the creation of boilerplate code and repetitive tasks, improving developer productivity and consistency."/>),
        cli: (<Content title="CLI" body="Automates the creation of boilerplate code and repetitive tasks, using Command Line Interface."/>),
    }
    const crossCuttingContent = {
        persistence: (<Content title="Persistence" body="Manages the storage and retrieval of domain objects, ensuring data integrity and durability."/>),
        communication: (<Content title="Communication" body="Facilitates interaction between different parts of the system, enabling seamless integration and message exchange."/>),
        security: (<Content title="Security" body="Enforces access control and safeguards sensitive information, protecting against unauthorized access and data breaches."/>),
        caching: (<Content title="Caching" body="Captures and records system events and actions for auditing, troubleshooting, and analysis purposes."/>),
        logging: (<Content title="Logging" body="Encapsulates business logic that doesn't naturally fit within an entity or value object, promoting separation of concerns."/>),
        monitoring: (<Content title="Monitoring" body="Tracks system performance and health metrics in real-time, enabling proactive detection and resolution of issues."/>)
    }
    const aiContent = {
        prompt: (<Content title="Prompt AI" body="Leverages artificial intelligence to provide context-aware suggestions and assistance during development tasks."/>),
        architecture: (<Content title="Architecture & Modeling Assistance" body="Offers tools and guidance for designing and visualizing system architecture and domain models, promoting clarity and alignment."/>),
        code: (<Content title="Documentation & Code Auto Complete" body="Generates comprehensive documentation and provides auto-complete functionality, improving code readability and developer productivity."/>),
        review: (<Content title="Review & Code Refactoring" body="Supports collaborative code review and automated refactoring tools, enhancing code quality and maintainability."/>),
    }

    return (
        <div className="flex justify-between gap-2 mb-2">
            <Card className="w-full">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Framework Core Building Blocks
                </h3>

                <div className="grid grid-cols-6 gap-2">
                    <Popover content={coreContent.core} trigger="hover">
                        <Button>Core</Button>
                    </Popover>
                    <Popover content={coreContent.service} trigger="hover">
                        <Button>Service</Button>
                    </Popover>
                    <Popover content={coreContent.event} trigger="hover">
                        <Button>Event</Button>
                    </Popover>
                    <Popover content={coreContent.command} trigger="hover">
                        <Button>Command</Button>
                    </Popover>
                    <Popover content={coreContent.query} trigger="hover">
                        <Button>Query</Button>
                    </Popover>
                    <Popover content={coreContent.cqrs} trigger="hover">
                        <Button>CQRS</Button>
                    </Popover>
                    <Popover content={coreContent.codeGeneration} trigger="hover">
                        <Button>Code Generator</Button>
                    </Popover>
                    <Popover content={coreContent.cli} trigger="hover">
                        <Button>CLI tool</Button>
                    </Popover>
                </div>
            </Card>
            <Card className="w-full">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Framework Cross Cutting Concerns
                </h3>

                <div className="grid grid-cols-6 gap-2">
                    <Popover content={crossCuttingContent.persistence} trigger="hover">
                        <Button>Persistence</Button>
                    </Popover>
                    <Popover content={crossCuttingContent.communication} trigger="hover">
                        <Button>Communication</Button>
                    </Popover>
                    <Popover content={crossCuttingContent.security} trigger="hover">
                        <Button>Security</Button>
                    </Popover>
                    <Popover content={crossCuttingContent.caching} trigger="hover">
                        <Button>Caching</Button>
                    </Popover>
                    <Popover content={crossCuttingContent.logging} trigger="hover">
                        <Button>Logging</Button>
                    </Popover>
                    <Popover content={crossCuttingContent.monitoring} trigger="hover">
                        <Button>Monitoring</Button>
                    </Popover>
                </div>
            </Card>
            <Card className="w-full">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Dedicated AI & Fine tuning models
                </h3>

                <div className="grid grid-cols-4 gap-2">
                    <Popover content={aiContent.prompt} trigger="hover">
                        <Button>Prompt AI</Button>
                    </Popover>
                    <Popover content={aiContent.architecture} trigger="hover">
                        <Button>Architecture & Modeling Assistance</Button>
                    </Popover>
                    <Popover content={aiContent.code} trigger="hover">
                        <Button>Documentation & Code Completion</Button>
                    </Popover>
                    <Popover content={aiContent.review} trigger="hover">
                        <Button>Review & Code Refactoring</Button>
                    </Popover>
                </div>
            </Card>
        </div>
    )
}

export default FrameworkBuildingBlocks;