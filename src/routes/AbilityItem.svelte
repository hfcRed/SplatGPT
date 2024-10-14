<script lang="ts">
	import type { Ability } from './abilities';
	import { createEventDispatcher } from 'svelte';

	export let ability: Ability;

	const images = import.meta.glob('../lib/images/abilities/*.png', {
		eager: true,
		query: { enhanced: true }
	});

	const image: any = images[`../lib/images/abilities/${ability.name}.png`];

	const dispatch = createEventDispatcher<Record<string, Ability>>();

	function fireInteract() {
		dispatch('interact', ability);
	}
</script>

<button on:click={fireInteract} class={`${ability.main ? 'main' : ''}`}>
	<enhanced:img src={image.default} alt={ability.name} />
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		outline: 1px solid cornflowerblue;
		border: none;
		border-radius: 50%;
		background-color: black;
	}

	img {
		width: 100%;
		height: 100%;
	}
</style>
