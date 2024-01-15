import { useContext } from 'preact/hooks';
import { List } from '../domains/moves/containers/List';
import { State } from '../state';

export function Moves() {
	const state = useContext(State);
	state.ui.sidebar.value = null;

	return (
		<List />
	);
}