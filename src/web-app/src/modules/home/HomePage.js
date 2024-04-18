import React, {useEffect} from 'react';

const HomePage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workspacePath = urlParams.get('workspace-path');
    const from = urlParams.get('from');

    useEffect(() => {
        if(workspacePath)
            localStorage.setItem('workspace-path', workspacePath);
        if(from)
            localStorage.setItem('from', from);
        const message = {
            command: 'openFile',
            filePath: '/path/to/file.txt',
            content: 'File content goes here'
        };
        window.postMessage(message, '*');
    }, []);

    return (
        <div className="flex justify-between items-center p-4">
            <div className="text-left">
                {localStorage.getItem('workspace-path') && "Workspace Path:"+ localStorage.getItem('workspace-path') + "From: "+ from}
                <div className="py-5">
                    <h1 className="h1">Welcome to my PoC solution for the Odeev Kata Challenge!</h1>
                    <h3>Solving the Problem of creating ang generating code with VSC
                        Extension</h3>
                    <p>Hi my name is Hamza Jguerim, am excited to present to my Proof of Concept
                        solution for the Kata. I will provide an overview of the problem we aim to solve, discuss the
                        challenges we'll face, outline potential solutions and trade-offs, and delve into the
                        architecture of both the PoC and the resulting project.</p>
                </div>

                <div className="text-left py-5">
                    <h2>Problem to Solve</h2>
                    <p>Describe the problem that the PoC aims to address. Highlight its
                        significance and impact on stakeholders.</p>
                </div>

                <div className="text-left py-5">
                    <h2>Challenges and Solutions</h2>
                    <p>Discuss the challenges involved in solving the problem and outline
                        potential solutions. Address any trade-offs that may need to be considered.</p>
                </div>

                <div className="text-left py-5">
                    <h2>PoC Architecture</h2>
                    <p>Provide an overview of the architecture chosen for the PoC. Discuss the
                        reasoning behind the architecture choices and any technologies used.</p>
                </div>

                <div className="text-left py-5">
                    <h2>Generated Project Architecture</h2>
                    <p>Once the PoC is complete, discuss the architecture of the resulting
                        project. Highlight any changes or optimizations made based on the learnings from the PoC
                        phase.</p>
                </div>
            </div>
        </div>

    );

};

export default HomePage;