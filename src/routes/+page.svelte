<script lang="ts">
	import type { Ability } from './abilities';
	import { abilities } from './abilities';
	import AbilitySlot from './AbilitySlot.svelte';
	import AbilitySelector from './AbilitySelector.svelte';

	const emptyAbility: Ability = { id: '100', name: 'Unknown', main: false };
	const mainIndexes: { [key: number]: string } = { 0: 'head', 3: 'clothes', 6: 'shoes' };
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
		emptyAbility
	];

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
</script>

<div>
	{#each slots as slot, index}
		<AbilitySlot
			items={slot.id === '100' ? [] : [slot]}
			bind:ability={slots[index]}
			mainType={mainIndexes[index] || null}
		/>
	{/each}
</div>

<AbilitySelector on:interact={addAbility} on:add={addAbility} abilities={subAbilities} />
<AbilitySelector on:interact={addAbility} abilities={mainAbilities} />

<style>
	div {
		display: grid;
		grid-template-columns: repeat(3, fit-content(100%));
		gap: 1rem;
		align-items: center;
	}
</style>
