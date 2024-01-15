import { useContext } from 'preact/hooks';
import { Table } from '../components/Table';
import { State } from '../../../state';

export const List = () => {
    const state = useContext(State);
    return <Table typeMatchups={state.data.typeMatchups.value} />
}