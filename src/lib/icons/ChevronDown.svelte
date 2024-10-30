<script lang="ts">
	import Icon, { type IconNodes, type IconProps } from '$lib/components/common/Icon.svelte';

	let { ...rest }: IconProps = $props();

	const nodes: IconNodes = [['path', { d: 'm6 9 6 6 6-6' }]];
</script>

<Icon {...rest} {nodes} />
