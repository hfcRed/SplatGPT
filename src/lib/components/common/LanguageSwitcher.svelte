<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { languageTag, type AvailableLanguageTag } from '$lib/paraglide/runtime.js';
	import { createSelect, melt, type CreateSelectProps } from '@melt-ui/svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { i18n } from '$lib/i18n.js';
	import Languages from '$lib/icons/Languages.svelte';
	import ChevronDown from '$lib/icons/ChevronDown.svelte';

	type Language = {
		tag: AvailableLanguageTag;
		name: string;
	};

	const languages: Language[] = [
		{
			tag: 'en',
			name: 'English'
		},
		{
			tag: 'jp',
			name: '日本語'
		}
	];

	const toOption = (language: Language) => ({
		value: language,
		label: language.name
	});

	const handleSelection: CreateSelectProps<Language>['onSelectedChange'] = ({ curr, next }) => {
		if (!curr || !next || curr.label === next.label) return curr;

		goto(i18n.resolveRoute('/', next.value.tag));
		return next;
	};

	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, open, selected },
		helpers: { isSelected }
	} = createSelect<Language>({
		onSelectedChange: handleSelection,
		defaultSelected: toOption(languages.find(({ tag }) => tag === languageTag()) ?? languages[0]),
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});
</script>

<div>
	<div class="controls">
		<Languages />
		<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
		<label use:melt={$label}>{m.language_select()}</label>
		<button use:melt={$trigger} aria-label="Language">{$selectedLabel}</button>
		<ChevronDown />
	</div>
	{#if $open}
		<div class="item-container" use:melt={$menu} transition:fly={{ duration: 200, y: -5 }}>
			{#each languages as language}
				<div
					class="item"
					class:selected={$isSelected(language)}
					use:melt={$option({ value: language, label: language.name })}
				>
					{language.name}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.controls {
		display: flex;
		align-items: center;
		position: relative;
	}

	.controls :global(svg) {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;

		&:first-child {
			left: 0.5rem;
		}

		&:last-child {
			right: 0.5rem;
		}
	}

	label {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	button {
		color: var(--spl-color-text);
		border-radius: var(--spl-radius-md);
		line-height: var(--spl-line-height);
		background-color: transparent;
		border: none;
		min-height: 2rem;
		width: 100%;
		padding: 0 2.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		outline: solid 2px transparent;
		white-space: nowrap;
		cursor: pointer;
		transition: border-color 0.15s;

		&:hover {
			border-color: var(--spl-color-outline-high);
		}

		&:focus-visible {
			outline: solid 2px var(--spl-color-accent-high);
		}
	}

	.item-container {
		background-color: var(--spl-color-bg-low);
		border-radius: var(--spl-radius-md);
		box-shadow: var(--spl-shadow-md);
		outline: 1px solid var(--spl-color-outline);
		scrollbar-width: none;
		padding: 0.5rem;
		margin-top: 2px;
	}

	.item {
		color: var(--spl-color-text);
		border-radius: var(--spl-radius-md);
		text-decoration: none;
		display: block;
		padding: 0.5rem 1rem;
		scroll-margin: 0.5rem;
		cursor: pointer;
		text-align: center;
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
</style>
