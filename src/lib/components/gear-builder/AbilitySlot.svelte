<script lang="ts">
	import { dndzone, TRIGGERS, type DndEvent } from 'svelte-dnd-action';
	import { emptyAbility, type Ability } from '$lib/data/abilities';
	import AbilityItem from './AbilityItem.svelte';

	interface Props {
		mainType: string | null;
		disabled?: boolean;
		ability?: Ability;
		items: Ability[];
		dragDisabled?: boolean;
		drag?: (ability: Ability | undefined) => void;
	}

	let {
		mainType = null,
		disabled = false,
		ability = $bindable(emptyAbility),
		items = $bindable([]),
		dragDisabled = false,
		drag
	}: Props = $props();

	function handleConsider(event: CustomEvent<DndEvent<Ability>>) {
		const { trigger, id } = event.detail.info;

		if (trigger === TRIGGERS.DRAG_STARTED) {
			const draggedAbility = items.find((ability) => ability.id === id);
			if (drag) drag(draggedAbility);
		}

		items = event.detail.items;
	}

	function handleFinalize(event: CustomEvent<DndEvent<Ability>>) {
		if (drag) drag(undefined);

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
		dragDisabled,
		dropTargetStyle: {}
	}}
	class:disabled
	onconsider={handleConsider}
	onfinalize={handleFinalize}
>
	{#each items as item, index (item.id)}
		{#if index === 0}
			<AbilityItem interact={removeItem} ability={item} />
		{/if}
	{/each}
</div>

<style>
	div {
		background-color: var(--spl-color-item-bg);
		border: 2px solid var(--spl-color-outline-high);
		border-right: 0;
		border-bottom: 0;
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		background-image: url('/src/lib/images/abilities/None.png');
		background-size: contain;
		transition: opacity 0.1s;

		&:nth-child(4n - 3) {
			width: 4rem;
			height: 4rem;
		}

		& :global(button) {
			outline: 0;
		}
	}

	.disabled {
		opacity: 0.25;
		pointer-events: none;
	}
</style>
