export interface RowProps {
    name: string;
    effect: string;
    type: string;
    power: number;
    accuracy: number
    pp: number;
    comment: string;
    pinCallback?: (moveName: string) => void;
    pinButtonText?: string;
}

export const Row = (props: RowProps) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.effect}</td>
        <td>{props.power}</td>
        <td>{props.type}</td>
        <td>{props.accuracy}</td>
        <td>{props.pp}</td>
        <td>{props.comment}</td>
        <td>
            {props.pinCallback && (<button onClick={() => props.pinCallback(props.name)}>{props.pinButtonText}</button>)}
        </td>
    </tr>
)