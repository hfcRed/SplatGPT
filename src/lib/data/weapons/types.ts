export type Weapon = {
	id: number;
	name: string;
	image: string;
	referenceKit: number;
	sub: {
		id: number;
		name: string;
		image: string;
	};
	special: {
		id: number;
		name: string;
		image: string;
	};
};
