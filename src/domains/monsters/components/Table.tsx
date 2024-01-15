import { useCallback, useContext, useEffect, useMemo, useState } from "preact/hooks";
import { Monster } from "../data/Monster";
import { Row, RowProps } from "./Row";
import { JSX } from "preact";
import { State } from "../../../state";

export interface TableProps {
}

export const Table = (props: TableProps) => {
    const state = useContext(State);
    const monsters = state.data.monsters.value; 
    const types = new Set(monsters.map((monsters) => monsters.type1));
    // TODO check secondary type just in case...
    const [filterType, setFilterType] = useState<string | undefined>(undefined);
    const filterTypeOnInput = useCallback((event: JSX.TargetedEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value) {
            setFilterType(event.currentTarget.value);
        } else {
            setFilterType(undefined);
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

    const [pinnedMonsters, setPinnedMonsters] = useState<Monster[]>([]);
    const pinnedMonsterNames = useMemo(() => pinnedMonsters.map((move) => move.name), [pinnedMonsters]);
    const pinMonster = useCallback((monster: Monster) => {
        const move = monsters.find((currentMonster) => currentMonster.name === monster.name);
        setPinnedMonsters([...pinnedMonsters, move]);
    }, [pinnedMonsters, monsters]);
    const unpinMonster = useCallback((monster: Monster) => {
        const move = monsters.find((currentMonster) => currentMonster.name === monster.name);
        setPinnedMonsters(pinnedMonsters.filter((currentMonster) => currentMonster.name !== monster.name));
    }, [pinnedMonsters, monsters]);


    enum SortColumn {
        Name = 'name',
        Type = 'type',
    }

    const [filterSort, setFilterSort] = useState<SortColumn>(SortColumn.Name);
    const [filterSortDirection, setFilterSortDirection] = useState<boolean>(true);

    var filteredMonsters = monsters.filter(monster => pinnedMonsterNames.indexOf(monster.name) === -1);
    // TODO dynamically build a filter function and iterate once
    if (filterName) {
        filteredMonsters = filteredMonsters.filter((monster) => monster.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }
    if (filterType) {
        filteredMonsters = filteredMonsters.filter((monster) => monster.type1 === filterType || monster.type2 == filterType);
    }

    return <table>
        <thead>
            <tr>
                <td>
                    <input type="search" onInput={filterNameOnInput} />
                </td>
                <td>
                    <select type="select" onInput={filterTypeOnInput}>
                        <option value="">ALL</option>
                        {Array.from(types).map((type) => <option>{type}</option>)}
                    </select>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>Name</td>
                <td>Type 1</td>
                <td>Type 2</td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {pinnedMonsters.map((monster) => <Row key={monster.name} monster={monster} pinCallback={unpinMonster} pinButtonText="Unpin" />)}
        </tbody>
        <tbody>
            {filteredMonsters.map((monster) => <Row key={monster.name} monster={monster} pinCallback={pinMonster} pinButtonText="Pin" />)}
        </tbody>
    </table>
}