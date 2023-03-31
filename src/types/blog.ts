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

export interface C_author {
	name: string,
	headshot?: ComplexImage,
}

export default interface Ce_blog {
	datePosted?: string,
	slug?: string,
	name: string,
	c_author?: C_author,
	c_blogContent?: any,
	c_blogContentPlaintext?: string,
	c_coverPhoto?: ComplexImage,
	c_generatedBlogContent?: any,
	c_keywords?: string,
	c_metaDescription?: string,
	c_subtitle?: string,
	c_summary?: string,
	id: string,
}
