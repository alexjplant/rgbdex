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
} 