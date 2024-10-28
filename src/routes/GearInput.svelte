<script lang="ts">
	import { abilities, emptyAbility, mainIndexes, type Ability } from '$lib/data/abilities';
	import { weapons } from '$lib/data/weapons/index';
	import { images } from '$lib/images';
	import AbilitySelector from '$lib/components/gear-builder/AbilitySelector.svelte';
	import AbilitySlot from '$lib/components/gear-builder/AbilitySlot.svelte';
	import Combobox from '$lib/components/common/Combobox.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import {
		inputSlots,
		outputSlots,
		outputPredictions,
		isRunning,
		weapon,
		type Token
	} from './gear-states.svelte';

	const abilityEntries = Object.values(abilities);
	const mainAbilities: Ability[] = abilityEntries.filter((item) => item.mainType !== 'none');
	const subAbilities: Ability[] = abilityEntries.filter((item) => item.mainType === 'none');

	let enabledSlots: 'all' | 'head' | 'clothes' | 'shoes' = $state('all');

	function updateEnabledSlots(ability: Ability | undefined) {
		if (!ability || ability.mainType === 'none') {
			enabledSlots = 'all';
			return;
		}
		enabledSlots = ability.mainType || 'all';
	}

	let disabledAbilities = $derived({
		head: inputSlots.abilities[0].id !== '0',
		clothes: inputSlots.abilities[4].id !== '0',
		shoes: inputSlots.abilities[8].id !== '0',
		all: inputSlots.abilities.filter((slot) => slot.id !== '0').length === 12
	});

	function addAbility(ability: Ability) {
		inputSlots.abilities.find((slot, index) => {
			if (slot.id !== '0') return false;

			const newSlot = { ...ability, id: Math.floor(Math.random() * 10000000000).toString() };

			if (ability.mainType === 'none') {
				inputSlots.abilities[index] = newSlot;
				return true;
			}

			if (mainIndexes[index] && ability.mainType === mainIndexes[index]) {
				inputSlots.abilities[index] = newSlot;
				return true;
			}
		});
	}

	function clearAbilities() {
		inputSlots.abilities = inputSlots.abilities.map(() => emptyAbility);
	}

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	let buttonText = $state('Send');

	async function getProbabilities() {
		isRunning.state = true;

		let abilities: { [key: string]: number } = {};

		for (const ability of inputSlots.abilities) {
			if (ability.id === '0') continue;

			const points = mainIndexes.hasOwnProperty(inputSlots.abilities.indexOf(ability)) ? 10 : 3;

			abilities[ability.tokenName] = abilities[ability.tokenName] + points || points;
		}

		outputSlots.abilities = Array(12).fill(emptyAbility);
		await sleep(500);

		outputSlots.abilities = [...inputSlots.abilities];
		await sleep(500);

		let data;
		try {
			const response = await fetch('https://splat.top/api/infer', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'User-Agent': 'SplatGPT'
				},
				body: JSON.stringify({
					abilities,
					weapon_id: weapon.weapon.id
				})
			});

			if (response.status === 429) {
				startCountdown();
				return;
			}

			data = await response.json();
		} catch (error) {
			console.error(error);
			isRunning.state = false;
			return;
		}

		if (!data.predictions) {
			isRunning.state = false;
			return;
		}

		const predictions = [...data.predictions].sort((a, b) => b[1] - a[1]) as Token[];
		outputPredictions.tokens = predictions;
	}

	function startCountdown() {
		let seconds = 60;
		const interval = setInterval(() => {
			seconds--;
			buttonText = `Blocked for ${seconds} seconds`;

			if (seconds <= 0) {
				clearInterval(interval);
				buttonText = 'Send';
				isRunning.state = false;
			}
		}, 1000);
	}
</script>

<div class="container">
	<div class="input">
		<Combobox bind:current={weapon.weapon} title="Weapon" items={Object.values(weapons)} />
		<enhanced:img
			src={images[weapon.weapon.sub.image]}
			alt={weapon.weapon.sub.name}
			width="32"
			height="32"
		/>
		<enhanced:img
			src={images[weapon.weapon.special.image]}
			alt={weapon.weapon.special.name}
			width="32"
			height="32"
		/>
	</div>

	<div class="slots">
		{#each inputSlots.abilities as slot, index}
			<AbilitySlot
				bind:ability={inputSlots.abilities[index]}
				disabled={enabledSlots === 'all'
					? false
					: mainIndexes[index] === enabledSlots
						? false
						: true}
				items={slot.id === '0' ? [] : [slot]}
				mainType={mainIndexes[index] || null}
				drag={updateEnabledSlots}
			/>
		{/each}
	</div>

	<AbilitySelector
		abilities={subAbilities}
		{disabledAbilities}
		drag={updateEnabledSlots}
		interact={addAbility}
	/>

	<AbilitySelector
		abilities={mainAbilities}
		{disabledAbilities}
		drag={updateEnabledSlots}
		interact={addAbility}
	/>

	<div class="buttons">
		<Button onclick={getProbabilities} full disabled={isRunning.state}>{buttonText}</Button>
		<Button
			color="red"
			onclick={clearAbilities}
			disabled={inputSlots.abilities.filter((slot) => slot.id === '0').length === 12}>Clear</Button
		>
	</div>
</div>

<style>
	.input {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		width: 100%;
	}

	.input :global(img) {
		border: 1px solid var(--spl-color-outline);
		border-radius: var(--spl-radius-md);
		padding: 0.3rem;
		height: 2.5rem;
		width: 2.5rem;
		transition: border-color 0.15s;

		&:hover {
			border-color: var(--spl-color-outline-high);
		}
	}

	.slots {
		display: grid;
		grid-template-columns: repeat(4, fit-content(100%));
		gap: 1rem 0.5rem;
		align-items: center;
	}

	.buttons {
		display: flex;
		width: 100%;
		gap: 0.5rem;
	}
</style>
