<script lang="ts">
	import type { Ability } from '$lib/data/abilities';
	import { abilityImages } from '$lib/images';

	interface Props {
		ability: Ability;
		disabled?: boolean;
		interact: (ability: Ability) => void;
	}

	let { ability, disabled = false, interact }: Props = $props();

	function fireInteract() {
		interact(ability);
	}
</script>

<button
	class={`${ability.mainType !== 'none' ? `main ${ability.mainType}` : ''}`}
	{disabled}
	onclick={fireInteract}
	aria-label={ability.name}
>
	<enhanced:img
		src={abilityImages[`/src/lib/images/abilities/${ability.name}.png`]}
		alt={ability.name}
	/>
</button>

<style>
	button {
		background-color: var(--spl-color-item-bg);
		outline: 1px solid var(--spl-color-item-outline);
		outline-offset: -1px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 50%;
		padding: 0.25rem;
		transition: opacity 0.1s;
	}

	[disabled] {
		opacity: 0.25;
		pointer-events: none;
	}

	/* svelte-ignore */
	button :global(img) {
		width: 100%;
		height: 100%;
	}
</style>
