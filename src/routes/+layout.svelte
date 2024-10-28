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
	}
</style>
