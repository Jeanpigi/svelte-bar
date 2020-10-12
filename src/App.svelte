<script>
	import { Router, Link, Route } from "svelte-routing";
	import Register from "./components/Register.svelte";
	import Dashboard from "./components/DashBoard.svelte";
	import Login from "./components/Login.svelte";

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

	.app_header_nav > li {
		color: white;
		text-decoration: none;
	}

	.app_home {
		padding: 10px;
	}

	.app_home_container {
		display: grid;
		justify-content: center;
	}

	.app_home_container > h1 {
		justify-self: center;
	}
</style>

<main>
	<Router>
		<div class="app_header">
			<ul class="app_header_nav">
				<li>
					<Link to="/" {getProps}>Inicio</Link>
				</li>
				{#if $user.loggedIn}
					<li>
						<Link to="dashboard" {getProps}>Dashboard</Link>
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

		<Route path="login" component={Login} />
		<Route path="register" component={Register} />
		<Route path="dashboard" component={Dashboard} />
		<Route path="/">
			<div class="app_home">
				<div class="app_home_container">
					<h1>Bienvenido a tu Tienda</h1>
					<p>
						La vista de los contenidos está protegida, deberás
						registrarte o iniciar sesión en tu cuenta
					</p>
				</div>
			</div>
		</Route>
	</Router>
</main>
