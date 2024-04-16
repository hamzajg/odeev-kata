import React, { useState } from 'react';
import { Button, Card, Textarea } from 'flowbite-react';

const AIChatDialog = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleUserMessage = (message) => {
        if(message === '')
            return;
        const aiResponse = simulateAIResponse(message);

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, sender: 'user' },
            { text: aiResponse, sender: 'ai' },
        ]);
        setMessage('');
    };

    const simulateAIResponse = (userMessage) => {
        return 'AI: ' + userMessage;
    };

    return (
        <div className="ai-chat-dialog h-screen">
            <div className="ai-chat-messages overflow-y-auto h-4/6">
                {messages.map((message, index) => (
                    <Card key={index} className={`ai-chat-message ${message.sender} m-2`}>
                        <div className={`text-${message.sender === 'user' ? 'left' : 'right'}`}>
                            {message.text}
                        </div>
                    </Card>
                ))}
            </div>
            <div className="ai-chat-input flex items-center gap-2 h-1/6">
                <Textarea
                    type="text"
                    value={message}
                    placeholder="Type your message..."
                    className="flex-grow rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    onChange={handleInputChange}
                    rows={3}
                />
                <Button onClick={() => handleUserMessage(document.querySelector('.ai-chat-input textarea').value)}>
                    >
                </Button>
            </div>
        </div>
    );
};

export default AIChatDialog;