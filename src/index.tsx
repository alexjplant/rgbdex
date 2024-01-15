import { render } from 'preact';
import { LocationProvider, Router, Route, useLocation } from 'preact-iso';

import './style.css';
import { Moves } from './pages/Moves.js';
import { Monsters } from './pages/Monsters.js';
import { TypeMatchups } from './pages/TypeMatchups.js';
import * as MonsterClient from './domains/monsters/data/Client.js';
import * as MovesClient from './domains/moves/data/Client.js';
import * as TypesClient from './domains/types/data/Client.js';
import { State, createAppState } from './state.js';
import { useCallback, useContext, useEffect } from 'preact/hooks';

export function App() {
	const { url } = useLocation();
	const state = useContext(State);
	const closeSidebar = useCallback(() => {
		state.ui.sidebar.value = undefined;
	}, []);
	const populateData = useCallback(async () => {
		state.data.monsters.value = await MonsterClient.GetAll();
		state.data.moves.value = await MovesClient.GetAll();
		state.data.typeMatchups.value = await TypesClient.GetAll();
	}, []);

	useEffect(() => {
		populateData();
	}, []);

	return (
		<LocationProvider>
			<header>
				<nav>
					<a href="/moves" class={url == '/' && 'active'}>Moves</a> &nbsp;
					<a href="/monsters" class={url == '/' && 'active'}>Monsters</a> &nbsp; 
					<a href="/types" class={url == '/' && 'active'}>Types</a>&nbsp;
				</nav>
			</header>
			<div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
			<main style={{flexGrow: 1}}>
				<Router>
					<Route path="/moves" component={Moves} />
					<Route path="/monsters" component={Monsters} />
					<Route path="/types" component={TypeMatchups} />
					<Route default component={Moves} />
				</Router>
			</main>
			{state.ui.sidebar.value && (<aside style={{width: '300px'}}> 
				<button onClick={closeSidebar} >Close</button>
				{state.ui.sidebar.value}
			</aside>)}
			</div>
		</LocationProvider>
	);
}

render(<State.Provider value={createAppState()}><App /></State.Provider>, document.getElementById('app'));
