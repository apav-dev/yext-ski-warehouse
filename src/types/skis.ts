export interface EntityReference {
	entityId: string,
	name: string,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export default interface Ce_skis {
	description?: string,
	name: string,
	c_abilityLevel?: EntityReference[],
	c_gender?: EntityReference[],
	c_price?: number,
	c_terrain?: EntityReference[],
	photoGallery?: ComplexImage[],
	id: string,
}
