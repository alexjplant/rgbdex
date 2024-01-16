import { Monster } from "./Monster";

export const GetAll = async (): Promise<Monster[]> => {
    const list = await GetList();
    const all = await GetMonsters(list);
    return all;
};

export const GetList = async (): Promise<string[]> => {
    try {
        const result = await fetch("https://raw.githubusercontent.com/Vortyne/pureRGB/master/data/pokemon/base_stats.asm")
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

export const GetMonsters = async (monsterNames: string[]): Promise<Monster[]> => {
    try {
        var monsters: Monster[] = []

        await Promise.all(monsterNames.map(async (monsterName) => {
            const result = await fetch(`https://raw.githubusercontent.com/Vortyne/pureRGB/master/data/pokemon/base_stats/${monsterName}.asm`);
            const lines = (await result.text()).split('\n');
            // TODO use a stream or something to make this more efficient
            const monster = {
                name: monsterName,
                baseLearnset: [],
                tmHmLearnset: []
            } as Monster;

            lines.forEach(line => {
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

                // db GRASS, POISON ; type
                const typeMatch = line.match(/\s*db\s*(\w+),\s*(\w+)\s*;\s*type/); 
                if (typeMatch) {
                    monster.type1 = typeMatch[1 + 0];
                    monster.type2 = typeMatch[1 + 1];
                }
            
                // TODO
                // db 255 ; catch rate

                // TODO
                // db 84 ; base exp

                // db BITE, ROAR, NO_MOVE, NO_MOVE ; level 1 learnset
                const baseLearnsetMatch = line.match(/\s*db\s*(\w+),\s*(\w+),\s*(\w+),\s*(\w+)\s*;\s*level 1 learnset/); 
                if (baseLearnsetMatch) {
                    for (const move of baseLearnsetMatch.slice(1)) {
                        if (move !== "NO_MOVE") {
                            monster.baseLearnset.push(move);
                        }
                    }
                }
	            
                // db GROWTH_MEDIUM_SLOW ; growth rate
                const growthRateMatch = line.match(/\s*db\s*(\w+)\s*;\s*growth rate/); 
                if (growthRateMatch) {
                    monster.growthRate = growthRateMatch[1 + 0];
                }
            });

            monsters.push(monster);
            Promise.resolve();
        }));

        return monsters;
    } catch (e) {
        console.log(e);
    }
};