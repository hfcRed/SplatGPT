<script>
	import '../styles/normalize.css';
	import '../styles/global.css';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		min-height: 100vh;
		min-width: 100%;
		background:
			radial-gradient(var(--spl-color-overlay), transparent 65%) no-repeat 50% calc(0% - 20rem) /
				60rem 30rem,
			radial-gradient(var(--spl-color-overlay), transparent 65%) no-repeat 50% calc(100% + 20rem) /
				60rem 30rem;
	}
</style>
