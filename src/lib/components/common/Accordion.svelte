<script lang="ts">
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import ChevronDown from '$lib/icons/ChevronDown.svelte';

	type Item = {
		id: string;
		title: string;
		description: string;
	};

	interface Props {
		items: Item[];
	}

	let { items }: Props = $props();

	const {
		elements: { root, content, item, trigger },
		helpers: { isSelected }
	} = createAccordion();
</script>

<div class="container" use:melt={$root}>
	{#each items as { id, title, description }}
		<div use:melt={$item(id)} class="item">
			<h3>
				<button use:melt={$trigger(id)}>
					{title}
					<ChevronDown size="22" rotate={$isSelected(id) ? 180 : 0} duration={200} />
				</button>
			</h3>
			{#if $isSelected(id)}
				<div class="content" use:melt={$content(id)} transition:slide={{ duration: 200 }}>
					<p>{description}</p>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	button {
		line-height: var(--spl-line-height);
		font-size: var(--spl-text-xl);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 600;
		background: none;
		border: none;
		cursor: pointer;
		width: 100%;
		padding: 1rem 0;
		transition: color 0.15s;

		&:hover {
			color: var(--spl-color-accent-high);
		}
	}

	p {
		white-space: pre-wrap;
	}

	.item {
		border-bottom: 1px solid var(--spl-color-outline);
	}

	.content {
		padding-bottom: 1rem;
	}
</style>
