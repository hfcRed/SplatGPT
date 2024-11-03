<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Button from '$lib/components/common/Button.svelte';
	import GitHub from '$lib/icons/GitHub.svelte';
	import Twitter from '$lib/icons/Twitter.svelte';
	import Bluesky from '$lib/icons/Bluesky.svelte';

	const credits = [
		{
			name: 'Joy',
			role: m.credits_joy(),
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

<h2>{m.credits()}</h2>
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
						<link.icon size="22" />
					</Button>
				{/each}
			</article>
		</div>
	{/each}
</div>

<style>
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
</style>
