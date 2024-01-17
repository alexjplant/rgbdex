import { Move } from "./Move";

export const GetAll = async () => {
    try {
        const namesResult = await fetch("https://raw.githubusercontent.com/Vortyne/pureRGB/master/data/moves/names.asm");
        var lines = (await namesResult.text()).split('\n');
        const mappedNameLines = lines.map(l => {
            const match = l.match(/\s*li\s*"([\w -]+)"/);
            if (match === null) {
                return null;
            }

            return match[1 + 0];
        });
        const names = mappedNameLines.filter(l => l);

        const result = await fetch("https://raw.githubusercontent.com/Vortyne/pureRGB/master/data/moves/moves.asm");
        lines = (await result.text()).split('\n');
        var i = 0;
        const mappedDataLines = lines.map(l => {
            const match = l.match(/\s*move\s*(\w+),\s*(\w+),\s*(\d+),\s*(\w+),\s*(\d+),\s*(\d+)\s*(.*)/)
            if (match === null) {
                return null;
            }

            const comment = match[1 + 6] ?? "";

            const move = {
                name: match[1 + 0],
                displayName: names[i++],
                effect: match[1 + 1],
                power: parseInt(match[1 + 2]),
                type: match[1 + 3],
                accuracy: parseInt(match[1 + 4]),
                pp: parseInt(match[1 + 5]),
                comment: comment,
            } as Move;

           return move;
        });
        return  mappedDataLines.filter(l => l);
    } catch (e) {
        console.log(e);
    }
};
