<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import GearInput from './GearInput.svelte';
	import GearOutput from './GearOutput.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import GitHub from '$lib/icons/GitHub.svelte';
	import Twitter from '$lib/icons/Twitter.svelte';
	import Bluesky from '$lib/icons/Bluesky.svelte';
	import LanguageSwitcher from '$lib/components/common/LanguageSwitcher.svelte';

	const credits = [
		{
			name: 'Joy',
			role: m.creadits_joy(),
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
			role: m.credits_hfcRed(),
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
			role: m.credits_Leanny(),
			links: [
				{ name: 'GitHub', url: 'https://github.com/Leanny', icon: GitHub },
				{ name: 'Twitter', url: 'https://x.com/LeanYoshi', icon: Twitter }
			]
		}
	];
</script>

<header>
	<div>
		<LanguageSwitcher />
	</div>
</header>
<main>
	<section class="heading">
		<h1>{m.title()}</h1>
		<p>{m.description()}</p>
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
							<Button
								href={link.url}
								target="_blank"
								variant="text"
								size="medium"
								circle
								aria-label={link.name}
							>
								<link.icon size="24" />
							</Button>
						{/each}
					</article>
				</div>
			{/each}
		</div>
	</section>
</main>
<footer>
	<div>
		<p>
			This website is not affiliated with Nintendo. All product names, logos, and brands are
			property of their respective owners.
		</p>
		<div class="footer-links">
			<a href="https://github.com/hfcRed/SplatGPT" target="_blank">Source Code</a>
			<span>•</span>
			<a href="https://splat.top/api/infer" target="_blank">Infer API</a>
		</div>
	</div>
</footer>
<div class="noise"></div>

<style>
	.heading {
		border-bottom: 1px solid var(--spl-color-outline);
		margin-bottom: 2rem;
		padding-bottom: 2rem;
	}

	.information {
		border-top: 1px solid var(--spl-color-outline);
		margin-top: 2rem;
		padding-top: 2rem;
	}

	.credits-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;

		@media (min-width: 800px) {
			gap: 2rem;
		}
	}

	.credit {
		background-color: var(--spl-color-bg-low);
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

	main,
	header > div,
	footer > div {
		width: 100%;
		max-width: 65rem;
		margin: 0 auto;
		padding: 1rem;

		@media (min-width: 800px) {
			padding: 1rem 2rem;
		}
	}

	main {
		padding-block: 3rem;

		@media (min-width: 800px) {
			padding-block: 4rem;
		}
	}

	header {
		background-color: rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid var(--spl-color-outline);
		backdrop-filter: blur(10px);
		box-shadow: var(--spl-shadow-md);
	}

	footer {
		color: var(--spl-color-subtext);
		font-size: var(--spl-text-xs);
		background-color: rgba(0, 0, 0, 0.25);
		border-top: 1px solid var(--spl-color-outline);
		backdrop-filter: blur(10px);
		margin-top: auto;
		text-align: center;
	}

	.footer-links {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
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

	.noise {
		background-image: url(data:image/png;base64,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);
		mix-blend-mode: overlay;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -2;
		pointer-events: none;
	}
</style>
