import { weapons, type Weapon } from '$lib/data/weapons';
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
	weapon: weapons[0]
});
