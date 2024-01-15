export interface RowProps {
    attackingType: string;
    defendingType: string;
    effectiveness: string;
}

export const Row = (props: RowProps) => (
    <tr>
        <td>{props.attackingType}</td>
        <td>{props.defendingType}</td>
        <td>{props.effectiveness}</td>
    </tr>
)