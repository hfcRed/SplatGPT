<script lang="ts" context="module">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export type Color = 'theme' | 'green' | 'red' | 'neutral';
	export type Size = 'small' | 'medium' | 'large';
	export type Variant = 'filled' | 'outlined' | 'text';

	type BaseProps = {
		color?: Color;
		size?: Size;
		variant?: Variant;
		loading?: boolean;
		full?: boolean;
		rounded?: boolean;
		circle?: boolean;
		custom?: boolean;
	};

	export type ButtonProps = HTMLButtonAttributes & BaseProps & { href?: never; target?: never };
	export type LinkProps = HTMLAnchorAttributes & BaseProps & { type?: never; disabled?: never };
</script>

<script lang="ts">
	import Spinner from './Spinner.svelte';
	type Props = ButtonProps | LinkProps;

	export let color: Color = 'theme';
	export let size: Size = 'medium';
	export let variant: Variant = 'filled';
	export let href: Props['href'] = undefined;
	export let type: Props['type'] = 'button';
	export let disabled: Props['disabled'] = false;
	export let target: Props['target'] = undefined;
	export let loading = false;
	export let full = false;
	export let rounded = false;
	export let circle = false;
	export let custom = false;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role={href ? undefined : 'button'}
	type={href ? undefined : type}
	aria-disabled={disabled ? 'true' : undefined}
	class={`${color} ${size} ${variant} ${full ? 'full' : ''} ${rounded ? 'round' : ''} ${circle ? 'circle' : ''} ${custom ? 'custom' : ''}`}
	data-loading={loading}
	{href}
	{target}
	{disabled}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
	on:mousedown
	on:pointerdown
	on:mouseup
	on:pointerup
>
	<Spinner color="currentColor" size="1.5em" strokeWidth="3" />
	<div>
		<slot />
	</div>
</svelte:element>

<style>
	button,
	a {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
		min-height: var(--spl-min-height);
		height: auto;
		white-space: nowrap;
		font-weight: 600;
		border: 1px solid transparent;
		position: relative;
		cursor: pointer;
		text-decoration: none;
		transition:
			background-color 0.15s,
			opacity 0.15s,
			transform 0.05s;

		&:active:not(:disabled) {
			transform: scale(0.95, 0.97);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&:focus-visible {
			outline: solid 2px var(--spl-button-color);
			outline-offset: 1px;
		}
	}

	div {
		gap: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button[data-loading='true'],
	a[data-loading='true'] {
		pointer-events: none;
	}

	button[data-loading='true'] div,
	a[data-loading='true'] div {
		visibility: hidden;
	}

	button :global(.spinner),
	a :global(.spinner) {
		position: absolute;
		top: calc(50% - 0.75em);
		left: calc(50% - 0.75em);
	}

	button[data-loading='false'] :global(.spinner),
	a[data-loading='false'] :global(.spinner) {
		visibility: hidden;
	}

	.theme {
		--spl-button-color: var(--spl-color-accent-high);
		--spl-button-color-hover: var(--spl-color-accent-low);
	}

	.green {
		--spl-button-color: var(--spl-color-green-high);
		--spl-button-color-hover: var(--spl-color-green-low);
	}

	.red {
		--spl-button-color: var(--spl-color-red-high);
		--spl-button-color-hover: var(--spl-color-red-low);
	}

	.neutral {
		--spl-button-color: var(--spl-color-text);
		--spl-button-color-hover: var(--spl-color-bg-high);
	}

	.filled {
		background-color: var(--spl-button-color);
		color: var(--spl-color-text-inverse);

		&:hover:not(:disabled),
		&:focus-visible {
			background-color: color-mix(in hsl, var(--spl-button-color) 90%, black);
		}

		&:active:not(:disabled) {
			background-color: var(--spl-button-color);
		}
	}

	.outlined {
		color: var(--spl-button-color);
		border-color: var(--spl-button-color);
		background-color: transparent;

		&:hover:not(:disabled),
		&:focus-visible {
			background-color: var(--spl-button-color-hover);
		}
	}

	.text {
		background-color: transparent;
		color: var(--spl-button-color);

		&:hover:not(:disabled),
		&:focus-visible {
			background-color: var(--spl-button-color-hover);
		}
	}

	.small {
		--spl-min-height: 2rem;
		border-radius: var(--spl-radius-sm);
		padding: 0 0.5rem;
	}

	.medium {
		--spl-min-height: 2.5rem;
		border-radius: var(--spl-radius-md);
		padding: 0 1rem;
	}

	.large {
		--spl-min-height: 3rem;
		border-radius: var(--spl-radius-lg);
		padding: 0 1.5rem;
	}

	.full {
		width: 100%;
	}

	.round {
		border-radius: 99999px;
	}

	.circle {
		min-width: var(--spl-min-height);
		border-radius: 50%;
		padding: 0px 0px;
	}

	.custom {
		--spl-min-height: var(--spl-custom-height);
		background-color: var(--spl-custom-bg);
		color: var(--spl-custom-text);
		border: 1px solid var(--spl-custom-border);

		&:hover:not(:disabled),
		&:focus-visible {
			background-color: var(--spl-custom-bg-hover);
		}
	}
</style>
