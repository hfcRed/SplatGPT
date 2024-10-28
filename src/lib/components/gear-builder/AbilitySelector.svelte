<script lang="ts">
	import type { Ability } from '$lib/data/abilities';
	import { dndzone, TRIGGERS, type DndEvent } from 'svelte-dnd-action';
	import AbilityItem from './AbilityItem.svelte';

	interface Props {
		abilities: Ability[];
		disabledAbilities?: { [key: string]: boolean };
		interact: (ability: Ability) => void;
		drag: (ability: Ability | undefined) => void;
	}

	let { abilities = $bindable([]), disabledAbilities = {}, interact, drag }: Props = $props();

	function handleConsider(event: CustomEvent<DndEvent<Ability>>) {
		const { trigger, id } = event.detail.info;

		if (trigger === TRIGGERS.DRAG_STARTED) {
			const draggedAbility = abilities.find((ability) => ability.id === id);
			drag(draggedAbility);

			const idIndex = abilities.findIndex((item) => item.id === id);
			const idNumber = id.toString().split('_')[0];
			const idCopy = id.toString().includes('_') ? id.split('_')[1] : '0';
			const newId = `${idNumber}_${+idCopy + +'1'}`;

			event.detail.items = event.detail.items.filter(
				(item) => !item.hasOwnProperty('isDndShadowItem')
			);

			event.detail.items.splice(idIndex, 0, { ...abilities[idIndex], id: newId });
			abilities = event.detail.items;
		} else {
			abilities = [...abilities];
		}
	}

	function handleFinalize(event: CustomEvent<DndEvent<Ability>>) {
		drag(undefined);
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
	onconsider={handleConsider}
	onfinalize={handleFinalize}
>
	{#each abilities as ability (ability.id)}
		<AbilityItem
			disabled={disabledAbilities[ability.mainType || ''] === true ||
				disabledAbilities.all === true}
			{interact}
			{ability}
		/>
	{/each}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	div > :global(button) {
		width: 3rem;
		height: 3rem;
	}
</style>
