import { useCallback, useContext } from "preact/hooks";
import { State } from "../../../state";
import { SidebarDetail } from "./SidebarDetail";
import { Monster } from "../data/Monster";

export interface RowProps {
    monster: Monster;
    
    pinCallback?: (monster: Monster) => void;
    pinButtonText?: string;
}

export const Row = (props: RowProps) => {
    const state = useContext(State);
    const setSidebar = useCallback(() => {
        state.ui.sidebar.value = <SidebarDetail monster={props.monster} />;
    }, []);
    return (
        <tr>
            <td>{props.monster.name}</td>
            <td>{props.monster.type1}</td>
            <td>{props.monster.type2}</td>
            <td>
                {props.pinCallback && (<button onClick={() => props.pinCallback(props.monster)}>{props.pinButtonText}</button>)}
            </td>
            <td>
                <button onClick={setSidebar}>Details</button>
            </td>
        </tr>
    );
}