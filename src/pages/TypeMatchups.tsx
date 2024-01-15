import { useContext } from 'preact/hooks';
import { List } from '../domains/types/containers/List';
import { State } from '../state';

export function TypeMatchups() {
	const state = useContext(State);
	state.ui.sidebar.value = null;
	return (
		<List />
	);
}