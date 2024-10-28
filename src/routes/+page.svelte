<script lang="ts">
	import GearInput from './GearInput.svelte';
	import GearOutput from './GearOutput.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import GitHub from '$lib/icons/GitHub.svelte';
	import Twitter from '$lib/icons/Twitter.svelte';
	import Bluesky from '$lib/icons/Bluesky.svelte';

	const credits = [
		{
			name: 'Joy',
			role: 'Creator of the model and API',
			links: [
				{ name: 'GitHub', url: 'https://github.com/cesaregarza', icon: GitHub },
				{ name: 'Twitter', url: 'https://x.com/JoyTheDataNerd', icon: Twitter },
				{
					name: 'Bluesky',
					url: 'https://bsky.app/profile/joythedatanerd.bsky.social',
					icon: Bluesky
				}
			]
		},
		{
			name: 'hfcRed',
			role: 'Creator of the website',
			links: [
				{ name: 'GitHub', url: 'https://github.com/hfcRed', icon: GitHub },
				{ name: 'Twitter', url: 'https://x.com/hfcRedddd', icon: Twitter },
				{
					name: 'Bluesky',
					url: 'https://bsky.app/profile/hfcred.dev',
					icon: Bluesky
				}
			]
		},
		{
			name: 'Leanny',
			role: 'Game parameters and images',
			links: [
				{ name: 'GitHub', url: 'https://github.com/Leanny', icon: GitHub },
				{ name: 'Twitter', url: 'https://x.com/LeanYoshi', icon: Twitter }
			]
		}
	];
</script>

<main>
	<section class="heading">
		<h1>SplatGPT</h1>
		<p>Autocomplete gear builds by utilizing an AI model trained on over 1.5 million matches!</p>
	</section>
	<div class="gear-container">
		<GearInput />
		<GearOutput />
	</div>
	<section class="information">
		<h2>Credits</h2>
		<div class="credits-container">
			{#each credits as credit}
				<div class="credit">
					<h3>{credit.name}</h3>
					<p>{credit.role}</p>
					<article class="links">
						{#each credit.links as link}
							<Button href={link.url} target="_blank" variant="text" size="medium" circle>
								<link.icon size="24" />
							</Button>
						{/each}
					</article>
				</div>
			{/each}
		</div>
	</section>
</main>

<style>
	.heading {
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--spl-color-outline);

		@media (min-width: 800px) {
			margin-bottom: 2rem;
		}
	}

	.information {
		padding-top: 2rem;
		border-top: 1px solid var(--spl-color-outline);

		@media (min-width: 800px) {
			margin-top: 2rem;
		}
	}

	.credits-container {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
	}

	.credit {
		border: 1px solid var(--spl-color-outline);
		border-radius: var(--spl-radius-md);
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.links {
		margin-top: 0.5rem;
		display: flex;
		gap: 0.5rem;
	}

	h1,
	h2 {
		margin-bottom: 1rem;
	}

	main {
		width: 100%;
		max-width: 65rem;
		margin: 0 auto;
		padding: 1rem;

		@media (min-width: 800px) {
			padding: 2rem 1rem;
		}
	}

	.gear-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(5, auto);
		align-items: center;
		justify-items: center;

		@media (min-width: 800px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.gear-container > :global(.container) {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 5;
		justify-items: center;
		align-items: flex-start;
		width: 100%;
		gap: 1.5rem;
		padding: 2rem 1rem;

		&:first-child {
			border-bottom: 1px solid var(--spl-color-outline);
			border-right: 0;

			@media (min-width: 800px) {
				border-bottom: 0;
				border-right: 1px solid var(--spl-color-outline);
			}
		}

		@media (min-width: 800px) {
			gap: 2rem;
			padding: 2rem;
		}
	}
</style>
