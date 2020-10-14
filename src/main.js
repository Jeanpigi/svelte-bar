import App from './App.svelte';
import './lib/firebase.js';

const app = new App({
	target: document.body,
	hydrate: true
});

export default app;