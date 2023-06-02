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

export interface Icon {
  name: string;
  c_icon: ComplexImage;
}
export default interface Ce_product {
  id: string;
  slug: string;
  name: string;
  c_price?: string;
  c_sizes?: string[];
  c_brand?: string;
  c_turningRadius?: string;
  c_rockerType?: string;
  photoGallery: ComplexImage[];
  c_terrain?: Icon[];
  c_abilityLevel?: Icon[];
}
