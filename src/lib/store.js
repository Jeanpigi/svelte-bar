import { writable } from 'svelte/store';

const user = writable({ loggedIn: false });

export { user };