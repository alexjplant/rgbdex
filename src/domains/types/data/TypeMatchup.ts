import { Monster } from "../../monsters/data/Monster";

export interface TypeMatchup {
    attackingType: string;
    defendingType: string;
    effectiveness: string;
}

export const GetTypeMatchupMultiplier = (typeMatchup: TypeMatchup) => {
    switch (typeMatchup.effectiveness) {
        case "NO_EFFECT":
            return 0;
        case "NOT_VERY_EFFECTIVE":
            return 0.5;
        case "EFFECTIVE":
            return 1;
        case "SUPER_EFFECTIVE":
            return 2;
        default:
            throw new Error(`Unknown effectiveness: ${typeMatchup.effectiveness}`);
    }
} ;

export const ComputeTypeMatchups = (typeMatchups: TypeMatchup[], monster: Monster) => {
    const defendingMatchups = typeMatchups.filter((typeMatchup) => typeMatchup.defendingType === monster.type1);
    const stabMatchups = typeMatchups.filter((typeMatchup) => typeMatchup.attackingType == monster.type1);
    if (monster.type1 !== monster.type2) {
        defendingMatchups.push(...typeMatchups.filter(typeMatchup => typeMatchup.defendingType == monster.type2));
        stabMatchups.push(...typeMatchups.filter(typeMatchup => typeMatchup.attackingType == monster.type2));
    }

    const computedStabMatchups = new Map<string, number>();
    const computedDefendingMatchups = new Map<string, number>();
    for(const matchup of stabMatchups) {
        const computedEffectiveness = GetTypeMatchupMultiplier(matchup);
        if (computedStabMatchups.has(matchup.defendingType)) {
            computedStabMatchups.set(matchup.defendingType, computedStabMatchups.get(matchup.defendingType) * computedEffectiveness);
        } else {
            computedStabMatchups.set(matchup.defendingType, computedEffectiveness * 1.5);
        }
    }
    for(const matchup of defendingMatchups) {
        const computedEffectiveness = GetTypeMatchupMultiplier(matchup);
        if (computedDefendingMatchups.has(matchup.attackingType)) {
            computedDefendingMatchups.set(matchup.attackingType, computedDefendingMatchups.get(matchup.attackingType) * computedEffectiveness);
        } else {
            computedDefendingMatchups.set(matchup.attackingType, computedEffectiveness);
        }
    }

    const formattedStabMatchups: string[] = [];
    const formattedDefendingMatchups: string[] = [];
    computedStabMatchups.forEach((effectiveness, type) => {
        if (effectiveness !== 1) {
            formattedStabMatchups.push(`${effectiveness}x vs. ${type}`);
        }
    });
    computedDefendingMatchups.forEach((effectiveness, type) => {
        if (effectiveness !== 1) {
            formattedDefendingMatchups.push(`${type} does ${effectiveness}x`);
        }
    });
    return {
        stabMatchups : formattedStabMatchups,
        defendingMatchups: formattedDefendingMatchups
    };
};

export const ComputeMonsterMatchup = (typeMatchups: TypeMatchup[], attacker: Monster, defender: Monster) => {
    
};