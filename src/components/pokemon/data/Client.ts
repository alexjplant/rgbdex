import { Monster } from "./Monster";

export const GetMoves = async () => {
    try {
        const result = await fetch("https://raw.githubusercontent.com/Vortyne/pureRGB/master/data/moves/moves.asm");
        // TODO use a stream or something to make this more efficient
        const lines = (await result.text()).split('\n');
        const mappedLines = lines.map(l => {
            const match = l.match(/s*move\s*(\w+),\s*(\w+),\s*(\d+),\s*(\w+),\s*(\d+),\s*(\d+)/)
            if (match === null) {
                return null;
            }

            const move: Monster = {
                name: match[1 + 0],
                effect: match[1 + 1],
                power: parseInt(match[1 + 2]),
                type: match[1 + 3],
                accuracy: parseInt(match[1 + 4]),
                pp: parseInt(match[1 + 5])
            };

           return move;
        });
        const filteredLines = mappedLines.filter(l => l);
        return filteredLines;
    } catch (e) {
        console.log(e);
    }
};
