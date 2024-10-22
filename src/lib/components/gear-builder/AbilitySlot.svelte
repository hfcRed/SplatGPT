<script lang="ts">
	import type { DndEvent } from 'svelte-dnd-action';
	import { emptyAbility, type Ability } from '$lib/data/abilities';
	import { createEventDispatcher } from 'svelte';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import AbilityItem from './AbilityItem.svelte';

	export let ability: Ability = emptyAbility;
	export let mainType: string | null = null;
	export let items: Ability[] = [];
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher<Record<string, Ability | undefined>>();

	function handleConsider(event: CustomEvent<DndEvent<Ability>>) {
		const { trigger, id } = event.detail.info;

		if (trigger === TRIGGERS.DRAG_STARTED) {
			const draggedAbility = items.find((ability) => ability.id === id);
			dispatch('drag', draggedAbility);
		}

		items = event.detail.items;
	}

	function handleFinalize(event: CustomEvent<DndEvent<Ability>>) {
		dispatch('drag', undefined);

		const item = event.detail.items[0];

		if (item && item.mainType !== 'none' && item.mainType !== mainType) {
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
	use:dndzone={{
		items,
		flipDurationMs: 200,
		zoneTabIndex: -1,
		zoneItemTabIndex: -1,
		dropFromOthersDisabled: disabled,
		dropTargetStyle: {}
	}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
	class={`${mainType ? 'main' : ''} ${disabled ? 'disabled' : ''}`}
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
		border: 2px solid var(--spl-color-outline-high);
		border-right: 0;
		border-bottom: 0;
		border-radius: 50%;
		background-image: url('../lib/images/abilities/None.png');
		background-size: contain;
		background-color: var(--spl-color-bg-low);
		transition: opacity 0.1s;
	}

	.main {
		width: 4rem;
		height: 4rem;
	}

	.disabled {
		opacity: 0.25;
		pointer-events: none;
	}

	div > :global(button) {
		outline: 0;
	}
</style>
