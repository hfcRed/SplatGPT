<script lang="ts">
	import Icon, { type IconNodes, type IconProps } from '$lib/components/common/Icon.svelte';

	let { ...rest }: IconProps = $props();

	const nodes: IconNodes = [
		['path', { d: 'M15 3h6v6' }],
		['path', { d: 'M10 14 21 3' }],
		['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }]
	];
</script>

<Icon {...rest} {nodes} />
