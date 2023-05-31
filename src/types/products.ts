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

export interface EntityReference {
  name: string;
  c_icon: Image;
}

export default interface Ce_product {
  id: string;
  slug?: string;
  name: string;
  c_price?: number;
  photoGallery?: ComplexImage[];
  c_terrain?: EntityReference[];
  c_abilityLevel?: EntityReference[];
}
