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

export default interface Ce_helpArticle {
	datePosted?: string,
	slug?: string,
	name: string,
	c_coverPhoto?: ComplexImage,
	c_helpArticleContent?: any,
	c_keywords?: string,
	c_metaDescription?: string,
	c_subtitle?: string,
	c_summary?: string,
	id: string,
}
