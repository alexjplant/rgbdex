import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { Move } from "../data/Move";
import { Row, RowProps } from "./Row";
import { JSX } from "preact";

export interface TableProps {
    moves: Move[];
}

export const Table = (props: TableProps) => {
    const types = new Set(props.moves.map((move) => move.type));
    const [filterType, setFilterType] = useState<string | undefined>(undefined);
    const filterTypeOnChange = useCallback((event: JSX.TargetedEvent<HTMLSelectElement>) => {
        if(event.currentTarget.value) {
            setFilterType(event.currentTarget.value);
        } else {
            setFilterType(undefined);
        }
    }, []);

    const [pinnedMoves, setPinnedMoves] = useState<Move[]>([]);
    const pinnedMoveNames = useMemo(() => pinnedMoves.map((move) => move.name), [pinnedMoves]);
    const pinMove = useCallback((moveName: string) => {
        const move = props.moves.find((move) => move.name === moveName);
        setPinnedMoves([...pinnedMoves, move]);
    }, [pinnedMoves, props.moves]);
    const unpinMove = useCallback((moveName: string) => {
        const move = props.moves.find((move) => move.name === moveName);
        setPinnedMoves(pinnedMoves.filter((move) => move.name !== moveName));
    }, [pinnedMoves, props.moves]);


    enum SortColumn {
        Name = 'name',
        Effect = 'effect',
        Power = 'power',
        Type = 'type',
        Accuracy = 'accuracy',
        PP = 'pp',
    }

    const [filterSort, setFilterSort] = useState<SortColumn>(SortColumn.Name);
    const [filterSortDirection, setFilterSortDirection] = useState<boolean>(true);

    var filteredMoves = props.moves.filter(move => pinnedMoveNames.indexOf(move.name) === -1);
    if (filterType) {
        filteredMoves = filteredMoves.filter((move) => move.type === filterType);
    }

    return <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Effect</td>
                <td>Power</td>
                <td>
                    Type
                    <select type="select" onChange={filterTypeOnChange}>
                        <option value="">ALL</option>
                        {Array.from(types).map((type) => <option>{type}</option>)}
                    </select>
                </td>
                <td>Accuracy</td>
                <td>PP</td>
                <td>Comment</td>
            </tr>
        </thead>
        <tbody>
            {pinnedMoves.map((move) => <Row key={move.name} {...move} pinCallback={unpinMove} pinButtonText="Unpin" />)}
        </tbody>
        <tbody>
            {filteredMoves.map((move) => <Row key={move.name} {...move} pinCallback={pinMove} pinButtonText="Pin" />)}
        </tbody>
    </table>
}