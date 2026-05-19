import { ChatAnthropic } from "@langchain/anthropic";
import { createAgent } from "langchain";
import rollDice from "../tools/rollDice";

const CLAUDE_API_KEY = import.meta.env.VITE_API_KEY;

const model = new ChatAnthropic({
    model: 'claude-sonnet-4-6',
    apiKey: CLAUDE_API_KEY,
});

const anthropicAgent = createAgent({
    model,
    tools: [rollDice],
});

export default anthropicAgent;