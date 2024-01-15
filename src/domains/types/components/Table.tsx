import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { TypeMatchup } from "../data/TypeMatchup";
import { Row, RowProps } from "./Row";
import { JSX } from "preact";

export interface TableProps {
    typeMatchups: TypeMatchup[];
}

export const Table = (props: TableProps) => {
    // const types = new Set(...props.typeMatchups.map((typeMatchup) => typeMatchup.attackingType));
    const types = new Set(props.typeMatchups.flatMap((typeMatchup) => [typeMatchup.attackingType, typeMatchup.defendingType]));

    const [filterAttackingType, setFilterAttackingType] = useState<string | undefined>(undefined);
    const filterAttackingTypeOnInput = useCallback((event: JSX.TargetedEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value) {
            setFilterAttackingType(event.currentTarget.value);
        } else {
            setFilterAttackingType(undefined);
        }
    }, []);
    
    const [filterDefendingType, setFilterDefendingType] = useState<string | undefined>(undefined);
    const filterDefendingTypeOnInput = useCallback((event: JSX.TargetedEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value) {
            setFilterDefendingType(event.currentTarget.value);
        } else {
            setFilterDefendingType(undefined);
        }
    }, []);

    var filteredMatchups = props.typeMatchups;
    // TODO dynamically build a filter function and iterate once
    if (filterAttackingType) {
        filteredMatchups = filteredMatchups.filter((typeMatchup) => typeMatchup.attackingType === filterAttackingType);
    }
    if (filterDefendingType) {
        filteredMatchups = filteredMatchups.filter((typeMatchup) => typeMatchup.defendingType === filterDefendingType);
    }

    return <table>
        <thead>
            <tr>
                <td>
                    <select type="select" onInput={filterAttackingTypeOnInput}>
                        <option value="">ALL</option>
                        {Array.from(types).map((type) => <option>{type}</option>)}
                    </select>
                </td>
                <td>
                    <select type="select" onInput={filterDefendingTypeOnInput}>
                        <option value="">ALL</option>
                        {Array.from(types).map((type) => <option>{type}</option>)}
                    </select>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>Attacking Type</td>
                <td>Defending Type</td>
                <td>Effectiveness</td>
            </tr>
        </thead>
        <tbody>
            {filteredMatchups.map((typeMatchup) => <Row key={`${typeMatchup.attackingType},${typeMatchup.defendingType}`} {...typeMatchup} />)}
        </tbody>
    </table>
}