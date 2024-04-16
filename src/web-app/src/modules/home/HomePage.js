// HomePage.js
import React from 'react';
import { Button } from 'flowbite-react';

const HomePage = () => {
    return (
        <div>
            <div className="py-5">
                <h5 className="text-center">Welcome to my PoC solution for the Odeev Kata Challenge!</h5>
                <h3 className="text-center">Solving the Problem of creating ang generating code with VSC Extension</h3>
                <p className="text-center">Hi my name is Hamza Jguerim, am excited to present to my Proof of Concept solution for the Kata. I will provide an overview of the problem we aim to solve, discuss the challenges we'll face, outline potential solutions and trade-offs, and delve into the architecture of both the PoC and the resulting project.</p>
            </div>

            <div className="py-5">
                <h2 className="text-center">Problem to Solve</h2>
                <p className="text-center">Describe the problem that the PoC aims to address. Highlight its significance and impact on stakeholders.</p>
            </div>

            <div className="py-5">
                <h2 className="text-center">Challenges and Solutions</h2>
                <p className="text-center">Discuss the challenges involved in solving the problem and outline potential solutions. Address any trade-offs that may need to be considered.</p>
            </div>

            <div className="py-5">
                <h2 className="text-center">PoC Architecture</h2>
                <p className="text-center">Provide an overview of the architecture chosen for the PoC. Discuss the reasoning behind the architecture choices and any technologies used.</p>
            </div>

            <div className="py-5">
                <h2 className="text-center">Generated Project Architecture</h2>
                <p className="text-center">Once the PoC is complete, discuss the architecture of the resulting project. Highlight any changes or optimizations made based on the learnings from the PoC phase.</p>
            </div>

            <div className="py-5 text-center">
                <Button variant="primary">Get Started</Button>
            </div>
        </div>
    );
};

export default HomePage;