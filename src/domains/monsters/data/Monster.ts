export interface Monster {
    name: string;
    pokedexId: string;
    type1: string;
    type2: string;
    baseHP: number;
    baseAttack: number;
    baseDefense: number;
    baseSpeed: number;
    baseSpecial: number;
    growthRate: string;
    // TODO base learnset
    // TODO TM/HM learnset
}