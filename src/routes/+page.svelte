<script lang="ts">
	import type { Ability } from './abilities';
	import { abilities, emptyAbility } from './abilities';
	import AbilitySlot from './AbilitySlot.svelte';
	import AbilitySelector from './AbilitySelector.svelte';
	import OutputQuality from './OutputQuality.svelte';

	const mainIndexes: { [key: number]: string } = { 0: 'head', 4: 'clothes', 8: 'shoes' };
	const mainAbilities: Ability[] = abilities.filter((item) => item.main === true);
	const subAbilities: Ability[] = abilities.filter((item) => item.main === false);

	let slots: Ability[] = [
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility
	];

	$: disabledStates = {
		head: slots[0].id !== '100',
		clothes: slots[4].id !== '100',
		shoes: slots[8].id !== '100',
		all: slots.filter((slot) => slot.id !== '100').length === 12
	};

	function addAbility(event: CustomEvent<Ability>) {
		slots.find((slot, index) => {
			if (slot.id !== '100') return false;

			if (!event.detail.main) {
				slots[index] = event.detail;
				return true;
			}

			if (mainIndexes[index] && event.detail.mainType === mainIndexes[index]) {
				slots[index] = event.detail;
				return true;
			}
		});
	}

	function clearAll() {
		slots = slots.map(() => emptyAbility);
	}

	let enabledSlots: 'all' | 'head' | 'clothes' | 'shoes' = 'all';

	function updateEnabledSlots(event: CustomEvent<Ability | undefined>) {
		const ability = event.detail;
		if (!ability || ability.main === false) {
			enabledSlots = 'all';
			return;
		}
		enabledSlots = ability.mainType || 'all';
	}
</script>

<div>
	{#each slots as slot, index}
		<AbilitySlot
			on:drag={updateEnabledSlots}
			disabled={enabledSlots === 'all' ? false : mainIndexes[index] === enabledSlots ? false : true}
			items={slot.id === '100' ? [] : [slot]}
			bind:ability={slots[index]}
			mainType={mainIndexes[index] || null}
		/>
	{/each}
</div>

<AbilitySelector
	on:drag={updateEnabledSlots}
	on:interact={addAbility}
	abilities={subAbilities}
	{disabledStates}
/>
<AbilitySelector
	on:drag={updateEnabledSlots}
	on:interact={addAbility}
	abilities={mainAbilities}
	{disabledStates}
/>

<OutputQuality {slots} />

<style>
	div {
		display: grid;
		grid-template-columns: repeat(4, fit-content(100%));
		gap: 1rem 0.5rem;
		align-items: center;
	}
</style>
