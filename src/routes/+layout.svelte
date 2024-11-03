<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import Button from '$lib/components/common/Button.svelte';
	import GitHub from '$lib/icons/GitHub.svelte';
	import LanguageSwitcher from '$lib/components/common/LanguageSwitcher.svelte';
	import ThemeSwitcher from '$lib/components/common/ThemeSwitcher.svelte';
	import '../styles/normalize.css';
	import '../styles/global.css';

	let { children, data } = $props();
</script>

<ParaglideJS {i18n}>
	<header>
		<div>
			<div class="nav-items">
				<Button
					variant="text"
					color="neutral"
					circle
					href="https://github.com/hfcRed/SplatGPT"
					target="_blank"
					aria-label="GitHub"
				>
					<GitHub size="22" />
				</Button>
			</div>
			<div class="nav-items">
				<LanguageSwitcher />
				<ThemeSwitcher theme={data.theme} />
			</div>
		</div>
	</header>
	<main>{@render children?.()}</main>
</ParaglideJS>
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
	main {
		background:
			radial-gradient(var(--spl-color-overlay), transparent 65%) no-repeat 50% calc(0% - 20rem) /
				65rem 35rem,
			radial-gradient(var(--spl-color-overlay), transparent 65%) no-repeat 50% calc(100% + 20rem) /
				65rem 35rem;
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
		background-color: var(--spl-color-bg-low);
		border-bottom: 1px solid var(--spl-color-outline);
	}

	header > div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-items {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	footer {
		color: var(--spl-color-subtext);
		font-size: var(--spl-text-xs);
		background-color: var(--spl-color-bg-low);
		border-top: 1px solid var(--spl-color-outline);
		margin-top: auto;
		text-align: center;
	}

	.footer-links {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
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
