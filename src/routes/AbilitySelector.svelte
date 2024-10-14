<script lang="ts">
	import type { DndEvent } from 'svelte-dnd-action';
	import type { Ability } from './abilities';
	import { dndzone, TRIGGERS, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import AbilityItem from './AbilityItem.svelte';

	export let abilities: Ability[] = [];

	function handleConsider(event: CustomEvent<DndEvent<Ability>>) {
		const { trigger, id } = event.detail.info;

		if (trigger === TRIGGERS.DRAG_STARTED) {
			const idIndex = abilities.findIndex((item) => item.id === id);
			const idNumber = id.toString().split('_')[0];
			const idCopy = id.toString().includes('_') ? id.split('_')[1] : '0';
			const newId = `${idNumber}_${+idCopy + +'1'}`;

			event.detail.items = event.detail.items.filter(
				(item: any) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]
			);

			event.detail.items.splice(idIndex, 0, { ...abilities[idIndex], id: newId });
			abilities = event.detail.items;
		} else {
			abilities = [...abilities];
		}
	}

	function handleFinalize(event: CustomEvent<DndEvent<Ability>>) {
		abilities = event.detail.items;
	}
</script>

<div
	use:dndzone={{ items: abilities, flipDurationMs: 200, dropFromOthersDisabled: true }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each abilities as ability (ability.id)}
		<AbilityItem {ability} />
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
