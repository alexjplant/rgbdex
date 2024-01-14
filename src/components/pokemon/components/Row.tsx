export interface EntryProps {
    name: string;
    effect: string;
    type: string;
    power: number;
    accuracy: number
    pp: number;
}

export const EntryProps = (props: EntryProps) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.effect}</td>
        <td>{props.power}</td>
        <td>{props.type}</td>
        <td>{props.accuracy}</td>
        <td>{props.pp}</td>
    </tr>
)