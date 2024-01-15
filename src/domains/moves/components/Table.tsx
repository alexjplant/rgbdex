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
    const filterTypeOnInput = useCallback((event: JSX.TargetedEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value) {
            setFilterType(event.currentTarget.value);
        } else {
            setFilterType(undefined);
        }
    }, []);

    const effects = new Set(props.moves.map((move) => move.effect));
    const [filterEffect, setFilterEffect] = useState<string | undefined>(undefined);
    const filterEffectOnInput = useCallback((event: JSX.TargetedEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value) {
            setFilterEffect(event.currentTarget.value);
        } else {
            setFilterEffect(undefined);
        }
    }, []);

    const [filterName, setFilterName] = useState<string | undefined>(undefined);
    const filterNameOnInput = useCallback((event: JSX.TargetedEvent<HTMLInputElement>) => {
        if (event.currentTarget.value) {
            setFilterName(event.currentTarget.value);
        } else {
            setFilterName(undefined);
        }
    }, []);

    const [filterMinPP, setFilterMinPP] = useState<number | undefined>(undefined);
    const filterMinPPOnInput = useCallback((event: JSX.TargetedEvent<HTMLInputElement>) => {
        if (event.currentTarget.value) {
            setFilterMinPP(parseInt(event.currentTarget.value));
        } else {
            setFilterMinPP(undefined);
        }
    }, []);

    const [filterMinAccuracy, setFilterMinAccuracy] = useState<number | undefined>(undefined);
    const filterMinAccuracyOnInput = useCallback((event: JSX.TargetedEvent<HTMLInputElement>) => {
        if (event.currentTarget.value) {
            setFilterMinAccuracy(parseInt(event.currentTarget.value));
        } else {
            setFilterMinAccuracy(undefined);
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
    // TODO dynamically build a filter function and iterate once
    if (filterName) {
        filteredMoves = filteredMoves.filter((move) => move.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
            move.comment.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }
    if (filterEffect) {
        filteredMoves = filteredMoves.filter((move) => move.effect === filterEffect);
    }
    if (filterType) {
        filteredMoves = filteredMoves.filter((move) => move.type === filterType);
    }
    if (filterMinAccuracy) {
        filteredMoves = filteredMoves.filter((move) => move.accuracy >= filterMinAccuracy);
    }
    if (filterMinPP) {
        filteredMoves = filteredMoves.filter((move) => move.pp >= filterMinPP);
    }

    return <table>
        <thead>
            <tr>
                <td>
                    <input type="search" onInput={filterNameOnInput} />
                </td>
                <td>
                    <select type="select" onInput={filterEffectOnInput}>
                        <option value="">ALL</option>
                        {Array.from(effects).map((effect) => <option>{effect}</option>)}
                    </select>

                </td>
                <td></td>
                <td>
                    <select type="select" onInput={filterTypeOnInput}>
                        <option value="">ALL</option>
                        {Array.from(types).map((type) => <option>{type}</option>)}
                    </select>
                </td>
                <td>
                    <input type="search" onInput={filterMinAccuracyOnInput} placeholder='Minimum Accuracy' />
                </td>
                <td>
                    <input type="search" onInput={filterMinPPOnInput} placeholder='Minimum PP'/>
                </td>
            </tr>
            <tr>
                <td>
                    Name
                </td>
                <td>Effect</td>
                <td>Power</td>
                <td>
                    Type
                </td>
                <td>
                    Accuracy
                </td>
                <td>
                    PP
                </td>
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