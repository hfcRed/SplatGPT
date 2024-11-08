import { weapons, type Weapon } from '$lib/data/weapons';
import { emptyAbility, type Ability } from '$lib/data/abilities';

export type Token = [string, number];

class GearStates {
	private emptySlots: Ability[] = Array(12).fill(emptyAbility);

	inputSlots: Ability[] = $state([...this.emptySlots]);
	outputSlots: Ability[] = $state([...this.emptySlots]);
	currentWeapon: Weapon = $state(weapons[0]);
	isFetching: boolean = $state(false);
	fetchError: boolean = $state(false);
	outputTokens: Token[] = $state([]);
	outputId: string | undefined = $state(undefined);

	clearInputSlots() {
		this.inputSlots = [...this.emptySlots];
	}

	clearOutputSlots() {
		this.outputSlots = [...this.emptySlots];
	}
}

export const gearStates = new GearStates();
