<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./pages/Home.svelte";
	import Register from "./pages/Register.svelte";
	import DashBoard from "./pages/DashBoard.svelte";
	import Login from "./pages/Login.svelte";
	import NotFound from "./pages/NotFound.svelte";

	export let url = "";

	import { user } from "./lib/store.js";
	import { auth } from "./lib/firebase.js";

	const classActive = "active";
	const classInactive = "inactive";

	const handleLogOut = () => {
		try {
			auth.signOut().set({ ...$user, loggedIn: false });
		} catch (error) {
			console.log(error);
		}
	};

	const getProps = ({ location, href, isPartiallyCurrent, isCurrent }) => {
		const isActive =
			href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
		// The object returned here is spread on the anchor element's attributes
		if (isActive) {
			return { class: classActive };
		} else {
			return { class: classInactive };
		}
	};
</script>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	}

	:global(a) {
		color: rgb(150, 15, 5);
		text-decoration: none;
		font-weight: 400em;
	}
	.app_header {
		display: grid;
		justify-items: center;
		background-color: #f7f7f7;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.app_header_nav {
		display: grid;
		grid-template-columns: 100px 100px 100px;
		column-gap: 10px;
	}
</style>

<main>
	<Router {url}>
		<div class="app_header">
			<ul class="app_header_nav">
				<li>
					<Link to="/" {getProps}>Inicio</Link>
				</li>
				{#if $user.loggedIn}
					<li>
						<Link to="dashBoard" {getProps}>Dashboard</Link>
					</li>
					<li>
						<a class="inactive" href="/" on:click={handleLogOut}>
							Logout
						</a>
					</li>
				{:else}
					<li>
						<Link to="login" {getProps}>Login</Link>
					</li>
					<li>
						<Link to="register" {getProps}>Registro</Link>
					</li>
				{/if}
			</ul>
		</div>
		<div>
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
			<Route path="dashBoard" component={DashBoard} />
			<Route path="*" component={NotFound} />
			<Route path="/">
				<Home />
			</Route>
		</div>
	</Router>
</main>
