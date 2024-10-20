export type Weapon = {
	id: number;
	name: string;
	image: string;
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
