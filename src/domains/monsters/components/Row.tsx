import { useCallback, useContext, useEffect } from "preact/hooks";
import { State } from "../../../state";

export interface RowProps {
    name: string;
    type1: string;
    type2: string;

    baseHP: number;
    baseAttack: number;
    baseDefense: number;
    baseSpeed: number;
    baseSpecial: number;
    growthRate: string;

    pinCallback?: (moveName: string) => void;
    pinButtonText?: string;
}

export const Row = (props: RowProps) => {
    const state = useContext(State);
    const setSidebar = useCallback(() => {
        state.ui.sidebar.value = <div>
            Base Stats<br />
            HP: {props.baseHP}<br />
            Attack: {props.baseAttack}<br />
            Defense: {props.baseDefense}<br />
            Speed: {props.baseSpeed}<br />
            Special: {props.baseSpecial}<br />
            Growth Rate: {props.growthRate}<br />
        </div>;
    }, []);
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.type1}</td>
            <td>{props.type2}</td>
            <td>
                {props.pinCallback && (<button onClick={() => props.pinCallback(props.name)}>{props.pinButtonText}</button>)}
            </td>
            <td>
                <button onClick={setSidebar}>Details</button>
            </td>
        </tr>
    );
}