<script lang="ts" module>
	import type { Component } from 'svelte';

	export type Size = 'small' | 'medium' | 'large';
	export type Item = { name: string; icon?: Component; image?: string };

	export type BaseProps = {
		size?: Size;
		items: Item[];
		title?: string;
		description?: string;
		icon?: Component;
		rounded?: boolean;
		disabled?: boolean;
		current?: Item;
	};
</script>

<script lang="ts">
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { images } from '$lib/images';

	let {
		size = 'medium',
		items = [{ name: 'No items specified' }],
		title = undefined,
		description = undefined,
		icon = undefined,
		rounded = false,
		disabled = false,
		current = $bindable(items[0])
	}: BaseProps = $props();

	const defaultItem = items[0];

	const toOption = (item: Item): ComboboxOptionProps<Item> => ({
		value: item,
		label: item.name
	});

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<Item>({
		forceVisible: true,
		defaultSelected: toOption(current)
	});

	$effect(() => {
		current = $selected?.value ?? defaultItem;
	});

	$effect(() => {
		if (!$open) {
			$inputValue = $selected?.label ?? '';
		}
	});

	let filteredItems = $derived(
		$touchedInput
			? items.filter(({ name }) => {
					const normalizedInput = $inputValue.toLowerCase();
					return name.toLowerCase().includes(normalizedInput);
				})
			: items
	);

	const IconComponent = $derived(icon);
</script>

<div>
	<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
	{#if title}
		<label class="title" use:melt={$label}>
			<span>{title}</span>
		</label>
	{/if}
	<div class={`controls ${size}`}>
		{#if icon}
			<IconComponent size="1.25em" />
		{/if}
		<input
			class:hasIcon={icon}
			class:rounded
			type="test"
			autocomplete="off"
			autocorrect="off"
			{disabled}
			use:melt={$input}
		/>
		<ChevronUpDown size="1.25em" />
	</div>
	{#if description}
		<p class="description">{description}</p>
	{/if}
</div>
{#if $open}
	<ul use:melt={$menu} transition:fly={{ duration: 200, y: -5 }}>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class="item-container" tabindex="0">
			{#each filteredItems as item, index (index)}
				<li class:selected={$isSelected(item)} use:melt={$option(toOption(item))}>
					<item.icon size="32px" />
					{#if item.image}
						<enhanced:img src={images[item.image]} alt={item.name} width="32" height="32" />
					{/if}
					{item.name}
				</li>
			{:else}
				<li>No weapons found</li>
			{/each}
		</div>
	</ul>
{/if}

<style>
	.controls {
		position: relative;
		transition: opacity 0.15s;

		&:has(input:disabled) {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.controls :global(svg) {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;

		&:first-child {
			left: var(--cbb-padding);
		}

		&:last-child {
			right: var(--cbb-padding);
		}
	}

	.title {
		display: block;
		margin-bottom: 0.15rem;
	}

	.description {
		color: var(--spl-color-subtext);
		font-size: var(--spl-text-sm);
		margin-top: 0.15rem;
	}

	input {
		color: var(--spl-color-text);
		background-color: var(--spl-color-bg-low);
		border: 1px solid var(--spl-color-outline);
		border-radius: var(--cbb-radius);
		padding: 0 calc(var(--cbb-padding) * 3) 0 var(--cbb-padding);
		min-height: var(--cbb-min-height);
		height: auto;
		width: 100%;
		outline: solid 2px transparent;
		white-space: nowrap;
		transition: border-color 0.15s;

		&:hover {
			border-color: var(--spl-color-outline-high);
		}

		&:focus-visible {
			outline: solid 2px var(--spl-color-accent-high);
			outline-offset: 1px;
		}

		&.hasIcon {
			padding-left: calc(var(--cbb-padding) * 3);
		}
	}

	ul {
		background-color: inherit;
		display: flex;
		flex-direction: column;
		max-height: 300px;
		padding: 0;
		list-style: none;
	}

	.item-container {
		background-color: var(--spl-color-bg-low);
		border-radius: var(--spl-radius-md);
		box-shadow: var(--spl-shadow-md);
		outline: 1px solid var(--spl-color-outline);
		overflow-y: auto;
		scrollbar-width: none;
		padding: 0.5rem;
		margin-top: 2px;
	}

	li {
		border-radius: var(--spl-radius-md);
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem 1rem;
		scroll-margin: 0.5rem;
		cursor: pointer;
		transition: background-color 0.15s;

		&.selected {
			color: var(--spl-color-white);
			font-weight: 600;
		}

		&:hover,
		&[data-highlighted] {
			background-color: var(--spl-color-bg);
		}
	}

	.small {
		--cbb-min-height: 2rem;
		--cbb-padding: 0.5rem;
		--cbb-radius: var(--spl-radius-sm);
	}

	.medium {
		--cbb-min-height: 2.5rem;
		--cbb-padding: 1rem;
		--cbb-radius: var(--spl-radius-md);
	}

	.large {
		--cbb-min-height: 3rem;
		--cbb-padding: 1.5rem;
		--cbb-radius: var(--spl-radius-lg);
	}

	.rounded {
		border-radius: 99999px;
	}
</style>
