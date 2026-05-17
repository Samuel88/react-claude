// pnpm add langchain @langchain/core @langchain/anthropic
// https://docs.langchain.com/oss/javascript/langchain/messages
// https://docs.langchain.com/oss/javascript/langchain/models
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage } from "langchain";
import { useState } from "react";

function ChatExample3() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // https://vite.dev/guide/env-and-mode
    const CLAUDE_API_KEY = import.meta.env.VITE_API_KEY;

    const model = new ChatAnthropic({
        model: 'claude-sonnet-4-6',
        apiKey: CLAUDE_API_KEY
    });

    const sendRequest = (message) => {
        setLoading(true);
        const userMsg = new HumanMessage(message);
        const newHistory = [...history, userMsg];
        setHistory(newHistory);
        setMessage('');
        return model.invoke(newHistory);
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setMessage(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest(message)
            .then(aiMessage => {
                const aiMsg = new AIMessage(aiMessage.content);
                setHistory([...history, aiMsg]);              
            })
            .catch(error => {
                console.error("Errore nella richiesta:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return <form onSubmit={handleSubmit}>
        <div>
            {JSON.stringify(history)}
        </div>
        <input type="text" value={message} onChange={handleChange} placeholder="Scrivi qualcosa..." />
    </form>;
}

export default ChatExample3;