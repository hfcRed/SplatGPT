<script lang="ts">
	import type { Ability } from './abilities';
	import { createEventDispatcher } from 'svelte';

	export let ability: Ability;
	export let disabled: boolean = false;

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

<button
	on:click={fireInteract}
	class={`${ability.main ? `main ${ability.mainType}` : ''}`}
	{disabled}
>
	<enhanced:img src={image.default} alt={ability.name} />
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border: 1px solid var(--spl-color-outline);
		border-radius: 50%;
		background-color: var(--spl-color-bg-low);
		transition: opacity 0.1s;
	}

	[disabled] {
		opacity: 0.5;
		pointer-events: none;
	}

	img {
		width: 100%;
		height: 100%;
	}
</style>
