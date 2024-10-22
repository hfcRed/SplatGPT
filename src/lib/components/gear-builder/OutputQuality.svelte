<script lang="ts">
	import type { Tokens } from '$lib/data/abilities/tokens/types';
	import type { Weapon } from '$lib/data/weapons';
	import { mainIndexes, type Ability } from '$lib/data/abilities';

	export let slots: Ability[] = [];
	export let weapon: Weapon;

	const modules = import.meta.glob('/src/lib/data/abilities/tokens/*.ts', { import: 'tokens' });

	let tokens: Tokens;
	$: {
		weapon;
		modules[`/src/lib/data/abilities/tokens/${weapon.referenceKit}.ts`]().then((module) => {
			tokens = module as Tokens;
			getQuality();
		});
	}

	let quality = 0;
	$: {
		slots;
		getQuality();
	}

	function getQuality() {
		if (!tokens || slots.filter((slot) => slot.id === '0').length === 12) {
			quality = 1;
			return;
		}

		const highest = Object.values(tokens).reduce((a, b) => Math.max(a, ...Object.values(b)), 0);

		let abilityCounts: { [key: string]: number } = {};
		let remainingAp = 57;

		for (const ability of slots) {
			if (ability.id === '0') continue;

			const points = mainIndexes.hasOwnProperty(slots.indexOf(ability)) ? 10 : 3;

			remainingAp -= points;
			abilityCounts[ability.name] = abilityCounts[ability.name] + points || points;
		}

		if (remainingAp >= 54) return 4;

		let totalWeightedProbability = 0;
		let totalWeight = 0;

		for (const [ability, count] of Object.entries(abilityCounts)) {
			const token = tokens[ability];
			if (!token) continue;

			const countString = count.toString();

			const closest = Object.keys(token)
				.map(Number)
				.filter((key) => key <= +countString)
				.reduce((a, b) => (Math.abs(b - +countString) < Math.abs(a - +countString) ? b : a));

			const probability = token[closest];
			const weight = 1 / probability;

			totalWeightedProbability += probability * weight;
			totalWeight += weight;
		}

		const weightedAverageProbability = totalWeightedProbability / totalWeight;
		const remainingApPercentage = Math.exp(remainingAp / 57);
		const adjustedProbability = weightedAverageProbability * remainingApPercentage;

		quality = adjustedProbability / highest;
	}
</script>

<div class="meter" role="meter" aria-valuemin="0" aria-valuemax="0.5" aria-valuenow={quality}>
	<div class="meter-bar" style={`transform: translateX(-${100 - (100 * quality) / 0.5}%)`} />
</div>

<style>
	.meter {
		position: relative;
		width: 100%;
		height: 1rem;
		background-color: var(--spl-color-bg);
		border-radius: 99999px;
		overflow: hidden;
	}

	.meter-bar {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: var(--spl-color-accent-high);
		transition: transform 0.5s cubic-bezier(0.6, 0, 0.4, 1);
		border-radius: 99999px;
	}
</style>
