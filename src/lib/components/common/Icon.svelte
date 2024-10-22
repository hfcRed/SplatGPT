<script lang="ts" context="module">
	import type { SVGAttributes, SvelteHTMLElements } from 'svelte/elements';

	export type Color = 'theme' | 'green' | 'red' | 'currentColor';

	export type IconProps = {
		color?: Color;
		size?: number | string;
		strokeWidth?: number | string;
		flippedX?: boolean;
		flippedY?: boolean;
	};

	export type IconNodes = [
		element: keyof SvelteHTMLElements,
		attributes: SVGAttributes<SVGSVGElement>
	][];
</script>

<script lang="ts">
	export let nodes: IconNodes = [];
	export let color: Color = 'currentColor';
	export let size: number | string = '1em';
	export let strokeWidth: number | string = 2;
	export let flippedX: boolean = false;
	export let flippedY: boolean = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke="currentColor"
	width={size}
	height={size}
	stroke-width={strokeWidth}
	class={`${color} ${flippedX ? 'flip-x' : ''} ${flippedY ? 'flip-y' : ''}`}
>
	{#each nodes as [element, attributes]}
		<svelte:element this={element} {...attributes} />
	{/each}
</svg>

<style>
	.flip-x {
		transform: scaleX(-1);
	}
	.flip-y {
		transform: scaleY(-1);
	}

	.theme {
		stroke: var(--sf-color-accent-high);
	}

	.green {
		stroke: var(--sf-color-green-high);
	}

	.red {
		stroke: var(--sf-color-red-high);
	}

	.neutral {
		stroke: var(--sf-color-text);
	}

	.currentColor {
		stroke: currentColor;
	}
</style>
