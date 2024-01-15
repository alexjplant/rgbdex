import { useContext } from "preact/hooks";
import { State } from "../../../state";
import { Monster } from "../data/Monster";
import { ComputeTypeMatchups, GetTypeMatchupMultiplier } from "../../types/data/TypeMatchup";

export interface SidebarDetailProps {
    monster: Monster;
}

export const SidebarDetail = (props: SidebarDetailProps) => {
    const state = useContext(State);
    const {attackingMatchups, defendingMatchups} = ComputeTypeMatchups(state.data.typeMatchups.value, props.monster);

    return <div>
        <span style={{fontWeight: 'bold'}}>{props.monster.name}</span><br />
        Type 1: {props.monster.type1}<br />
        Type 2: {props.monster.type2}<br />
        Base Stats<br />
        HP: {props.monster.baseHP}<br />
        Attack: {props.monster.baseAttack}<br />
        Defense: {props.monster.baseDefense}<br />
        Speed: {props.monster.baseSpeed}<br />
        Special: {props.monster.baseSpecial}<br />
        Growth Rate: {props.monster.growthRate}<br />
        Attacking Matchups: {attackingMatchups.map(matchup => <span class='badge'>{matchup}</span>)}<br />
        Defending Matchups: {defendingMatchups.map(matchup => <span class='badge'>{matchup}</span>)}<br />
    </div>;
};