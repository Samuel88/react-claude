// pnpm add langchain @langchain/core @langchain/anthropic
// https://docs.langchain.com/oss/javascript/langchain/messages
// https://docs.langchain.com/oss/javascript/langchain/models
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "langchain";
import { useState } from "react";

function ChatExample2() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    // https://vite.dev/guide/env-and-mode
    const CLAUDE_API_KEY = import.meta.env.VITE_API_KEY;

    const model = new ChatAnthropic({
        model: 'claude-sonnet-4-6',
        apiKey: CLAUDE_API_KEY
    });

    const sendRequest = (message) => {
        return model.invoke([
            new HumanMessage(message)
        ])
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setMessage(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest(message)
            .then(aiResponse => {
                setResponse(aiResponse.content);                
            });
    }

    return <form onSubmit={handleSubmit}>
        <div>
            {response}
        </div>
        <input type="text" value={message} onChange={handleChange} placeholder="Scrivi qualcosa..." />
    </form>;
}

export default ChatExample2;