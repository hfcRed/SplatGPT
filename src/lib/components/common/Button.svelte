<script lang="ts" module>
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

	let {
		color = 'theme',
		size = 'medium',
		variant = 'filled',
		href = undefined,
		type = 'button',
		disabled = false,
		target = undefined,
		loading = false,
		full = false,
		rounded = false,
		circle = false,
		custom = false,
		children,
		...rest
	}: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role={href ? undefined : 'button'}
	type={href ? undefined : type}
	aria-disabled={disabled ? 'true' : undefined}
	class={`${color} ${size} ${variant}`}
	class:circle
	class:custom
	class:full
	class:rounded
	data-loading={loading}
	{href}
	{target}
	{disabled}
	{...rest}
>
	<Spinner color="currentColor" size="1.5em" strokeWidth="3" />
	<div>
		{@render children?.()}
	</div>
</svelte:element>

<style>
	button,
	a {
		min-height: var(--btn-min-height);
		border-radius: var(--btn-radius);
		padding: var(--btn-padding);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
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
			outline: solid 2px var(--btn-color);
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

	.filled {
		background-color: var(--btn-color);
		color: var(--spl-color-text-inverse);

		&:hover:not(:disabled),
		&:focus-visible {
			background-color: color-mix(in hsl, var(--btn-color) 85%, black);
		}

		&:active:not(:disabled) {
			background-color: var(--btn-color);
		}
	}

	.outlined {
		color: var(--btn-color);
		border-color: var(--btn-color);
		background-color: transparent;

		&:hover:not(:disabled),
		&:focus-visible {
			background-color: var(--btn-color-hover);
		}
	}

	.text {
		background-color: transparent;
		color: var(--btn-color);

		&:hover:not(:disabled),
		&:focus-visible {
			background-color: var(--btn-color-hover);
		}
	}

	.custom {
		--btn-min-height: var(--btn-custom-height);
		--btn-padding: var(--btn-custom-padding);
		background-color: var(--btn-custom-bg);
		color: var(--btn-custom-text);
		border: var(--btn-custom-border);

		&:hover:not(:disabled),
		&:focus-visible {
			background-color: var(--btn-custom-bg-hover);
		}
	}

	.theme {
		--btn-color: var(--spl-color-accent-high);
		--btn-color-hover: var(--spl-color-accent-low);
	}

	.green {
		--btn-color: var(--spl-color-green-high);
		--btn-color-hover: var(--spl-color-green-low);
	}

	.red {
		--btn-color: var(--spl-color-red-high);
		--btn-color-hover: var(--spl-color-red-low);
	}

	.neutral {
		--btn-color: var(--spl-color-text);
		--btn-color-hover: var(--spl-color-bg-high);
	}

	.small {
		--btn-min-height: 2rem;
		--btn-radius: var(--spl-radius-sm);
		--btn-padding: 0 0.5rem;
	}

	.medium {
		--btn-min-height: 2.5rem;
		--btn-radius: var(--spl-radius-md);
		--btn-padding: 0 1rem;
	}

	.large {
		--btn-min-height: 3rem;
		--btn-radius: var(--spl-radius-lg);
		--btn-padding: 0 1.5rem;
	}

	.rounded {
		--btn-radius: 99999px;
	}

	.circle {
		--btn-radius: 50%;
		--btn-padding: 0px 0px;
		min-width: var(--btn-min-height);
	}

	.full {
		width: 100%;
	}
</style>
