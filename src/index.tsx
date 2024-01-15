import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './domains/Header.js';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import { Moves } from './pages/Moves.js';
import { Monsters } from './pages/Monsters.js';
import { TypeMatchups } from './pages/TypeMatchups.js';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/moves" component={Moves} />
					<Route path="/monsters" component={Monsters} />
					<Route path="/types" component={TypeMatchups} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
