import type { Ability } from './types';

export const emptyAbility: Ability = {
	id: '0',
	name: 'None',
	mainType: 'none',
	image: '/src/lib/images/abilities/None.png'
};

export const abilities: { [key: string]: Ability } = {
	MainInk_Save: {
		id: '1',
		name: 'MainInk_Save',
		mainType: 'none',
		image: '/src/lib/images/abilities/MainInk_Save.png'
	},
	SubInk_Save: {
		id: '2',
		name: 'SubInk_Save',
		mainType: 'none',
		image: '/src/lib/images/abilities/SubInk_Save.png'
	},
	InkRecovery_Up: {
		id: '3',
		name: 'InkRecovery_Up',
		mainType: 'none',
		image: '/src/lib/images/abilities/InkRecovery_Up.png'
	},
	HumanMove_Up: {
		id: '4',
		name: 'HumanMove_Up',
		mainType: 'none',
		image: '/src/lib/images/abilities/HumanMove_Up.png'
	},
	SquidMove_Up: {
		id: '5',
		name: 'SquidMove_Up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SquidMove_Up.png'
	},
	SpecialIncrease_Up: {
		id: '6',
		name: 'SpecialIncrease_Up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SpecialIncrease_Up.png'
	},
	RespawnSpecialGauge_Save: {
		id: '7',
		name: 'RespawnSpecialGauge_Save',
		mainType: 'none',
		image: '/src/lib/images/abilities/RespawnSpecialGauge_Save.png'
	},
	SpecialSpec_Up: {
		id: '8',
		name: 'SpecialSpec_Up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SpecialSpec_Up.png'
	},
	RespawnTime_Save: {
		id: '9',
		name: 'RespawnTime_Save',
		mainType: 'none',
		image: '/src/lib/images/abilities/RespawnTime_Save.png'
	},
	JumpTime_Save: {
		id: '10',
		name: 'JumpTime_Save',
		mainType: 'none',
		image: '/src/lib/images/abilities/JumpTime_Save.png'
	},
	SubSpec_Up: {
		id: '11',
		name: 'SubSpec_Up',
		mainType: 'none',
		image: '/src/lib/images/abilities/SubSpec_Up.png'
	},
	OpInkEffect_Reduction: {
		id: '12',
		name: 'OpInkEffect_Reduction',
		mainType: 'none',
		image: '/src/lib/images/abilities/OpInkEffect_Reduction.png'
	},
	SubEffect_Reduction: {
		id: '13',
		name: 'SubEffect_Reduction',
		mainType: 'none',
		image: '/src/lib/images/abilities/SubEffect_Reduction.png'
	},
	Action_Up: {
		id: '14',
		name: 'Action_Up',
		mainType: 'none',
		image: '/src/lib/images/abilities/Action_Up.png'
	},
	StartAllUp: {
		id: '15',
		name: 'StartAllUp',
		mainType: 'head',
		image: '/src/lib/images/abilities/StartAllUp.png'
	},
	EndAllUp: {
		id: '16',
		name: 'EndAllUp',
		mainType: 'head',
		image: '/src/lib/images/abilities/EndAllUp.png'
	},
	MinorityUp: {
		id: '17',
		name: 'MinorityUp',
		mainType: 'head',
		image: '/src/lib/images/abilities/MinorityUp.png'
	},
	ComeBack: {
		id: '18',
		name: 'ComeBack',
		mainType: 'head',
		image: '/src/lib/images/abilities/ComeBack.png'
	},
	SquidMoveSpatter_Reduction: {
		id: '19',
		name: 'SquidMoveSpatter_Reduction',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/SquidMoveSpatter_Reduction.png'
	},
	DeathMarking: {
		id: '20',
		name: 'DeathMarking',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/DeathMarking.png'
	},
	ThermalInk: {
		id: '21',
		name: 'ThermalInk',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/ThermalInk.png'
	},
	Exorcist: {
		id: '22',
		name: 'Exorcist',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/Exorcist.png'
	},
	ExSkillDouble: {
		id: '23',
		name: 'ExSkillDouble',
		mainType: 'clothes',
		image: '/src/lib/images/abilities/ExSkillDouble.png'
	},
	SuperJumpSign_Hide: {
		id: '24',
		name: 'SuperJumpSign_Hide',
		mainType: 'shoes',
		image: '/src/lib/images/abilities/SuperJumpSign_Hide.png'
	},
	ObjectEffect_Up: {
		id: '25',
		name: 'ObjectEffect_Up',
		mainType: 'shoes',
		image: '/src/lib/images/abilities/ObjectEffect_Up.png'
	},
	SomersaultLanding: {
		id: '26',
		name: 'SomersaultLanding',
		mainType: 'shoes',
		image: '/src/lib/images/abilities/SomersaultLanding.png'
	}
};
