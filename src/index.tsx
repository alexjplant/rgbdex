import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './domains/Header.js';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import { Moves } from './pages/Moves.js';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/moves" component={Moves} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
