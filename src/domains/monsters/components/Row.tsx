export interface RowProps {
    name: string;
    type1: string;
    type2: string;
    pinCallback?: (moveName: string) => void;
    pinButtonText?: string;
}

export const Row = (props: RowProps) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.type1}</td>
        <td>{props.type2}</td>
        <td>
            {props.pinCallback && (<button onClick={() => props.pinCallback(props.name)}>{props.pinButtonText}</button>)}
        </td>
    </tr>
)