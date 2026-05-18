import { createAgent, HumanMessage, tool } from "langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import rollDice from "../tools/rollDice";

function ChatExample4() {
    const CLAUDE_API_KEY = import.meta.env.VITE_API_KEY;

    const model = new ChatAnthropic({
        model: 'claude-sonnet-4-6',
        apiKey: CLAUDE_API_KEY,
    });

    const agent = createAgent({
        model,
        tools: [rollDice],
    });

    const handleRollDice = () => {
        agent.invoke({
            messages: [
                new HumanMessage("Voglio tirare un dado a 6 facce.")
            ]
        }).then(response => {
            console.log("Risposta del modello:", response);
        }).catch(error => {
            console.error("Errore nella richiesta:", error);
        });
    }

    return (
        <div>
            <button onClick={handleRollDice}>Roll Dice</button>
        </div>
    )
}
export default ChatExample4;