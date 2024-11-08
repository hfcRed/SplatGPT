<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { untrack } from 'svelte';
	import { fly, blur } from 'svelte/transition';
	import { expoIn } from 'svelte/easing';
	import { abilities, emptyAbility, mainIndexes, type Ability } from '$lib/data/abilities';
	import { gearStates, type Token } from '$lib/states/gear-states.svelte';
	import ThumbsDown from '$lib/icons/ThumbsDown.svelte';
	import ThumbsUp from '$lib/icons/ThumbsUp.svelte';
	import Open from '$lib/icons/Open.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import AbilityItem from '$lib/components/gear-builder/AbilityItem.svelte';
	import OutputQuality from '$lib/components/gear-builder/OutputQuality.svelte';

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	const minQuality = 0;
	const maxQuality = 0.5;

	let sendouUrl = $state('https://sendou.ink/analyzer');
	let hasVoted = $state(false);
	let quality = $state(0.45);
	let feedbackQuality = $state(0);
	let disableFeedback = $derived(gearStates.isFetching || hasVoted);

	$effect(() => {
		const untrackedWeapon = untrack(() => gearStates.currentWeapon.id);
		const untrackedAbilities = untrack(() => gearStates.outputSlots);
		const tokens = gearStates.outputTokens;

		(async () => {
			const newSlots = mapResponseToSlots(tokens);

			createSendouUrl(newSlots, untrackedWeapon);

			for (let i = 0; i < newSlots.length; i++) {
				untrackedAbilities[i] = newSlots[i];
				await sleep(50);
			}

			gearStates.isFetching = false;
			hasVoted = false;
			feedbackQuality = quality;
		})();
	});

	function mapResponseToSlots(tokens: Token[]): Ability[] {
		const responseCopy = [...tokens];
		const sortedResponse = responseCopy.sort((a, b) => b[1] - a[1]);

		let remainingAp = 57;
		let mainAbilities: { [key: string]: number } = {};
		let takenMainTypes: string[] = [];
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

			if (num === 10) {
				if (takenMainTypes.includes(ability.mainType)) continue;
				mainAbilities[ability.tokenName] = num;
				takenMainTypes.push(ability.mainType);
			} else {
				subAbilities[ability.tokenName] = num;
			}

			const allAp =
				Object.values(mainAbilities).reduce((acc, cur) => acc + cur, 0) +
				Object.values(subAbilities).reduce((acc, cur) => acc + cur, 0);
			remainingAp = 57 - allAp;
		}

		let subAbilitiesAbove10: number = Object.values(subAbilities).reduce(
			(acc, cur) => (cur > 10 ? acc + Math.floor(cur / 10) : acc),
			0
		);

		// We need to ensure that we have at least 3 abilities that could be main abilities
		while (subAbilitiesAbove10 + Object.keys(mainAbilities).length < 3) {
			const token = sortedResponse.shift();
			if (!token) break;

			const split = token[0].split('_');
			const num = parseInt(split[split.length - 1]) ? parseInt(split.pop() || '10') : 10;
			const tokenName = split.join('_');

			const ability = Object.values(abilities).find((ability) => ability.tokenName === tokenName);
			if (num <= 10 || !ability) continue;

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

			// Temporary fix to prevent a slot from being left over due to the 3 AP cost
			// the AP buckets might change in the future
			if (currentAp === 2) currentAp = 3;
			if (currentAp === 11) currentAp = 12;

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

	function createSendouUrl(abilities: Ability[], weapon: number) {
		if (abilities.filter((slot) => slot.id === '0').length === 12) return;

		let url = `https://sendou.ink/analyzer?weapon=${weapon}&build=`;

		for (const ability of abilities) {
			url += ability.sendouName + '%2C';
		}

		url = url.slice(0, -3);
		sendouUrl = url;
	}

	async function sendFeedback(event: { currentTarget: HTMLButtonElement }) {
		if (!gearStates.outputId) return;

		hasVoted = true;

		await fetch('https://splat.top/api/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'SplatGPT/1.0'
			},
			body: JSON.stringify({
				request_id: gearStates.outputId,
				user_agent: 'SplatGPT/1.0',
				feedback: event.currentTarget.id === 'like' ? true : false,
				metadata: {
					quality_estimation: {
						min: minQuality,
						max: maxQuality,
						current: feedbackQuality
					}
				}
			})
		});
	}
</script>

<div class="container output">
	<OutputQuality min={minQuality} max={maxQuality} bind:quality />
	<div class="slots">
		{#each gearStates.outputSlots as slot, index}
			<div class="ability">
				{#if slot.id !== '0'}
					<div
						in:fly={{ y: -20, duration: 250, opacity: 1, easing: expoIn }}
						out:blur={{ duration: 250 }}
					>
						<AbilityItem ability={slot} disabled={false} interact={() => {}} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<div class="buttons">
		{#if gearStates.fetchError === false}
			<Button variant="text" href={sendouUrl} target="_blank">{m.sendou()}<Open size="18" /></Button
			>
			<Button
				id="like"
				variant="text"
				color="theme"
				aria-label={m.like()}
				disabled={disableFeedback}
				onclick={sendFeedback}><ThumbsUp size="22" /></Button
			>
			<Button
				id="dislike"
				variant="text"
				color="red"
				aria-label={m.dislike()}
				disabled={disableFeedback}
				onclick={sendFeedback}><ThumbsDown size="22" /></Button
			>
		{:else}
			<p>Something went wrong...</p>
		{/if}
	</div>
</div>

<style>
	.slots {
		display: grid;
		grid-template-columns: repeat(4, fit-content(100%));
		gap: 1rem 0.5rem;
		align-items: center;
	}

	.ability {
		background-color: var(--spl-color-item-bg);
		border: 2px solid var(--spl-color-outline-high);
		border-right: 0;
		border-bottom: 0;
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		background-image: url('/src/lib/images/abilities/None.png');
		background-size: contain;
		transition: opacity 0.1s;

		&:nth-child(4n - 3) {
			width: 4rem;
			height: 4rem;
		}

		& :global(button) {
			outline: 0;
		}
	}

	.buttons {
		display: flex;
		gap: 0.5rem;

		& > p {
			color: var(--spl-color-red);
			font-weight: 600;
		}
	}
</style>
