<script lang="ts">
	import Icon, { type IconNodes, type IconProps } from '$lib/components/common/Icon.svelte';

	let { ...rest }: IconProps = $props();

	const nodes: IconNodes = [['path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' }]];
</script>

<Icon {...rest} {nodes} />
