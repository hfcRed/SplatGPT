<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Moon from '$lib/icons/Moon.svelte';
	import Sun from '$lib/icons/Sun.svelte';
	import Button from './Button.svelte';

	interface Props {
		theme: string;
	}

	let { theme }: Props = $props();

	const updateTheme: SubmitFunction = ({ action }) => {
		const newTheme = action.searchParams.get('theme');

		if (newTheme) {
			document.documentElement.setAttribute('data-theme', newTheme);
			theme = newTheme;
		}
	};
</script>

<form method="POST" use:enhance={updateTheme}>
	<Button
		variant="text"
		color="neutral"
		circle
		type="submit"
		formaction="/?/setTheme&theme=light&redirect={$page.url.pathname}"
		hidden={theme === 'light'}
		aria-label="Light theme"
	>
		<Moon duration={200} rotate={theme === 'light' ? -180 : 0} size="22" />
	</Button>
	<Button
		variant="text"
		color="neutral"
		circle
		type="submit"
		formaction="/?/setTheme&theme=dark&redirect={$page.url.pathname}"
		hidden={theme === 'dark'}
		aria-label="Dark theme"
	>
		<Sun duration={200} rotate={theme === 'dark' ? -180 : 0} size="22" />
	</Button>
</form>

<style>
	form {
		position: relative;
	}

	form > :global(:last-child) {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
