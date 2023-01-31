export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export default interface Ce_skis {
  name: string;
  c_price?: number;
  photoGallery?: ComplexImage[];
  slug: string;
  c_abilityLevel?: {
    name: string;
    c_icon?: ComplexImage;
  }[];
  c_terrain?: {
    name: string;
    c_icon?: ComplexImage;
  }[];
}
