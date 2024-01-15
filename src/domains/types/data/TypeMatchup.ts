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
    const attackingMatchups = typeMatchups.filter((typeMatchup) => typeMatchup.attackingType == monster.type1);
    if (monster.type1 !== monster.type2) {
        defendingMatchups.push(...typeMatchups.filter(typeMatchup => typeMatchup.defendingType == monster.type2));
        attackingMatchups.push(...typeMatchups.filter(typeMatchup => typeMatchup.attackingType == monster.type2));
    }

    const computedAttackingMatchups = new Map<string, number>();
    const computedDefendingMatchups = new Map<string, number>();
    for(const matchup of attackingMatchups) {
        const computedEffectiveness = GetTypeMatchupMultiplier(matchup);
        if (computedAttackingMatchups.has(matchup.defendingType)) {
            computedAttackingMatchups.set(matchup.defendingType, computedAttackingMatchups.get(matchup.defendingType) * computedEffectiveness);
        } else {
            computedAttackingMatchups.set(matchup.defendingType, computedEffectiveness);
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

    const formattedAttackingMatchups: string[] = [];
    const formattedDefendingMatchups: string[] = [];
    computedAttackingMatchups.forEach((effectiveness, type) => {
        if (effectiveness !== 1) {
            formattedAttackingMatchups.push(`${effectiveness}x vs. ${type}`);
        }
    });
    computedDefendingMatchups.forEach((effectiveness, type) => {
        if (effectiveness !== 1) {
            formattedDefendingMatchups.push(`${type} does ${effectiveness}x`);
        }
    });
    return {
        attackingMatchups: formattedAttackingMatchups,
        defendingMatchups: formattedDefendingMatchups
    };
};

export const ComputeMonsterMatchup = (typeMatchups: TypeMatchup[], attacker: Monster, defender: Monster) => {
    
};