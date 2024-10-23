<script lang="ts">
	import type { Ability } from '$lib/data/abilities';
	import {
		dndzone,
		TRIGGERS,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
		type DndEvent
	} from 'svelte-dnd-action';
	import { createEventDispatcher } from 'svelte';
	import AbilityItem from './AbilityItem.svelte';

	export let abilities: Ability[] = [];
	export let disabledAbilities: { [key: string]: boolean } = {};

	const dispatch = createEventDispatcher<Record<string, Ability | undefined>>();

	function handleConsider(event: CustomEvent<DndEvent<Ability>>) {
		const { trigger, id } = event.detail.info;

		if (trigger === TRIGGERS.DRAG_STARTED) {
			const draggedAbility = abilities.find((ability) => ability.id === id);
			dispatch('drag', draggedAbility);

			const idIndex = abilities.findIndex((item) => item.id === id);
			const idNumber = id.toString().split('_')[0];
			const idCopy = id.toString().includes('_') ? id.split('_')[1] : '0';
			const newId = `${idNumber}_${+idCopy + +'1'}`;

			event.detail.items = event.detail.items.filter(
				(item) => !item.hasOwnProperty(SHADOW_ITEM_MARKER_PROPERTY_NAME)
			);

			event.detail.items.splice(idIndex, 0, { ...abilities[idIndex], id: newId });
			abilities = event.detail.items;
		} else {
			abilities = [...abilities];
		}
	}

	function handleFinalize(event: CustomEvent<DndEvent<Ability>>) {
		dispatch('drag', undefined);
		abilities = event.detail.items;
	}
</script>

<div
	use:dndzone={{
		items: abilities,
		flipDurationMs: 200,
		dropFromOthersDisabled: true,
		zoneTabIndex: -1,
		zoneItemTabIndex: -1,
		dropTargetStyle: {}
	}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each abilities as ability (ability.id)}
		<AbilityItem
			disabled={disabledAbilities[ability.mainType || ''] === true ||
				disabledAbilities.all === true}
			on:interact
			{ability}
		/>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 2rem 0;
	}

	div > :global(button) {
		width: 3rem;
		height: 3rem;
	}
</style>
