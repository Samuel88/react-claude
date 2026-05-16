import { useState } from "react";

function ChatExample1() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const CLADE_API_URL = 'https://api.anthropic.com/v1/messages';
    // https://vite.dev/guide/env-and-mode
    const CLAUDE_API_KEY = import.meta.env.VITE_API_KEY;

    const sendRequest = (message) => {
        return fetch(CLADE_API_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'anthropic-version': '2023-06-01',
                "X-Api-Key": CLAUDE_API_KEY,
                "anthropic-dangerous-direct-browser-access": "true"
            },
            body: JSON.stringify({
                "model": "claude-sonnet-4-6",
                "max_tokens": 1024,
                "messages": [
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            return json.content[0].text;
        });
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setMessage(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest(message)
            .then(response => {
                setResponse(response);
            });
    }

    return <form onSubmit={handleSubmit}>
        <div>
            {response}
        </div>
        <input type="text" value={message} onChange={handleChange} placeholder="Scrivi qualcosa..." />
    </form>;
}


export default ChatExample1;