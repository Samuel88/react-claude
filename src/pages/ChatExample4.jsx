import { HumanMessage } from "langchain";
import anthropicAgent from "../agents/AnthropicAgents";

function ChatExample4() {
    
    const handleRollDice = () => {
        anthropicAgent.invoke({
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