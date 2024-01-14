import preactLogo from '../../assets/preact.svg';
import * as Moves from '../../components/moves/containers/List';
import './style.css';

export function Home() {
	return (
		<div class="home">
			<Moves.List />
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
