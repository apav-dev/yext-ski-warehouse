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

export default interface Ce_video {
	name: string,
	c_channelID?: string,
	c_channelTitle?: string,
	c_publishTime?: string,
	c_videoDescription?: any,
	c_videoThumbnail?: Image,
	id: string,
}
