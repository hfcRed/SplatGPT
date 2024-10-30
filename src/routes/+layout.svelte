<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';

	import '../styles/normalize.css';
	import '../styles/global.css';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div>
		{@render children?.()}
	</div>
</ParaglideJS>

<style>
	div {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-width: 100%;
		background:
			radial-gradient(var(--spl-color-overlay), transparent 65%) no-repeat 50% calc(0% - 20rem) /
				60rem 35rem,
			radial-gradient(var(--spl-color-overlay), transparent 65%) no-repeat 50% calc(100% + 20rem) /
				60rem 35rem;
	}
</style>
