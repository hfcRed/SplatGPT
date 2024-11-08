<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { subImages, specialImages } from '$lib/images';
	import { abilities, mainIndexes, type Ability } from '$lib/data/abilities';
	import { weapons, type Weapon } from '$lib/data/weapons/index';
	import { gearStates, type Token } from '$lib/states/gear-states.svelte';
	import AbilitySelector from '$lib/components/gear-builder/AbilitySelector.svelte';
	import AbilitySlot from '$lib/components/gear-builder/AbilitySlot.svelte';
	import Combobox from '$lib/components/common/Combobox.svelte';
	import Button from '$lib/components/common/Button.svelte';

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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
		head: gearStates.inputSlots[0].id !== '0',
		clothes: gearStates.inputSlots[4].id !== '0',
		shoes: gearStates.inputSlots[8].id !== '0',
		all: gearStates.inputSlots.filter((slot) => slot.id !== '0').length === 12
	});

	function addAbility(ability: Ability) {
		gearStates.inputSlots.find((slot, index) => {
			if (slot.id !== '0') return false;

			const newSlot = { ...ability, id: Math.floor(Math.random() * 10000000000).toString() };

			if (ability.mainType === 'none') {
				gearStates.inputSlots[index] = newSlot;
				return true;
			}

			if (mainIndexes[index] && ability.mainType === mainIndexes[index]) {
				gearStates.inputSlots[index] = newSlot;
				return true;
			}
		});
	}

	function clearAbilities() {
		gearStates.clearInputSlots();
	}

	let buttonText = $state(m.send());

	async function getProbabilities() {
		const element = document.querySelector('.output') as HTMLElement;
		element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

		gearStates.isFetching = true;

		let abilities: { [key: string]: number } = {};

		for (const ability of gearStates.inputSlots) {
			if (ability.id === '0') continue;

			const points = mainIndexes.hasOwnProperty(gearStates.inputSlots.indexOf(ability)) ? 10 : 3;

			abilities[ability.tokenName] = abilities[ability.tokenName] + points || points;
		}

		gearStates.clearOutputSlots();
		await sleep(500);

		gearStates.outputSlots = [...gearStates.inputSlots];
		await sleep(500);

		let data;
		try {
			const response = await fetch('https://splat.top/api/infer', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'User-Agent': 'SplatGPT/1.0'
				},
				body: JSON.stringify({
					abilities,
					weapon_id: gearStates.currentWeapon.referenceKit
				})
			});

			if (response.status === 429) {
				startCountdown();
				return;
			}

			data = await response.json();
		} catch (error) {
			console.error(error);
			gearStates.isFetching = false;
			gearStates.fetchError = true;
			gearStates.outputTokens = [];
			return;
		}

		if (!data.predictions) {
			gearStates.isFetching = false;
			gearStates.fetchError = true;
			gearStates.outputTokens = [];
			return;
		}

		const predictions = [...data.predictions].sort((a, b) => b[1] - a[1]) as Token[];

		gearStates.outputTokens = predictions;
		gearStates.outputId = data.metadata.request_id;
		gearStates.fetchError = false;
	}

	function startCountdown() {
		let seconds = 60;
		const interval = setInterval(() => {
			seconds--;
			buttonText = m.send_blocked({ seconds });

			if (seconds <= 0) {
				clearInterval(interval);
				buttonText = m.send();
				gearStates.isFetching = false;
			}
		}, 1000);
	}

	function translateWeapons() {
		let translatedWeapons: { [key: string]: Weapon } = {};

		Object.keys(weapons).forEach((key) => {
			const weapon = weapons[key].name;
			const translations: [[string, string]] = JSON.parse(m.weapons());

			const translation = translations.find((item) => item[0] === weapon);
			translatedWeapons[key] = { ...weapons[key], name: translation ? translation[1] : weapon };
		});

		return Object.values(translatedWeapons);
	}
</script>

<div class="container">
	<div class="weapon-input">
		<Combobox
			bind:current={gearStates.currentWeapon}
			title={m.weapon()}
			items={translateWeapons()}
		/>
		<enhanced:img
			src={subImages[gearStates.currentWeapon.sub.image]}
			alt={gearStates.currentWeapon.sub.name}
		/>
		<enhanced:img
			src={specialImages[gearStates.currentWeapon.special.image]}
			alt={gearStates.currentWeapon.special.name}
		/>
	</div>

	<div class="slots">
		{#each gearStates.inputSlots as slot, index}
			<AbilitySlot
				bind:ability={gearStates.inputSlots[index]}
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
		<Button
			onclick={getProbabilities}
			full
			disabled={gearStates.isFetching}
			loading={gearStates.isFetching}>{buttonText}</Button
		>
		<Button
			color="red"
			onclick={clearAbilities}
			disabled={gearStates.inputSlots.filter((slot) => slot.id === '0').length === 12}
			>{m.clear()}</Button
		>
	</div>
</div>

<style>
	.weapon-input {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		width: 100%;

		& :global(img) {
			border: 1px solid var(--spl-color-item-outline);
			border-radius: var(--spl-radius-md);
			padding: 0.3rem;
			height: 2.5rem;
			width: 2.5rem;
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
