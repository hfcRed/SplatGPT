<script lang="ts">
	import { abilities, emptyAbility, mainIndexes, type Ability } from '$lib/data/abilities';
	import AbilitySlot from '$lib/components/gear-builder/AbilitySlot.svelte';
	import { outputPredictions, type Token } from './slots.svelte';

	let slots: Ability[] = $derived(mapResponseToSlots(outputPredictions.tokens));

	function mapResponseToSlots(response: Token[]) {
		const responseCopy = [...response];
		const sortedResponse = responseCopy.sort((a, b) => b[1] - a[1]);

		let remainingAp = 57;
		let mainAbilities: { [key: string]: number } = {};
		let subAbilities: { [key: string]: number } = {};
		let proxySlots = [...Array(12).fill(emptyAbility)];

		while (remainingAp > 0) {
			const token = sortedResponse.shift();
			if (!token) break;

			const split = token[0].split('_');
			const num = parseInt(split[split.length - 1]) ? parseInt(split.pop() || '10') : 10;
			const tokenName = split.join('_');

			const ability = Object.values(abilities).find((ability) => ability.tokenName === tokenName);

			if (!ability) continue;

			if (num === 10) mainAbilities[ability.tokenName] = num;
			else subAbilities[ability.tokenName] = num;

			const allAp =
				Object.values(mainAbilities).reduce((acc, cur) => acc + cur, 0) +
				Object.values(subAbilities).reduce((acc, cur) => acc + cur, 0);
			remainingAp = 57 - allAp;
		}

		let subAbilitiesAbove10: number = Object.values(subAbilities).reduce(
			(acc, cur) => (cur > 10 ? acc + Math.floor(cur / 10) : acc),
			0
		);

		while (subAbilitiesAbove10 + Object.keys(mainAbilities).length < 3) {
			const token = sortedResponse.shift();
			if (!token) break;

			const split = token[0].split('_');
			const num = parseInt(split[split.length - 1]) ? parseInt(split.pop() || '10') : 10;
			const tokenName = split.join('_');

			const ability = Object.values(abilities).find((ability) => ability.tokenName === tokenName);
			if (num < 10 || !ability) continue;

			subAbilities[ability.tokenName] = num;

			subAbilitiesAbove10 = Object.values(subAbilities).reduce(
				(acc, cur) => (cur > 10 ? acc + Math.floor(cur / 10) : acc),
				0
			);
		}

		for (const name of Object.keys(mainAbilities)) {
			const ability = Object.values(abilities).find((ability) => ability.tokenName === name);
			if (!ability) continue;

			const index =
				Object.keys(mainIndexes).find((key) => mainIndexes[parseInt(key)] === ability.mainType) ||
				'0';

			if (proxySlots[parseInt(index)].id !== '0') continue;

			proxySlots[parseInt(index)] = { ...ability };
		}

		for (const [name, ap] of Object.entries(subAbilities)) {
			const ability = Object.values(abilities).find((ability) => ability.tokenName === name);
			if (!ability) continue;

			let currentAp = ap;

			const freeMainSlots = proxySlots.reduce((acc, cur, index) => {
				if (mainIndexes.hasOwnProperty(index) && cur.id === '0') acc.push(index);
				return acc;
			}, [] as number[]);

			while (currentAp > 10 && freeMainSlots.length > 0) {
				proxySlots[freeMainSlots.shift() || 0] = { ...ability };
				currentAp -= 10;
			}

			let freeSubSlots = proxySlots.reduce((acc, cur, index) => {
				if (!mainIndexes.hasOwnProperty(index) && cur.id === '0') acc.push(index);
				return acc;
			}, [] as number[]);

			const count = Math.floor(currentAp / 3);

			for (let i = 0; i < count; i++) {
				if (freeSubSlots.length === 0) break;

				proxySlots[freeSubSlots.shift() || 0] = { ...ability };

				freeSubSlots = proxySlots.reduce((acc, cur, index) => {
					if (!mainIndexes.hasOwnProperty(index) && cur.id === '0') acc.push(index);
					return acc;
				}, [] as number[]);
			}
		}

		return proxySlots;
	}
</script>

<div>
	{#each slots as slot, index}
		<AbilitySlot
			items={slot.id === '0' ? [] : [slot]}
			mainType={mainIndexes[index] || null}
			dragDisabled
		/>
	{/each}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(4, fit-content(100%));
		gap: 1rem 0.5rem;
		align-items: center;
	}
</style>
