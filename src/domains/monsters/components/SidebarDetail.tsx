import { useContext } from "preact/hooks";
import { State } from "../../../state";
import { Monster } from "../data/Monster";

export interface SidebarDetailProps {
    monster: Monster;
}

export const SidebarDetail = (props: SidebarDetailProps) => {
    const state = useContext(State);
    const attackingMatchups = state.data.typeMatchups.value.filter((typeMatchup) => typeMatchup.defendingType.includes(props.monster.type1)
        || typeMatchup.defendingType.includes(props.monster.type2)).map(matchup => `${matchup.effectiveness} ${matchup.defendingType}`);

    const defendingMatchups = state.data.typeMatchups.value.filter((typeMatchup) => typeMatchup.attackingType.includes(props.monster.type1)
        || typeMatchup.attackingType.includes(props.monster.type2)).map(matchup => `${matchup.effectiveness} ${matchup.attackingType}` );

    return <div>
        Base Stats<br />
        HP: {props.monster.baseHP}<br />
        Attack: {props.monster.baseAttack}<br />
        Defense: {props.monster.baseDefense}<br />
        Speed: {props.monster.baseSpeed}<br />
        Special: {props.monster.baseSpecial}<br />
        Growth Rate: {props.monster.growthRate}<br />
        Attacking Matchups: {attackingMatchups.join(', ')}<br />
        Defending Matchups: {defendingMatchups.join(', ')}<br />
    </div>;
};