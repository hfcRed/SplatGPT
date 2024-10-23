<script lang="ts">
	import { abilities, emptyAbility, mainIndexes, type Ability } from '$lib/data/abilities';
	import { weapons, type Weapon } from '$lib/data/weapons/index';
	import AbilitySelector from '$lib/components/gear-builder/AbilitySelector.svelte';
	import AbilitySlot from '$lib/components/gear-builder/AbilitySlot.svelte';
	import OutputQuality from '../lib/components/gear-builder/OutputQuality.svelte';
	import Combobox from '$lib/components/common/Combobox.svelte';

	const abilityEntries = Object.values(abilities);
	const mainAbilities: Ability[] = abilityEntries.filter((item) => item.mainType !== 'none');
	const subAbilities: Ability[] = abilityEntries.filter((item) => item.mainType === 'none');

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

	let enabledSlots: 'all' | 'head' | 'clothes' | 'shoes' = 'all';

	function updateEnabledSlots(event: CustomEvent<Ability | undefined>) {
		const ability = event.detail;
		if (!ability || ability.mainType === 'none') {
			enabledSlots = 'all';
			return;
		}
		enabledSlots = ability.mainType || 'all';
	}

	$: disabledAbilities = {
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

	function clearAbilities() {
		slots = slots.map(() => emptyAbility);
	}

	let weapon: Weapon = weapons[Object.keys(weapons)[0]];
</script>

<Combobox bind:current={weapon} title="Weapon" items={Object.values(weapons)} />

<OutputQuality {weapon} {slots} />

<div>
	{#each slots as slot, index}
		<AbilitySlot
			on:drag={updateEnabledSlots}
			bind:ability={slots[index]}
			disabled={enabledSlots === 'all' ? false : mainIndexes[index] === enabledSlots ? false : true}
			items={slot.id === '0' ? [] : [slot]}
			mainType={mainIndexes[index] || null}
		/>
	{/each}
</div>

<AbilitySelector
	on:drag={updateEnabledSlots}
	on:interact={addAbility}
	abilities={subAbilities}
	{disabledAbilities}
/>

<AbilitySelector
	on:drag={updateEnabledSlots}
	on:interact={addAbility}
	abilities={mainAbilities}
	{disabledAbilities}
/>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(4, fit-content(100%));
		gap: 1rem 0.5rem;
		align-items: center;
	}
</style>
