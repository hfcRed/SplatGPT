<script>
	import GitHub from '$lib/icons/GitHub.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

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
			<ThemeSwitcher />
		</div>
	</div>
</header>

<style>
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
</style>
