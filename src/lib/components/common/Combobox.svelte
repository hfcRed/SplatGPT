<script lang="ts" context="module">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ComponentType } from 'svelte';

	export type Size = 'small' | 'medium' | 'large';
	export type Item = { name: string; icon?: ComponentType; image?: string };

	type BaseProps = {
		size?: Size;
		items: Item[];
		title?: string;
		description?: string;
		icon?: ComponentType;
		rounded?: boolean;
		disabled?: boolean;
	};

	export type InputProps = HTMLInputAttributes & BaseProps;
</script>

<script lang="ts">
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { images } from '$lib/images';

	export let size: Size = 'medium';
	export let items: Item[] = [{ name: 'No items specified' }];
	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let icon: ComponentType | undefined = undefined;
	export let rounded = false;
	export let disabled = false;

	const defaultItem = items[0];
	export let current: Item = defaultItem;

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
		defaultSelected: toOption(defaultItem)
	});

	$: current = $selected?.value ?? defaultItem;

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	$: filteredItems = $touchedInput
		? items.filter(({ name }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return name.toLowerCase().includes(normalizedInput);
			})
		: items;
</script>

<div>
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	{#if title}
		<label class="title" use:melt={$label}>
			<span>{title}</span>
		</label>
	{/if}
	<div class={`controls ${size}`}>
		<svelte:component this={icon} size="1.25em" />
		<input
			class={`${icon ? 'hasIcon' : ''} ${rounded ? 'round' : ''}`}
			type="test"
			autocomplete="off"
			autocorrect="false"
			use:melt={$input}
			{disabled}
		/>
		<ChevronUpDown size="1.25em" />
	</div>
	{#if description}
		<p class="description">{description}</p>
	{/if}
</div>
{#if $open}
	<ul use:melt={$menu} transition:fly={{ duration: 200, y: -5 }}>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="item-container" tabindex="0">
			{#each filteredItems as item, index (index)}
				<li class={`${$isSelected(item) ? 'selected' : ''}`} use:melt={$option(toOption(item))}>
					<svelte:component this={item.icon} size="32px" />
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
			left: var(--spl-padding);
		}

		&:last-child {
			right: var(--spl-padding);
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
		background-color: var(--spl-color-bg);
		border: 1px solid var(--spl-color-outline);
		border-radius: var(--spl-radius);
		padding: 0 calc(var(--spl-padding) * 3) 0 var(--spl-padding);
		min-height: var(--spl-min-height);
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
			padding-left: calc(var(--spl-padding) * 3);
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		max-height: 300px;
		padding: 0;
		list-style: none;
	}

	.item-container {
		overflow-y: auto;
		background-color: var(--spl-color-bg);
		border-radius: var(--spl-radius-md);
		padding: 0.5rem;
		scrollbar-width: none;
		box-shadow: var(--spl-shadow-md);
		outline: 1px solid var(--spl-color-outline);
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
		}

		&:hover,
		&[data-highlighted] {
			background-color: var(--spl-color-bg-high);
		}
	}

	.small {
		--spl-min-height: 2rem;
		--spl-padding: 0.5rem;
		--spl-radius: var(--spl-radius-sm);
	}

	.medium {
		--spl-min-height: 2.5rem;
		--spl-padding: 1rem;
		--spl-radius: var(--spl-radius-md);
	}

	.large {
		--spl-min-height: 3rem;
		--spl-padding: 1.5rem;
		--spl-radius: var(--spl-radius-lg);
	}

	.round {
		border-radius: 99999px;
	}
</style>
