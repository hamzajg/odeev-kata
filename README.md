# odeev-kata

Welcome to the Odeev kata Challenge Solution Proposal Repository, Kata description here [Odeev Kata](https://katasintegraodeev.notion.site/KATA-Sintegra-Odeev-70ca32a01bd44ab59a97956095f3dd70), 
this repository will serve as an exploration logs, will go over the overall solution discovery, 
enumerating the different challenges, solutions options and trade-off.  
Also will try to deliver the architecture and a working PoC of the solution, plus the supported architecture and 
practices that can be applied to the generated solutions project.  
Will try to present a Pragmatic and Evolutionary Solution Architecture, from integrating with existing tools, 
custom Web App Tool, IDE Extension like (VSCode, JetBrains IDEs), console CLI commands tool.

## IMPORTANT NOTE: Continuous Learning & Having Fun :)

## Introduction
The solution is sort of integrated platform designed to provide a comprehensive development environment for building 
and deploying software applications. 
It encompasses several key components, including a Web App Platform, specific Framework Building Blocks (Core, Abstraction, Code Generator), 
a dedicated AI with models trained on the solution's core code, a Visual Studio Code extension, and a command-line interface (CLI) tool.

One of the key features of the solution is its ability to support a wide range of target platforms, 
including JVM, .NET, Web, Mobile, and Desktop. Each target platform may have different architecture styles and patterns,
concurrency models, and other unique characteristics.

The Web App Platform offers a robust framework for building web applications, providing tools and libraries 
for Architecture & Model diagrams & Diagram as Code, Collaboration around Business Requirements, front-end development, 
back-end logic, database integration, and deployment.

The Specific Framework Building Blocks encompass three core components: Core, Abstraction, and Code Generator. 
The Core component serves as the foundation, offering essential functionalities like dependency injection, 
configuration management, and logging. Abstraction abstracts away low-level implementation details, 
providing a unified interface for interaction. Code Generator automates repetitive tasks by generating boilerplate code 
and configuration files based on predefined templates. 
Together, these components streamline development, enhance productivity, and maintain consistency across projects.

The dedicated AI component leverages machine learning algorithms trained on the solution's core codebase to provide intelligent assistance to developers. 
This includes features such as Architecture Model assistance, code completion, error detection, automated refactoring suggestions and migrations.

The Visual Studio Code extension enhances the development experience by integrating seamlessly with the popular code editor. 
It provides additional functionalities, such as code navigation, debugging support, and integration with version control systems.

The command-line interface (CLI) tool offers a convenient way to interact with the solution from the terminal. 
It allows developers to perform various tasks, such as project scaffolding, dependency management, and deployment, all from the command line.

## Technical challenges, solutions & Trade-off
Here an overview detailing the technical challenges encountered, innovative solutions implemented, 
and the trade-offs made during the project lifecycle, providing insights into the decision-making process and outcomes.

### Architecture & Modeling:
#### Business Oriented VS Technical Design model:
Focusing on a business-oriented design model, such as Domain-Driven Design (DDD), rather than a technical design model 
like JHipster Entity diagram, enables alignment with business objectives and enhances scalability.  
By generating technical diagram models based on the business model, the platform streamlines development, 
ensuring coherence between business requirements and technical implementation.

#### Combine Bottom-Up & Top-Down Design models:
Leveraging both bottom-up and top-down design approaches, enabling a holistic solution discovery process. 
Bottom-up design focuses on problem-solving and meeting business acceptance criteria by starting with technical details 
and gradually refining them to align with business objectives.   
Top-down design, on the other hand, begins with high-level business requirements and iteratively drills down 
to technical implementation details.

By combining these approaches, the platform ensures comprehensive coverage of both business needs and technical feasibility, 
resulting in effective problem-solving and solution delivery.

#### Collaboration & Version control:
The business-oriented model fosters collaboration across the entire team and business stakeholders 
by providing a common language and understanding of domain concepts.  
This approach enables effective communication, encourages shared ownership of the solution, 
and ensures that business goals drive technical decisions, resulting in a more cohesive and aligned development process.

By using a business model as the foundation, the platform can automatically generate technical models, 
ensuring consistency and accuracy in translating business requirements into technical specifications. 
This process streamlines development efforts, reduces manual errors, and provides a clear audit trail for tracking changes, 
enhancing version control and collaboration among team members.

### Evolution of Generation Model & migration
By employing JSON as the model persistence format, the platform enables seamless evolution of the model 
and smooth migration of old existing models to new versions.  
JSON's flexibility allows for easy addition or modification of fields, making it conducive to accommodating 
changes in the model over time.  
Additionally, its human-readable and lightweight nature simplifies debugging and troubleshooting.  
With JSON, the platform ensures compatibility and interoperability across different versions of the model, 
facilitating efficient evolution and migration processes.

### Code Generation:
Using template markup tools like Apache FreeMarker or Microsoft T4 text template will enable efficient code generation, 
allowing developers to rapidly scaffold code based on predefined templates.  
Additionally, the integration of AI-driven code completion, review, and refactoring capabilities enhances 
developer productivity and code quality.  
By leveraging AI algorithms, the platform provides intelligent suggestions, automates routine coding tasks, 
and identifies potential code smells or optimizations, thereby streamlining the development process 
and improving code maintainability.

### Supporting many architecture styles, patterns, platform languages & technologies:

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
Our solution aims to provide a comprehensive and integrated platform that empowers developers, architects, 
and teams to streamline their software development workflows, enhance collaboration, and accelerate project delivery. 
At the core of our solution is a modular monolithic architecture, chosen for its balance of simplicity, scalability, 
and maintainability.  
While microservices architectures offer benefits in terms of flexibility and scalability, 
they also introduce complexity and operational overhead, which may not be necessary for all projects. 
By opting for a modular monolithic architecture, we strike a pragmatic balance, enabling rapid development 
and iteration while retaining the ability to modularize and scale components as needed.

First Law of Distributed Software: Don't Distribute ([Martin Fowler](https://martinfowler.com/articles/distributed-objects-microservices.html)):
Following the first law of software development, we prioritize simplicity and avoid premature distribution of components or services. 
Distributing components prematurely can introduce unnecessary complexity and overhead, 
hindering productivity and increasing the risk of system failures.

## Generated Solutions Overview
- Modular Monolith Architecture

```mermaid
graph TD;

    subgraph Service
        AuthMod[Authentication Module]
        ProdMod[Product Module]
        OrderMod[Order Module]
        style AuthMod fill:#3498db,stroke:#2980b9,stroke-width:2px
        style ProdMod fill:#27ae60,stroke:#27ae60,stroke-width:2px
        style OrderMod fill:#f39c12,stroke:#d35400,stroke-width:2px
    end

    subgraph Database
        DB[Database]
        style DB fill:#9b59b6,stroke:#8e44ad,stroke-width:2px
    end

    subgraph APIGateway
        Gateway[API Gateway]
        style Gateway fill:#16a085,stroke:#27ae60,stroke-width:2px
    end

    Service --> AuthMod;
    Service --> ProdMod;
    Service --> OrderMod;

    Service --> DB;
    Gateway --> Service;
```

- Microservices Architecture

```mermaid
graph LR;

    subgraph Gateway
        gw1[API Gateway]
        style gw1 fill:#3498db,stroke:#2980b9,stroke-width:2px
    end

    subgraph Services
        s1[Service A]
        s2[Service B]
        s3[Service C]
        style s1 fill:#27ae60,stroke:#27ae60,stroke-width:2px
        style s2 fill:#27ae60,stroke:#27ae60,stroke-width:2px
        style s3 fill:#27ae60,stroke:#27ae60,stroke-width:2px
    end

    subgraph Database
        db1[Database A]
        db2[Database B]
        style db1 fill:#f39c12,stroke:#d35400,stroke-width:2px
        style db2 fill:#f39c12,stroke:#d35400,stroke-width:2px
    end

    gw1 --> s1;
    gw1 --> s2;
    gw1 --> s3;
    s1 --> db1;
    s2 --> db2;
```

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
The platform provide a comprehensive suite of modeling and diagramming tools, augmented by AI capabilities. 
These tools empower teams to visualize complex systems, design intricate architectures, and map out intricate workflows with ease. 
Leveraging AI assistance, the platform offers intelligent suggestions, automates repetitive tasks, and assists in decision-making processes. 

Furthermore, the platform fosters enhanced collaboration among team members by facilitating real-time collaboration, version control, and feedback mechanisms. 
Whether adopting a top-down or bottom-up approach to design, the platform provides robust support, enabling teams to iterate quickly, refine designs iteratively, 
and align architectural decisions with business objectives effectively and normalize the code generation process.

### Bottom Up Domain Modeling
```mermaid
graph TD;
 
    subgraph Event Storming Big Picture
        CustomerRegistered[Customer Registered]
        OrderCreated[Order Created]
        OrderShipped[Order Shipped]
        OrderDelivered[Order Delivered]
        OrderCancelled[Order Cancelled]
        style CustomerRegistered fill:#f39c12,stroke:#d35400,stroke-width:2px
        style OrderCreated fill:#f39c12,stroke:#d35400,stroke-width:2px
        style OrderShipped fill:#f39c12,stroke:#d35400,stroke-width:2px
        style OrderDelivered fill:#f39c12,stroke:#d35400,stroke-width:2px
        style OrderCancelled fill:#f39c12,stroke:#d35400,stroke-width:2px
        FraudCheck[Fraud Check]
        ShippingPolicy[Shipping Policy]
        style FraudCheck fill:#9b59b6,stroke:#8e44ad,stroke-width:2px
        style ShippingPolicy fill:#9b59b6,stroke:#8e44ad,stroke-width:2px
    end
```

```mermaid
graph TD;
    subgraph Specification by Example BDD
        G1[Given: Customer is registered]
        style G1 fill:#f1c40f,stroke:#f39c12,stroke-width:2px
        
        W1[When: Customer places an order]
        style W1 fill:#3498db,stroke:#2980b9,stroke-width:2px
        
        T1[Then: Order is shipped]
        style T1 fill:#e74c3c,stroke:#c0392b,stroke-width:2px
    end
```
### Top Down APIs Modeling
using APIs design first by writing the Open API Specification yml file and use tool like Swagger to preview the APIs and Swagger code generation to generate the APIs.

```mermaid
graph TD;
    subgraph Top Down Design OpenAPISpec
        generateSpec[Write OpenAPI Specification]
    end
    
    subgraph Platform
        generateCode[Swagger Code Generation]
        previewAPI[Swagger API Preview]
    end

    generateSpec --> generateCode
    generateSpec --> previewAPI
```

### Inspired By Existing tools:

The platform's key feature lies in its ability to consolidate and integrate existing tools from the market into one centralized location. 
By leveraging the strengths of various established tools across different domains, users can access a comprehensive suite of functionalities within a single platform. 
This approach eliminates the need for users to navigate through multiple applications or switch between different tools, saving time and streamlining workflows.

Whether it's IDEs, project management software, collaboration platforms, or modeling tools, the platform brings together the best features from existing tools, 
providing users with a unified solution that meets their diverse needs. 
By offering a one-stop-shop for essential tools and functionalities, the platform enhances user productivity, fosters collaboration,
and simplifies the development process.

- Here a list of existing tools both on the Web and VSCode:
  - Web
    - https://domorobo.to/ (Former Contributor)
    - https://prooph-board.com/
    - https://www.modelmycode.com/
  - VSCode Extension
    - OpenAPI Spec Swagger
    - Draw.io

## Dedicated AI for Design & Code Generation

The platform incorporates a dedicated AI system specifically tailored for design and code generation tasks. 
This AI functionality serves as a powerful assistant to developers, architects, and designers, providing intelligent insights and automating repetitive tasks. 
Users have the option to leverage both private and locally trained AI models, as well as publicly available AI services, 
depending on their specific requirements and preferences.

Private and locally trained AI models offer several advantages, including enhanced privacy and security for sensitive data and projects. 
By training AI models on proprietary datasets and project-specific contexts, users can fine-tune the AI's capabilities 
to better align with their unique needs and domain-specific challenges.  
Additionally, local AI models provide greater control over the training process and enable users to iterate 
and refine their models based on real-world feedback and insights.

## PoC

### Overview

### Architecture Decisions Records

