import { useState } from "react";
import anthropicAgent from "../agents/AnthropicAgents";
import { HumanMessage } from "langchain";

function readPdfFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            const result = event.target.result;
            const base64String = String(result).split(",")[1] // Rimuovo l'header Base64
            resolve(base64String);
        };
        reader.onerror = function (event) {
            reject(event.target.error);
        }
    });
}

function Esamina() {
    const [pdf, setPdf] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        readPdfFile(pdf).then(result => {
            console.log(result);

            anthropicAgent.invoke({
                messages: [
                    new HumanMessage({
                        content: [
                            {
                                type: 'text',
                                text: 'Mi dici cosa contiene questo PDF',
                            },
                            {
                                type: 'file',
                                source_type: 'base64',
                                data: result,
                                mime_type: 'application/pdf',
                            }
                        ]
                    })
                ]
            }).then(response => {
                console.log(response);
            })
        })

    }

    return <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setPdf(e.target.files[0])} />
        {JSON.stringify(pdf)}
        <button>Leggi</button>
    </form>;
}
export default Esamina;