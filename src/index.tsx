import { render } from 'preact';
import { LocationProvider, Router, Route, useLocation } from 'preact-iso';

import { NotFound } from './pages/_404.jsx';
import './style.css';
import { Moves } from './pages/Moves.js';
import { Monsters } from './pages/Monsters.js';
import { TypeMatchups } from './pages/TypeMatchups.js';
import { State, createAppState } from './state.js';
import { useCallback, useContext } from 'preact/hooks';

export function App() {
	const { url } = useLocation();
	const state = useContext(State);
	const closeSidebar = useCallback(() => {
		state.ui.sidebar.value = undefined;
	}, []);
	return (
		<LocationProvider>
			<header>
				<nav>
					<a href="/moves" class={url == '/' && 'active'}>Moves</a>
					<a href="/monsters" class={url == '/' && 'active'}>Monsters</a>
					<a href="/types" class={url == '/' && 'active'}>Types</a>
				</nav>
			</header>
			<div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
			<main style={{flexGrow: 1}}>
				<Router>
					<Route path="/moves" component={Moves} />
					<Route path="/monsters" component={Monsters} />
					<Route path="/types" component={TypeMatchups} />
					<Route default component={NotFound} />
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
