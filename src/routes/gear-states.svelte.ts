import type { Weapon } from '$lib/data/weapons';
import { emptyAbility, type Ability } from '$lib/data/abilities';

export type Token = [string, number];

export const inputSlots: { [abilities: string]: Ability[] } = $state({
	abilities: Array(12).fill(emptyAbility)
});

export const outputSlots: { [abilities: string]: Ability[] } = $state({
	abilities: Array(12).fill(emptyAbility)
});

export const outputPredictions: { [tokens: string]: Token[] } = $state({
	tokens: []
});

export const isRunning: { [state: string]: boolean } = $state({ state: false });

export const weapon: { [weapon: string]: Weapon } = $state({
	weapon: {
		id: 0,
		name: 'Shooter_Short_00',
		image: '/src/lib/images/weapons/Path_Wst_Shooter_Short_00.png',
		referenceKit: 0,
		sub: {
			id: 6,
			name: 'Bomb_Curling',
			image: '/src/lib/images/subs/6.png'
		},
		special: {
			id: 11,
			name: 'SpUltraStamp',
			image: '/src/lib/images/specials/11.png'
		}
	}
});
