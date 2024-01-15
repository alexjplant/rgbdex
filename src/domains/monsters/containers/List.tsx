import { useContext, useEffect, useState } from 'preact/hooks';
import { Table } from '../components/Table';
import { State } from '../../../state';

export const List = () => {
    const state = useContext(State);
    return <Table monsters={state.data.monsters.value} />
}