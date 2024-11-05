export type Image = {
	sources: {
		avif: string;
		webp: string;
		png: string;
	};
	img: {
		src: string;
		w: number;
		h: number;
	};
};

export const weaponImages = import.meta.glob<Image>('/src/lib/images/weapons/*.png', {
	query: { enhanced: true, w: 96 },
	import: 'default',
	eager: true
});

export const subImages = import.meta.glob<Image>('/src/lib/images/subs/*.png', {
	query: { enhanced: true, w: 96 },
	import: 'default',
	eager: true
});

export const specialImages = import.meta.glob<Image>('/src/lib/images/specials/*.png', {
	query: { enhanced: true, w: 96 },
	import: 'default',
	eager: true
});

export const abilityImages = import.meta.glob<Image>('/src/lib/images/abilities/*.png', {
	query: { enhanced: true, w: 96 },
	import: 'default',
	eager: true
});

export const allImages: Record<string, Image> = Object.assign(
	{},
	weaponImages,
	subImages,
	specialImages,
	abilityImages
);
