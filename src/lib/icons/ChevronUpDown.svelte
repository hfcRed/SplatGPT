<script lang="ts">
	import Icon, { type IconNodes, type IconProps } from '$lib/components/common/Icon.svelte';

	let { ...rest }: IconProps = $props();

	const nodes: IconNodes = [
		['path', { d: 'm7 15 5 5 5-5' }],
		['path', { d: 'm7 9 5-5 5 5' }]
	];
</script>

<Icon {...rest} {nodes} />
