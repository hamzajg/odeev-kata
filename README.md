# odeev-kata

Welcome to the Odeev kata Challenge Solution Proposal Repository, Kata description here [Odeev Kata](https://katasintegraodeev.notion.site/KATA-Sintegra-Odeev-70ca32a01bd44ab59a97956095f3dd70), this repository will serve as an exploration logs, will go over the overall solution discovery, enumerating the different challenges, solutions options and trade-off.\
Also will try to deliver the architecture and a working PoC of the solution, plus the supported architecture and practices that can be applied to the generated solutions project.
Will try to present a Pragmatic and Evolutionary Solution Architecture, from integrating with existing tools, custom Web App Tool, IDE Extension like (VSCode, JetBrains IDEs), console CLI commands tool.

# IMPORTANT NOTE: Having Fun :) !!

## Table of Content

## Introduction
The solution is sort of integrated platform designed to provide a comprehensive development environment for building and deploying software applications. It encompasses several key components, including a Web App Platform, specific Framework Building Blocks (Core, Abstraction, Code Generator), a dedicated AI with models trained on the solution's core code, a Visual Studio Code extension, and a command-line interface (CLI) tool.

One of the key features of the solution is its ability to support a wide range of target platforms, including JVM, .NET, Web, Mobile, and Desktop. Each target platform may have different architecture styles and patterns, concurrency models, and other unique characteristics.

The Web App Platform offers a robust framework for building web applications, providing tools and libraries for Architecture & Model diagrams & Diagram as Code, Collaboration around Business Requirements, front-end development, back-end logic, database integration, and deployment.

The Specific Framework Building Blocks encompass three core components: Core, Abstraction, and Code Generator. The Core component serves as the foundation, offering essential functionalities like dependency injection, configuration management, and logging. Abstraction abstracts away low-level implementation details, providing a unified interface for interaction. Code Generator automates repetitive tasks by generating boilerplate code and configuration files based on predefined templates. Together, these components streamline development, enhance productivity, and maintain consistency across projects.

The dedicated AI component leverages machine learning algorithms trained on the solution's core codebase to provide intelligent assistance to developers. This includes features such as Architecture Model assistance, code completion, error detection, automated refactoring suggestions and migrations.

The Visual Studio Code extension enhances the development experience by integrating seamlessly with the popular code editor. It provides additional functionalities, such as code navigation, debugging support, and integration with version control systems.

The command-line interface (CLI) tool offers a convenient way to interact with the solution from the terminal. It allows developers to perform various tasks, such as project scaffolding, dependency management, and deployment, all from the command line.

## Solution Overview
```mermaid
graph LR;
    WebAppPlatform(Web App Platform) --> VSCodeExtension(VSCode Extension);
    WebAppPlatform --> FrameworkCoreBuildingBlocks(Framework Core Building Blocks);
    WebAppPlatform --> DedicatedAI(Dedicated AI);
    WebAppPlatform --> CLITool(CLI Tool);
    
    style WebAppPlatform fill:#3498db,stroke:#2980b9,stroke-width:2px;
    style VSCodeExtension fill:#9b59b6,stroke:#8e44ad,stroke-width:2px;
    style FrameworkCoreBuildingBlocks fill:#2ecc71,stroke:#27ae60,stroke-width:2px;
    style DedicatedAI fill:#e74c3c,stroke:#c0392b,stroke-width:2px;
    style CLITool fill:#f39c12,stroke:#d35400,stroke-width:2px;
```
## Generated Solutions Overview
- Classic Layered Architecture

```mermaid
graph TD;

    subgraph PresentationLayer[Presentation Layer]
        style PresentationLayer fill:#3498db,stroke:#2980b9,stroke-width:2px;
        WebApp[Web Application] -->|Render| UserInterface[User Interface];
        WebApp -->|Handle Requests| Controller[Controller];
        WebApp -->|Provide Data| Service[Service];
    end

    subgraph BusinessLayer[Business Layer]
        style BusinessLayer fill:#2ecc71,stroke:#27ae60,stroke-width:2px;
        Service -->|Process Business Logic| BusinessLogic[Business Logic];
    end

    subgraph DataLayer[Data Layer]
        style DataLayer fill:#f39c12,stroke:#d35400,stroke-width:2px;
        Repository[Repository] -->|CRUD Operations| Database[Database];
    end
```

- Onion / Clean Architecture

```mermaid
graph TD;

    subgraph CoreDomain[Core Domain]
        style CoreDomain fill:#3498db,stroke:#2980b9,stroke-width:2px;
        DomainModel[Domain Model] -->|Business Logic| UseCase[Use Case];
    end

    subgraph ApplicationLayer[Application Layer]
        style ApplicationLayer fill:#2ecc71,stroke:#27ae60,stroke-width:2px;
        UseCase -->|Orchestrate| Service[Service];
    end

    subgraph InfrastructureLayer[Infrastructure Layer]
        style InfrastructureLayer fill:#f39c12,stroke:#d35400,stroke-width:2px;
        Service -->|Implement| Repository[Repository];
    end

    subgraph ExternalDependencies[External Dependencies]
        style ExternalDependencies fill:#9b59b6,stroke:#8e44ad,stroke-width:2px;
        Repository -->|Data Access| Database[Database];
    end
```
- Port & Adapter

```mermaid
graph TD;

    subgraph PrimaryDrivers[Primary Drivers]
        style PrimaryDrivers fill:#3498db,stroke:#2980b9,stroke-width:2px;
        Adapter[Adapter] -->|Adapt| Port[Port];
        Presenter[Presenter] -->|Render| Port;
        Port -->|Handle| UseCase[Use Case];
    end

    subgraph SecondaryDrivers[Secondary Drivers]
        style SecondaryDrivers fill:#2ecc71,stroke:#27ae60,stroke-width:2px;
        Infrastructure[Infrastructure] -->|Implement| Adapter;
        Adapter -->|Use| External[External System];
    end

```


## Architecture & Modeling
### Existing tools:
### Web
- https://domorobo.to/
- https://prooph-board.com/
- https://www.modelmycode.com/

### VSCode Extension
- OpenAPI Spec Swagger
- Draw.io

## AI for Code Generation

## PoC
### Overview

### Architecture Decisions Records

