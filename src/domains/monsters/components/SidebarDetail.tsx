import { useContext } from "preact/hooks";
import { State } from "../../../state";
import { Monster } from "../data/Monster";
import { GetTypeMatchupMultiplier } from "../../types/data/TypeMatchup";

export interface SidebarDetailProps {
    monster: Monster;
}

export const SidebarDetail = (props: SidebarDetailProps) => {
    const state = useContext(State);
    const defendingMatchups = state.data.typeMatchups.value.filter((typeMatchup) => typeMatchup.defendingType === props.monster.type1);
    const attackingMatchups = state.data.typeMatchups.value.filter((typeMatchup) => typeMatchup.attackingType == props.monster.type1);
    if (props.monster.type1 !== props.monster.type2) {
        defendingMatchups.push(...state.data.typeMatchups.value.filter(typeMatchup => typeMatchup.defendingType == props.monster.type2));
        attackingMatchups.push(...state.data.typeMatchups.value.filter(typeMatchup => typeMatchup.attackingType == props.monster.type2));
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

    const formattedAttackingMatchups = [];
    const formattedDefendingMatchups = [];
    computedAttackingMatchups.forEach((effectiveness, type) => {
        if (effectiveness !== 1) {
            formattedAttackingMatchups.push(`${effectiveness}x against ${type}`);
        }
    });
    computedDefendingMatchups.forEach((effectiveness, type) => {
        if (effectiveness !== 1) {
            formattedDefendingMatchups.push(`${type} does ${effectiveness}x`);
        }
    });

    return <div>
        Type 1: {props.monster.type1}<br />
        Type 2: {props.monster.type2}<br />
        Base Stats<br />
        HP: {props.monster.baseHP}<br />
        Attack: {props.monster.baseAttack}<br />
        Defense: {props.monster.baseDefense}<br />
        Speed: {props.monster.baseSpeed}<br />
        Special: {props.monster.baseSpecial}<br />
        Growth Rate: {props.monster.growthRate}<br />
        Attacking Matchups: {formattedAttackingMatchups.join(', ')}<br />
        Defending Matchups: {formattedDefendingMatchups.join(', ')}<br />
    </div>;
};