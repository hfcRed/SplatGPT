import type { Ability } from './types';

export const mainIndexes: { [key: number]: string } = { 0: 'head', 4: 'clothes', 8: 'shoes' };

export const emptyAbility: Ability = {
	id: '0',
	name: 'None',
	tokenName: 'none',
	mainType: 'none',
	image: '/src/lib/images/abilities/None.png'
};

export const abilities: { [key: string]: Ability } = {
	MainInk_Save: {
		id: '1',
		name: 'MainInk_Save',
		tokenName: 'ink_saver_main',
		mainType: 'none',
		image: '/src/lib/images/abilities/MainInk_Save.png'
	},
	SubInk_Save: {
		id: '2',
		name: 'SubInk_Save',
		tokenName: 'ink_saver_sub',
		mainType: 'none',
		image: '/src/lib/images/abilities/SubInk_Save.png'
	},
	InkRecovery_Up: {
		id: '3',
		name: 'InkRecovery_Up',
		tokenName: 'ink_recovery_up',
		mainType: 'none',
		image: '/src/lib/images/abilities/InkRecovery_Up.png'
	},
	HumanMove_Up: {
		id: '4',
		name: 'HumanMove_Up',
		tokenName: 'run_speed_up',
		mainType: 'none',
		image: '/src/lib/images/abilities/HumanMove_Up.png'
	},
	SquidMove_Up: {
		id: '5',
		name: 'SquidMove_Up',
		tokenName: 'swim_speed_up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SquidMove_Up.png'
	},
	SpecialIncrease_Up: {
		id: '6',
		name: 'SpecialIncrease_Up',
		tokenName: 'special_charge_up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SpecialIncrease_Up.png'
	},
	RespawnSpecialGauge_Save: {
		id: '7',
		name: 'RespawnSpecialGauge_Save',
		tokenName: 'special_saver',
		mainType: 'none',
		image: '/src/lib/images/abilities/RespawnSpecialGauge_Save.png'
	},
	SpecialSpec_Up: {
		id: '8',
		name: 'SpecialSpec_Up',
		tokenName: 'special_power_up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SpecialSpec_Up.png'
	},
	RespawnTime_Save: {
		id: '9',
		name: 'RespawnTime_Save',
		tokenName: 'quick_respawn',
		mainType: 'none',
		image: '/src/lib/images/abilities/RespawnTime_Save.png'
	},
	JumpTime_Save: {
		id: '10',
		name: 'JumpTime_Save',
		tokenName: 'quick_super_jump',
		mainType: 'none',
		image: '/src/lib/images/abilities/JumpTime_Save.png'
	},
	SubSpec_Up: {
		id: '11',
		name: 'SubSpec_Up',
		tokenName: 'sub_power_up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SubSpec_Up.png'
	},
	OpInkEffect_Reduction: {
		id: '12',
		name: 'OpInkEffect_Reduction',
		tokenName: 'ink_resistance_up',
		mainType: 'none',
		image: '/src/lib/images/abilities/OpInkEffect_Reduction.png'
	},
	SubEffect_Reduction: {
		id: '13',
		name: 'SubEffect_Reduction',
		tokenName: 'sub_resistance_up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SubEffect_Reduction.png'
	},
	Action_Up: {
		id: '14',
		name: 'Action_Up',
		tokenName: 'intensify_action',
		mainType: 'none',
		image: '/src/lib/images/abilities/Action_Up.png'
	},
	StartAllUp: {
		id: '15',
		name: 'StartAllUp',
		tokenName: 'opening_gambit',
		mainType: 'head',
		image: '/src/lib/images/abilities/StartAllUp.png'
	},
	EndAllUp: {
		id: '16',
		name: 'EndAllUp',
		tokenName: 'last_ditch_effort',
		mainType: 'head',
		image: '/src/lib/images/abilities/EndAllUp.png'
	},
	MinorityUp: {
		id: '17',
		name: 'MinorityUp',
		tokenName: 'tenacity',
		mainType: 'head',
		image: '/src/lib/images/abilities/MinorityUp.png'
	},
	ComeBack: {
		id: '18',
		name: 'ComeBack',
		tokenName: 'comeback',
		mainType: 'head',
		image: '/src/lib/images/abilities/ComeBack.png'
	},
	SquidMoveSpatter_Reduction: {
		id: '19',
		name: 'SquidMoveSpatter_Reduction',
		tokenName: 'ninja_squid',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/SquidMoveSpatter_Reduction.png'
	},
	DeathMarking: {
		id: '20',
		name: 'DeathMarking',
		tokenName: 'haunt',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/DeathMarking.png'
	},
	ThermalInk: {
		id: '21',
		name: 'ThermalInk',
		tokenName: 'thermal_ink',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/ThermalInk.png'
	},
	Exorcist: {
		id: '22',
		name: 'Exorcist',
		tokenName: 'respawn_punisher',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/Exorcist.png'
	},
	ExSkillDouble: {
		id: '23',
		name: 'ExSkillDouble',
		tokenName: 'ability_doubler',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/ExSkillDouble.png'
	},
	SuperJumpSign_Hide: {
		id: '24',
		name: 'SuperJumpSign_Hide',
		tokenName: 'stealth_jump',
		mainType: 'shoes',
		image: '/src/lib/images/abilities/SuperJumpSign_Hide.png'
	},
	ObjectEffect_Up: {
		id: '25',
		name: 'ObjectEffect_Up',
		tokenName: 'object_shredder',
		mainType: 'shoes',
		image: '/src/lib/images/abilities/ObjectEffect_Up.png'
	},
	SomersaultLanding: {
		id: '26',
		name: 'SomersaultLanding',
		tokenName: 'drop_roller',
		mainType: 'shoes',
		image: '/src/lib/images/abilities/SomersaultLanding.png'
	}
};
