<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import GearInput from './GearInput.svelte';
	import GearOutput from './GearOutput.svelte';
	import Information from './Information.svelte';
	import Credits from './Credits.svelte';
</script>

<section class="title">
	<h1>{m.title()}</h1>
	<p>{m.description()}</p>
	{#if m.is_google_translate() === 'true'}
		<p class="translation">{m.translate_description()}</p>
	{/if}
</section>
<div class="gear-container">
	<GearInput />
	<GearOutput />
</div>
<section class="information">
	<Information />
</section>
<section>
	<Credits />
</section>

<style>
	.translation {
		font-size: var(--spl-text-xs);
		color: var(--spl-color-subtext);
		margin-top: 0.5rem;
	}

	.title {
		border-bottom: 1px solid var(--spl-color-outline);
		margin-bottom: 2rem;
		padding-bottom: 2rem;
	}

	.information {
		border-top: 1px solid var(--spl-color-outline);
		margin-top: 2rem;
		margin-bottom: 2rem;
		padding-top: 2rem;
	}

	.gear-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(5, auto);
		align-items: center;
		justify-items: center;
		gap: 1.5rem 0;

		@media (min-width: 800px) {
			grid-template-columns: 1fr 1fr;
			gap: 2rem 0;
		}
	}

	.gear-container > :global(.container) {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 5;
		justify-items: center;
		align-items: flex-start;
		width: 100%;

		&:first-child {
			border-bottom: 1px solid var(--spl-color-outline);
			border-right: 0;
			padding-bottom: 2rem;
			margin-bottom: 0.5rem;

			@media (min-width: 800px) {
				border-right: 1px solid var(--spl-color-outline);
				border-bottom: 0;
				padding-bottom: 0;
				margin-bottom: 0;
			}
		}

		@media (min-width: 800px) {
			padding: 0rem 2rem;
		}
	}
</style>
