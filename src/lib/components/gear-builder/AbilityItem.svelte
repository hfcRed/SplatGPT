<script lang="ts">
	import type { Ability } from '$lib/data/abilities';
	import { createEventDispatcher } from 'svelte';

	export let ability: Ability;
	export let disabled: boolean = false;

	const images = import.meta.glob('/src/lib/images/abilities/*.png', {
		eager: true,
		query: { enhanced: true }
	});

	const image: any = images[`/src/lib/images/abilities/${ability.name}.png`];

	const dispatch = createEventDispatcher<Record<string, Ability>>();

	function fireInteract() {
		dispatch('interact', ability);
	}
</script>

<button
	on:click={fireInteract}
	class={`${ability.mainType !== 'none' ? `main ${ability.mainType}` : ''}`}
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
		outline: 1px solid var(--spl-color-outline);
		outline-offset: -1px;
		border: none;
		border-radius: 50%;
		background-color: var(--spl-color-bg-low);
		padding: 0.25rem;
		transition: opacity 0.1s;
	}

	[disabled] {
		opacity: 0.25;
		pointer-events: none;
	}

	img {
		width: 100%;
		height: 100%;
	}
</style>
