export type Ability = {
	id: string;
	name: string;
	main: boolean;
	mainType?: 'head' | 'clothes' | 'shoes';
};

export const abilities: Ability[] = [
	{ id: '101', name: 'MainInk_Save', main: false },
	{ id: '102', name: 'SubInk_Save', main: false },
	{ id: '103', name: 'InkRecovery_Up', main: false },
	{ id: '104', name: 'HumanMove_Up', main: false },
	{ id: '105', name: 'SquidMove_Up', main: false },
	{ id: '106', name: 'SpecialIncrease_Up', main: false },
	{ id: '107', name: 'RespawnSpecialGauge_Save', main: false },
	{ id: '108', name: 'SpecialSpec_Up', main: false },
	{ id: '109', name: 'RespawnTime_Save', main: false },
	{ id: '110', name: 'JumpTime_Save', main: false },
	{ id: '111', name: 'SubSpec_Up', main: false },
	{ id: '112', name: 'OpInkEffect_Reduction', main: false },
	{ id: '113', name: 'SubEffect_Reduction', main: false },
	{ id: '114', name: 'Action_Up', main: false },
	{ id: '115', name: 'StartAllUp', main: true, mainType: 'head' },
	{ id: '116', name: 'EndAllUp', main: true, mainType: 'head' },
	{ id: '117', name: 'MinorityUp', main: true, mainType: 'head' },
	{ id: '118', name: 'ComeBack', main: true, mainType: 'head' },
	{ id: '119', name: 'SquidMoveSpatter_Reduction', main: true, mainType: 'clothes' },
	{ id: '120', name: 'DeathMarking', main: true, mainType: 'clothes' },
	{ id: '121', name: 'ThermalInk', main: true, mainType: 'clothes' },
	{ id: '122', name: 'Exorcist', main: true, mainType: 'clothes' },
	{ id: '123', name: 'ExSkillDouble', main: true, mainType: 'clothes' },
	{ id: '124', name: 'SuperJumpSign_Hide', main: true, mainType: 'shoes' },
	{ id: '125', name: 'ObjectEffect_Up', main: true, mainType: 'shoes' },
	{ id: '126', name: 'SomersaultLanding', main: true, mainType: 'shoes' }
];
