<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Accordion from '$lib/components/common/Accordion.svelte';

	const items = [
		{
			id: '1',
			title: m.quality_estimation(),
			description: m.quality_estimation_desc()
		},
		{
			id: '2',
			title: m.output_overriding(),
			description: m.output_overriding_desc()
		}
	];
</script>

<h2>{m.information()}</h2>
<p>{@html m.information_desc({ href: '/' })}</p>
<Accordion {items} />
