import * as z from "zod";
import { tool } from "langchain/tools";

const rollDice = tool(
    ({ sides }) => {
        console.log(`Rolling a ${sides}-sided die...`);
        const result = Math.floor(Math.random() * sides) + 1;
        return `Hai tirato un dado a ${sides} facce e hai ottenuto: ${result}`;
    },
    {
        name: "roll_dice",
        description: "Tira un dado con un numero specifico di facce. Usa questo strumento quando l'utente vuole tirare un dado. Il parametro 'sides' è il numero di facce del dado.",
        schema: z.object({
            sides: z.number().int().positive()
        })
    }
);

export default rollDice;