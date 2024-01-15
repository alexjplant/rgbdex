import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<a href="/moves" class={url == '/' && 'active'}>Moves</a>
				<a href="/monsters" class={url == '/' && 'active'}>Monsters</a>
				<a href="/types" class={url == '/' && 'active'}>Types</a>
			</nav>
		</header>
	);
}
