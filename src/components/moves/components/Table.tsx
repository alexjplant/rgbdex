import { useState } from "preact/hooks";
import { Move } from "../data/Move";
import { EntryProps } from "./Row";

export interface TableProps {
    moves: Move[];
}

export const Table = (props: TableProps) => {
    return <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Effect</td>
                <td>Power</td>
                <td>Type</td>
                <td>Accuracy</td>
                <td>PP</td>
            </tr>
        </thead>
        <tbody>
            {props.moves.map((move) => <EntryProps key={move.name} {...move} />)}
        </tbody>
    </table>
}