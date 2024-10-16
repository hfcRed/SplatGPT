<script lang="ts">
	import type { Ability } from './abilities';

	const tokens: any = {
		SuperJumpSign_Hide: {
			'10': 0.6710279
		},
		JumpTime_Save: {
			'3': 0.6525979,
			'6': 0.2727075,
			'12': 0.027785227,
			'15': 0.010885012,
			'21': 0.0033804465,
			'29': 0.001808054,
			'38': 0.00080894533,
			'51': 0.00018927961,
			'57': 0.00017593754
		},
		SquidMove_Up: {
			'3': 0.6441931,
			'6': 0.5566621,
			'12': 0.22939108,
			'15': 0.17164001,
			'21': 0.06698391,
			'29': 0.02403343,
			'38': 0.007861517,
			'51': 0.0010673159,
			'57': 0.00017028366
		},
		RespawnTime_Save: {
			'3': 0.6126211,
			'6': 0.5872606,
			'12': 0.4940378,
			'15': 0.43515328,
			'21': 0.2694485,
			'29': 0.10007375,
			'38': 0.027415004,
			'51': 0.0013017072,
			'57': 0.00028125427
		},
		OpInkEffect_Reduction: {
			'3': 0.436959,
			'6': 0.09950582,
			'12': 0.0056770416,
			'15': 0.0022903876,
			'21': 0.000503517,
			'29': 0.00014125153,
			'38': 0.00007814792,
			'51': 0.000062566665,
			'57': 0.00006143973
		},
		SubInk_Save: {
			'3': 0.3713362,
			'6': 0.28483817,
			'12': 0.11907285,
			'15': 0.08060105,
			'21': 0.025950348,
			'29': 0.012516611,
			'38': 0.0055913674,
			'51': 0.00046456122,
			'57': 0.00010405018
		},
		ComeBack: {
			'10': 0.33394173
		},
		MainInk_Save: {
			'3': 0.323351,
			'6': 0.21705459,
			'12': 0.0767543,
			'15': 0.05159466,
			'21': 0.014544973,
			'29': 0.004943264,
			'38': 0.0026048932,
			'51': 0.00022132984,
			'57': 0.00014347368
		},
		RespawnSpecialGauge_Save: {
			'3': 0.32018116,
			'6': 0.08491178,
			'12': 0.010739184,
			'15': 0.0055632545,
			'21': 0.0014724636,
			'29': 0.00043920294,
			'38': 0.0001670357,
			'51': 0.000091346315,
			'57': 0.00010531341
		},
		SubEffect_Reduction: {
			'3': 0.29946417,
			'6': 0.06433782,
			'12': 0.0041854065,
			'15': 0.0021448254,
			'21': 0.00041110849,
			'29': 0.00019421335,
			'38': 0.000067041336,
			'51': 0.00010579292,
			'57': 0.00012514667
		},
		InkRecovery_Up: {
			'3': 0.27195284,
			'6': 0.11739285,
			'12': 0.02080147,
			'15': 0.011947091,
			'21': 0.001778653,
			'29': 0.00052445335,
			'38': 0.0002830704,
			'51': 0.00017187494,
			'57': 0.00013626314
		},
		SpecialIncrease_Up: {
			'3': 0.19611382,
			'6': 0.115256935,
			'12': 0.034540113,
			'15': 0.027710102,
			'21': 0.009843203,
			'29': 0.004866925,
			'38': 0.0021048216,
			'51': 0.00031406916,
			'57': 0.000131389
		},
		SquidMoveSpatter_Reduction: {
			'10': 0.19505417
		},
		SubSpec_Up: {
			'3': 0.13349542,
			'6': 0.059060182,
			'12': 0.010389,
			'15': 0.006619342,
			'21': 0.0013751051,
			'29': 0.00084925373,
			'38': 0.0005119267,
			'51': 0.00011856967,
			'57': 0.00005017908
		},
		HumanMove_Up: {
			'3': 0.13048826,
			'6': 0.07229359,
			'12': 0.023666888,
			'15': 0.017220555,
			'21': 0.0046901023,
			'29': 0.0022214772,
			'38': 0.00091890816,
			'51': 0.000106749445,
			'57': 0.00013362894
		},
		SpecialSpec_Up: {
			'3': 0.12120579,
			'6': 0.050700855,
			'12': 0.011855762,
			'15': 0.007808142,
			'21': 0.0023043018,
			'29': 0.0011866168,
			'38': 0.0007390392,
			'51': 0.00012379859,
			'57': 0.00006967203
		},
		Action_Up: {
			'3': 0.10890821,
			'6': 0.04354604,
			'12': 0.0074636666,
			'15': 0.0040080524,
			'21': 0.0008618865,
			'29': 0.00026351254,
			'38': 0.00014342745,
			'51': 0.00005309993,
			'57': 0.000039173145
		},
		EndAllUp: {
			'10': 0.087123215
		},
		DeathMarking: {
			'10': 0.07425233
		},
		ObjectEffect_Up: {
			'10': 0.034872025
		},
		SomersaultLanding: {
			'10': 0.031752173
		},
		StartAllUp: {
			'10': 0.018724572
		},
		MinorityUp: {
			'10': 0.012791272
		},
		ThermalInk: {
			'10': 0.012618965
		},
		Exorcist: {
			'10': 0.009214653
		},
		ExSkillDouble: {
			'10': 0.0023515162
		}
	};

	export let slots: Ability[] = [];

	let quality = 0;
	$: {
		slots;
		quality = getQuality();
		console.log(quality);
	}

	function getQuality(): number {
		const highest = 0.5;
		const mainIndexes = [0, 4, 8];

		let abilityCounts: { [key: string]: number } = {};
		let remainingAp = 57;

		for (const ability of slots) {
			if (ability.id === '100') continue;

			const points = mainIndexes.includes(slots.indexOf(ability)) ? 10 : 3;

			remainingAp -= points;
			abilityCounts[ability.name] = abilityCounts[ability.name] + points || points;
		}

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
		const remainingApPercentage = remainingAp / 57;
		const adjustedProbability = weightedAverageProbability * (1 + remainingApPercentage * 2);

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
