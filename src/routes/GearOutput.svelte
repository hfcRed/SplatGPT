<script lang="ts">
	import { abilities, emptyAbility, mainIndexes, type Ability } from '$lib/data/abilities';
	import AbilitySlot from '$lib/components/gear-builder/AbilitySlot.svelte';

	type Token = [string, number];

	const response: Token[] = [
		['ninja_squid', 0.19505418837070465],
		['stealth_jump', 0.6710278987884521],
		['ink_saver_sub_3', 0.3713362216949463],
		['ink_saver_sub_6', 0.28483816981315613],
		['quick_super_jump_3', 0.6525979042053223],
		['quick_super_jump_6', 0.2727074921131134],
		['quick_super_jump_12', 0.02778523787856102],
		['sub_power_up_3', 0.13349542021751404],
		['sub_resistance_up_3', 0.29946425557136536],
		['swim_speed_up_3', 0.644193172454834],
		['swim_speed_up_6', 0.5566620826721191],
		['last_ditch_effort', 0.08712321519851685],
		['ink_resistance_up_3', 0.43695905804634094],
		['quick_respawn_3', 0.6126211285591125],
		['quick_respawn_6', 0.5872606635093689],
		['quick_respawn_12', 0.49403780698776245],
		['quick_respawn_15', 0.4351533055305481],
		['special_saver_3', 0.3201811611652374],
		['intensify_action_3', 0.10890817642211914],
		['intensify_action_6', 0.043546028435230255],
		['run_speed_up_3', 0.13048824667930603],
		['special_saver_6', 0.0849117860198021],
		['special_saver_12', 0.010739178396761417],
		['sub_resistance_up_6', 0.06433780491352081],
		['sub_resistance_up_12', 0.0041854046285152435],
		['sub_resistance_up_15', 0.0021448254119604826],
		['swim_speed_up_12', 0.2293911874294281],
		['comeback', 0.3339417278766632],
		['swim_speed_up_15', 0.171640083193779],
		['special_charge_up_3', 0.19611375033855438],
		['special_charge_up_6', 0.1152569055557251],
		['special_power_up_3', 0.12120576202869415],
		['sub_power_up_6', 0.059060145169496536],
		['sub_power_up_12', 0.010388990864157677],
		['sub_power_up_15', 0.00661933608353138],
		['ink_resistance_up_6', 0.09950581938028336],
		['special_power_up_6', 0.05070082098245621],
		['special_charge_up_12', 0.034540098160505295],
		['ink_recovery_up_3', 0.2719528079032898],
		['run_speed_up_6', 0.07229360938072205],
		['run_speed_up_12', 0.023666884750127792],
		['run_speed_up_15', 0.017220554873347282],
		['run_speed_up_21', 0.004690104629844427],
		['sub_power_up_21', 0.0013751051155850291],
		['respawn_punisher', 0.009214648976922035],
		['ink_recovery_up_6', 0.11739286780357361],
		['ink_recovery_up_12', 0.020801469683647156],
		['ink_recovery_up_15', 0.011947091668844223],
		['ink_saver_main_3', 0.32335081696510315],
		['ink_saver_main_6', 0.21705450117588043],
		['ink_saver_main_12', 0.07675430923700333],
		['ink_saver_main_15', 0.05159465968608856],
		['drop_roller', 0.031752169132232666],
		['ink_saver_main_21', 0.014544973149895668],
		['swim_speed_up_21', 0.06698392331600189],
		['swim_speed_up_29', 0.024033445864915848],
		['swim_speed_up_38', 0.007861514575779438],
		['swim_speed_up_51', 0.0010673169745132327],
		['special_power_up_12', 0.01185576245188713],
		['special_power_up_15', 0.007808141876012087],
		['special_charge_up_15', 0.0277100820094347],
		['object_shredder', 0.03487202897667885],
		['ink_saver_sub_12', 0.1190727949142456],
		['opening_gambit', 0.018724575638771057],
		['intensify_action_12', 0.007463659625500441],
		['intensify_action_15', 0.004008050542324781],
		['ink_saver_sub_15', 0.0806010365486145],
		['tenacity', 0.012791253626346588],
		['special_charge_up_21', 0.009843194857239723],
		['special_charge_up_29', 0.004866920877248049],
		['special_charge_up_38', 0.0021048227790743113],
		['quick_respawn_21', 0.26944848895072937],
		['quick_respawn_29', 0.10007374733686447],
		['intensify_action_21', 0.0008618859574198723],
		['special_saver_15', 0.00556325213983655],
		['run_speed_up_29', 0.0022214793134480715],
		['ink_saver_sub_21', 0.025950342416763306],
		['ink_saver_sub_29', 0.012516605667769909],
		['ink_saver_sub_38', 0.005591370165348053],
		['ink_resistance_up_12', 0.005677049979567528],
		['ink_saver_main_29', 0.004943264182657003],
		['ink_saver_main_38', 0.0026048931758850813],
		['thermal_ink', 0.012618971057236195],
		['haunt', 0.07425232976675034],
		['run_speed_up_38', 0.000918908161111176],
		['ink_resistance_up_15', 0.002290386473760009],
		['ink_saver_main_51', 0.00022132962476462126],
		['ink_saver_main_57', 0.0001434739533578977],
		['quick_super_jump_15', 0.010885012336075306],
		['intensify_action_29', 0.000263512774836272],
		['special_power_up_21', 0.0023043027613312006],
		['quick_super_jump_21', 0.0033804464619606733],
		['ability_doubler', 0.002351518487557769],
		['sub_power_up_29', 0.0008492532651871443],
		['sub_power_up_38', 0.0005119271809235215],
		['special_power_up_29', 0.0011866174172610044],
		['special_power_up_38', 0.0007390396203845739],
		['special_power_up_51', 0.00012379870167933404],
		['ink_recovery_up_21', 0.0017786530079320073],
		['ink_recovery_up_29', 0.0005244533531367779],
		['quick_respawn_38', 0.02741502970457077],
		['special_charge_up_51', 0.0003140694461762905],
		['ink_recovery_up_38', 0.00028307040338404477],
		['special_saver_21', 0.0014724628999829292],
		['special_saver_29', 0.0004392025002744049],
		['run_speed_up_51', 0.00010674953955458477],
		['swim_speed_up_57', 0.00017028349975589663],
		['ink_resistance_up_21', 0.0005035172216594219],
		['ink_resistance_up_29', 0.00014125165762379766],
		['ink_resistance_up_38', 7.81478374847211e-5],
		['intensify_action_38', 0.0001434275764040649],
		['quick_super_jump_29', 0.0018080556765198708],
		['special_charge_up_57', 0.00013138912618160248],
		['special_saver_38', 0.0001670355413807556],
		['ink_saver_sub_51', 0.00046456101699732244],
		['ink_saver_sub_57', 0.00010405027569504455],
		['sub_power_up_51', 0.00011856955825351179],
		['special_power_up_57', 6.967203080421314e-5],
		['intensify_action_51', 5.309993866831064e-5],
		['intensify_action_57', 3.9173104596557096e-5],
		['quick_super_jump_38', 0.0008089453331194818],
		['ink_resistance_up_51', 6.256678170757368e-5],
		['ink_resistance_up_57', 6.143978680483997e-5],
		['special_saver_51', 9.134631545748562e-5],
		['special_saver_57', 0.00010531331645324826],
		['quick_respawn_51', 0.0013017079327255487],
		['quick_respawn_57', 0.00028125426615588367],
		['sub_resistance_up_21', 0.00041110848542302847],
		['sub_resistance_up_29', 0.00019421371689531952],
		['sub_resistance_up_38', 6.704133556922898e-5],
		['sub_power_up_57', 5.017912189941853e-5],
		['ink_recovery_up_51', 0.00017187479534186423],
		['run_speed_up_57', 0.00013362894242163748],
		['quick_super_jump_51', 0.00018927978817373514],
		['quick_super_jump_57', 0.0001759377191774547],
		['ink_recovery_up_57', 0.00013626301370095462],
		['sub_resistance_up_51', 0.00010579281661193818],
		['sub_resistance_up_57', 0.00012514679110608995],
		['<PAD>', 9.724902660934731e-9],
		['<NULL>', 8.704054366148739e-9]
	];

	let slots: Ability[] = [
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility,
		emptyAbility
	];

	function mapResponseToSlots() {
		const sortedResponse = response.sort((a, b) => b[1] - a[1]);

		let remainingAp = 57;
		let mainAbilities: { [key: string]: number } = {};
		let subAbilities: { [key: string]: number } = {};

		while (remainingAp > 0) {
			const token = sortedResponse.shift();
			if (!token) break;

			const split = token[0].split('_');
			const num = parseInt(split[split.length - 1]) ? parseInt(split.pop() || '10') : 10;
			const tokenName = split.join('_');

			const ability = Object.values(abilities).find((ability) => ability.tokenName === tokenName);

			if (!ability) continue;

			if (num === 10) mainAbilities[ability.tokenName] = num;
			else subAbilities[ability.tokenName] = num;

			const allAp =
				Object.values(mainAbilities).reduce((acc, cur) => acc + cur, 0) +
				Object.values(subAbilities).reduce((acc, cur) => acc + cur, 0);
			remainingAp = 57 - allAp;
		}

		for (const name of Object.keys(mainAbilities)) {
			const ability = Object.values(abilities).find((ability) => ability.tokenName === name);
			if (!ability) continue;

			const index =
				Object.keys(mainIndexes).find((key) => mainIndexes[parseInt(key)] === ability.mainType) ||
				'0';

			if (slots[parseInt(index)].id !== '0') continue;

			slots[parseInt(index)] = { ...ability };
		}

		for (const [name, ap] of Object.entries(subAbilities)) {
			const ability = Object.values(abilities).find((ability) => ability.tokenName === name);
			if (!ability) continue;

			let currentAp = ap;

			const freeMainSlots = slots.reduce((acc, cur, index) => {
				if (mainIndexes.hasOwnProperty(index) && cur.id === '0') acc.push(index);
				return acc;
			}, [] as number[]);

			if (currentAp > 10 && freeMainSlots.length > 0) {
				slots[freeMainSlots.shift() || 0] = { ...ability };
				currentAp -= 10;
			}

			let freeSubSlots = slots.reduce((acc, cur, index) => {
				if (!mainIndexes.hasOwnProperty(index) && cur.id === '0') acc.push(index);
				return acc;
			}, [] as number[]);

			const count = Math.floor(currentAp / 3);

			for (let i = 0; i < count; i++) {
				if (freeSubSlots.length === 0) break;

				slots[freeSubSlots.shift() || 0] = { ...ability };

				freeSubSlots = slots.reduce((acc, cur, index) => {
					if (!mainIndexes.hasOwnProperty(index) && cur.id === '0') acc.push(index);
					return acc;
				}, [] as number[]);
			}
		}

		console.log(slots);
	}

	mapResponseToSlots();
</script>

<div>
	{#each slots as slot, index}
		<AbilitySlot
			items={slot.id === '0' ? [] : [slot]}
			mainType={mainIndexes[index] || null}
			dragDisabled
		/>
	{/each}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(4, fit-content(100%));
		gap: 1rem 0.5rem;
		align-items: center;
	}
</style>
