<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import type { Tokens } from '$lib/data/abilities/tokens/types';
	import { mainIndexes } from '$lib/data/abilities';
	import { gearStates } from '$lib/states/gear-states.svelte';

	interface Props {
		min: number;
		max: number;
		quality: number;
	}

	let { min, max, quality = $bindable(0) }: Props = $props();

	$effect(() => {
		gearStates.inputSlots;
		getQuality();
	});

	function getQuality() {
		if (!tokens || gearStates.inputSlots.filter((slot) => slot.id === '0').length === 12) {
			quality = 0.45;
			return;
		}

		const highest = Object.values(tokens).reduce((a, b) => Math.max(a, ...Object.values(b)), 0);

		let abilityCounts: { [key: string]: number } = {};
		let remainingAp = 57;

		for (const ability of gearStates.inputSlots) {
			if (ability.id === '0') continue;

			const points = mainIndexes.hasOwnProperty(gearStates.inputSlots.indexOf(ability)) ? 10 : 3;

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

	const modules = import.meta.glob('/src/lib/data/abilities/tokens/*.ts', { import: 'tokens' });

	let tokens: Tokens | undefined = $state();

	$effect(() => {
		gearStates.currentWeapon;
		modules[`/src/lib/data/abilities/tokens/${gearStates.currentWeapon.referenceKit}.ts`]().then(
			(module) => {
				tokens = module as Tokens;
				getQuality();
			}
		);
	});
</script>

<div class="meter-container">
	<p id="meter-description">{m.output_quality()}</p>
	<div
		class="meter"
		role="meter"
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={quality}
		aria-labelledby="meter-description"
	>
		<div class="meter-bar" style={`transform: translateX(-${100 - (100 * quality) / max}%)`}></div>
	</div>
</div>

<style>
	.meter-container {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		width: 100%;
	}

	.meter {
		background-color: var(--spl-color-bg);
		position: relative;
		height: 1rem;
		border-radius: 99999px;
		overflow: hidden;
		margin-top: 0.75rem;
	}

	.meter-bar {
		background-color: var(--spl-color-text-accent);
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 99999px;
		transition: transform 0.5s cubic-bezier(0.6, 0, 0.4, 1);
	}
</style>
