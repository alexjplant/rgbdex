import { Monster } from "./Monster";

export const GetList = async (): Promise<string[]> => {
    try {
        const result = await fetch("https://github.com/Vortyne/pureRGB/blob/master/data/pokemon/base_stats.asm")
        // TODO use a stream or something to make this more efficient
        const lines = (await result.text()).split('\n');
        const mappedLines = lines.map(l => {
            const match = l.match(/\s*INCLUDE\s*"data\/pokemon\/base_stats\/(\w*).asm"/)
            if (match === null) {
                return null;
            }

            return match[1 + 0];
        });
        const filteredLines = mappedLines.filter(l => l);
        return filteredLines;
    } catch (e) {
        console.log(e);
    }
};

const GetAll = async (monsterNames: string[]): Promise<Monster[]> => {
    try {
        var monsters: Monster[] = []

        monsterNames.forEach(async (monsterName) => {
            const result = await fetch(`https://raw.githubusercontent.com/Vortyne/pureRGB/master/data/pokemon/base_stats/${monsterName}.asm`);
            const lines = (await result.text()).split('\n');
            // TODO use a stream or something to make this more efficient
            lines.forEach(line => {

                const monster = {} as Monster;

                const pokedexIdMatch = line.match(/\s*db\s*DEX_(\w+)/);
                if (pokedexIdMatch) {
                    monster.pokedexId = pokedexIdMatch[1 + 1];
                }

                const statMatch = line.match(/\s*db\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/);
                if (statMatch) {
                    monster.baseHP = parseInt(statMatch[1 + 0]);
                    monster.baseAttack = parseInt(statMatch[1 + 1]);
                    monster.baseDefense = parseInt(statMatch[1 + 2]);
                    monster.baseSpeed = parseInt(statMatch[1 + 3]);
                    monster.baseSpecial = parseInt(statMatch[1 + 4]);
                }
                monsters.push(monster);
            });

        });
        return monsters;
    } catch (e) {
        console.log(e);
    }
};