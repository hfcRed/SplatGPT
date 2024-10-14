<script lang="ts">
	import type { DndEvent } from 'svelte-dnd-action';
	import type { Ability } from './abilities';
	import { dndzone } from 'svelte-dnd-action';
	import AbilityItem from './AbilityItem.svelte';

	const emptyAbility: Ability = { id: '100', name: 'Unknown', main: false };

	export let ability: Ability = emptyAbility;
	export let mainType: string | null = null;
	export let items: Ability[] = [];

	function handleConsider(event: CustomEvent<DndEvent<Ability>>) {
		items = event.detail.items;
	}

	function handleFinalize(event: CustomEvent<DndEvent<Ability>>) {
		const item = event.detail.items[0];

		if (item && item.main === true && item.mainType !== mainType) {
			items = [];
			ability = emptyAbility;
			return;
		}

		items = item ? [item] : [];
		ability = item || emptyAbility;
	}

	function removeItem() {
		items = [];
		ability = emptyAbility;
	}
</script>

<div
	use:dndzone={{ items, flipDurationMs: 200 }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
	class={`${mainType ? 'main' : ''}`}
>
	{#each items as item, index (item.id)}
		{#if index === 0}
			<AbilityItem on:interact={removeItem} ability={item} />
		{/if}
	{/each}
</div>

<style>
	div {
		width: 3rem;
		height: 3rem;
		outline: 1px solid red;
		border-radius: 50%;
	}

	.main {
		width: 4rem;
		height: 4rem;
	}
</style>
