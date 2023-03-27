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

export interface Ce_skiBoot {
  name: string;
  c_price?: number;
  photoGallery?: ComplexImage[];
}

export interface Ce_skis {
  slug?: string;
  name: string;
  c_price?: number;
  photoGallery?: ComplexImage[];
  c_abilityLevel?: {
    name: string;
    c_icon?: Image;
  }[];
  c_terrain?: {
    name: string;
    c_icon?: Image;
  }[];
}
