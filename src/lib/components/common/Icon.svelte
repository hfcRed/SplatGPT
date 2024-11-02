<script lang="ts" module>
	import type { SVGAttributes, SvelteHTMLElements } from 'svelte/elements';

	export type Color = 'theme' | 'green' | 'red' | 'currentColor';

	export type IconNodes = [
		element: keyof SvelteHTMLElements,
		attributes: SVGAttributes<SVGSVGElement>
	][];

	export type IconProps = {
		nodes?: IconNodes;
		color?: Color;
		size?: number | string;
		viewBox?: string;
		strokeWidth?: number | string;
		flippedX?: boolean;
		flippedY?: boolean;
		rotate?: number;
		duration?: number;
	};
</script>

<script lang="ts">
	let {
		nodes = [],
		color = 'currentColor',
		size = '1em',
		viewBox = '0 0 24 24',
		strokeWidth = 2,
		flippedX = false,
		flippedY = false,
		rotate = undefined,
		duration = undefined
	}: IconProps = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke="currentColor"
	width={size}
	height={size}
	stroke-width={strokeWidth}
	class={`${color}`}
	class:flip-x={flippedX}
	class:flip-y={flippedY}
	style:transform={rotate === undefined ? undefined : `rotate(${rotate}deg)`}
	style:transition-property={duration === undefined ? undefined : 'transform'}
	style:transition-duration={duration === undefined ? undefined : `${duration}ms`}
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
