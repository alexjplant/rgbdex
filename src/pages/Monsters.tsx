import { useContext } from 'preact/hooks';
import { Table } from '../domains/monsters/components/Table';
import { State } from '../state';

export function Monsters() {
	const state = useContext(State);
	state.ui.sidebar.value = null;
	return (
		<Table />
	);
}