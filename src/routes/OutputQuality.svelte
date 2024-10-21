<script lang="ts">
	import type { Ability } from '$lib/data/abilities';
	import type { Tokens } from '$lib/data/abilities/tokens/types';
	import type { Weapon } from '$lib/data/weapons';

	let tokens: Tokens;

	export let slots: Ability[] = [];
	export let weapon: Weapon;

	const modules = import.meta.glob('/src/lib/data/abilities/tokens/*.ts', { import: 'tokens' });

	$: {
		weapon;
		modules[`/src/lib/data/abilities/tokens/${weapon.referenceKit}.ts`]().then((module) => {
			tokens = module as Tokens;
			quality = getQuality();
		});
	}

	let quality = 0;
	$: {
		slots;
		quality = getQuality();
	}

	function getQuality(): number {
		if (!tokens) return 4;

		const highest = Object.values(tokens).reduce((a, b) => Math.max(a, ...Object.values(b)), 0);
		const mainIndexes = [0, 4, 8];

		let abilityCounts: { [key: string]: number } = {};
		let remainingAp = 57;

		for (const ability of slots) {
			if (ability.id === '0') continue;

			const points = mainIndexes.includes(slots.indexOf(ability)) ? 10 : 3;

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

			const closest = Object.keys(token).reduce((a, b) =>
				Math.abs(+b - +countString) < Math.abs(+a - +countString) ? b : a
			);

			const probability = token[closest];
			const weight = 1 / probability;

			totalWeightedProbability += probability * weight;
			totalWeight += weight;
		}

		const weightedAverageProbability = totalWeightedProbability / totalWeight;
		const remainingApPercentage = Math.exp(remainingAp / 57);
		const adjustedProbability = weightedAverageProbability * remainingApPercentage;

		const qualityBrackets = [0.1, 0.2, 0.3, 0.5, 1];
		const quality = adjustedProbability ? adjustedProbability / highest : 0;
		const bracket = qualityBrackets.findIndex((bracket) => quality <= bracket);

		return bracket === -1 ? 4 : bracket;
	}
</script>

<label for="meter">Estimated Quality:</label>
<meter id="meter" max="4" min="0" low="2" optimum="4" value={quality}> </meter>

<style>
	meter {
		display: block;
		width: 14rem;
		height: 1rem;
		border: 1px solid var(--spl-color-outline);
		border-radius: var(--spl-radius-md);
		background: none;
		background-color: var(--spl-color-bg);
		margin-bottom: 1rem;
	}

	meter::-webkit-meter-bar {
		width: 14rem;
		height: 1rem;
		border: 1px solid var(--spl-color-outline);
		background: none;
		background-color: var(--spl-color-bg);
		border-radius: var(--spl-radius-md);
	}

	meter::-webkit-meter-optimum-value {
		background: none;
		background-color: var(--spl-color-green);
		transition:
			width 0.25s,
			background-color 0.1s;
	}

	meter::-webkit-meter-suboptimum-value {
		background: none;
		background-color: var(--spl-color-red);
		transition:
			width 0.25s,
			background-color 0.1s;
	}

	meter::-webkit-meter-even-less-good-value {
		background: none;
		background-color: var(--spl-color-red);
		transition:
			width 0.25s,
			background-color 0.1s;
	}

	meter:-moz-meter-optimum::-moz-meter-bar {
		background: none;
		background-color: var(--spl-color-green);
	}

	meter:-moz-meter-sub-optimum::-moz-meter-bar {
		background: none;
		background-color: var(--spl-color-red);
	}

	meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
		background: none;
		background-color: var(--spl-color-red);
	}
</style>
