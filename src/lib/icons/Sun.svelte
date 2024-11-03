<script lang="ts">
	import Icon, { type IconNodes, type IconProps } from '$lib/components/common/Icon.svelte';

	let { ...rest }: IconProps = $props();

	const nodes: IconNodes = [
		['circle', { cx: '12', cy: '12', r: '4' }],
		['path', { d: 'M12 2v2' }],
		['path', { d: 'M12 20v2' }],
		['path', { d: 'm4.93 4.93 1.41 1.41' }],
		['path', { d: 'm17.66 17.66 1.41 1.41' }],
		['path', { d: 'M2 12h2' }],
		['path', { d: 'M20 12h2' }],
		['path', { d: 'm6.34 17.66-1.41 1.41' }],
		['path', { d: 'm19.07 4.93-1.41 1.41' }]
	];
</script>

<Icon {...rest} {nodes} />
