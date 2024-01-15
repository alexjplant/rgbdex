import { TypeMatchup } from "./TypeMatchup";

export const GetAll = async () => {
    try {
        const result = await fetch("https://raw.githubusercontent.com/Vortyne/pureRGB/master/data/types/type_matchups.asm");
        // TODO use a stream or something to make this more efficient
        const lines = (await result.text()).split('\n');
        const mappedLines = lines.map(l => {
            const match = l.match(/\s*db\s*(\w+),\s*(\w+),\s*(\w+)/);
            if (match === null) {
                return null;
            }

            const move: TypeMatchup = {
                attackingType: match[1 + 0],
                defendingType: match[1 + 1],
                effectiveness: match[1 + 2],
            };

           return move;
        });
        const filteredLines = mappedLines.filter(l => l);
        return filteredLines;
    } catch (e) {
        console.log(e);
    }
};