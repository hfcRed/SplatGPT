<script lang="ts">
	import { abilities, emptyAbility, type Ability } from '$lib/data/abilities';
	import AbilitySlot from './AbilitySlot.svelte';
	import AbilitySelector from './AbilitySelector.svelte';
	import OutputQuality from './OutputQuality.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import { weapons, type Weapon } from '$lib/data/weapons/index';

	const mainIndexes: { [key: number]: string } = { 0: 'head', 4: 'clothes', 8: 'shoes' };

	const entries = Object.values(abilities);
	const mainAbilities: Ability[] = entries.filter((item) => item.mainType !== 'none');
	const subAbilities: Ability[] = entries.filter((item) => item.mainType === 'none');

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
		head: slots[0].id !== '0',
		clothes: slots[4].id !== '0',
		shoes: slots[8].id !== '0',
		all: slots.filter((slot) => slot.id !== '0').length === 12
	};

	function addAbility(event: CustomEvent<Ability>) {
		slots.find((slot, index) => {
			if (slot.id !== '0') return false;

			const newSlot = { ...event.detail, id: Math.floor(Math.random() * 10000000000).toString() };

			if (event.detail.mainType === 'none') {
				slots[index] = newSlot;
				return true;
			}

			if (mainIndexes[index] && event.detail.mainType === mainIndexes[index]) {
				slots[index] = newSlot;
				return true;
			}
		});
	}

	function clearAll() {
		slots = slots.map(() => emptyAbility);
	}

	let enabledSlots: 'all' | 'head' | 'clothes' | 'shoes' | 'none' = 'all';

	function updateEnabledSlots(event: CustomEvent<Ability | undefined>) {
		const ability = event.detail;
		if (!ability || ability.mainType === 'none') {
			enabledSlots = 'all';
			return;
		}
		enabledSlots = ability.mainType || 'all';
	}

	let weapon: Weapon = weapons[Object.keys(weapons)[0]];
</script>

<Combobox title="Weapon" items={Object.values(weapons)} bind:current={weapon} />

<OutputQuality {weapon} {slots} />

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

<style>
	div {
		display: grid;
		grid-template-columns: repeat(4, fit-content(100%));
		gap: 1rem 0.5rem;
		align-items: center;
	}
</style>
