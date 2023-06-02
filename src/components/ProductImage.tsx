import React from "react";
import { Image } from "@yext/pages/components";
import { ComplexImageType, ImageType } from "@yext/pages/components";

export interface ProductImageProps {
  image: ComplexImageType | ImageType;
  label?: string;
}

const ProductImage = ({ image, label }: ProductImageProps) => {
  return (
    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg relative">
      {image && (
        <Image
          className="h-full w-full object-cover object-center"
          image={image}
        />
      )}
      <div className="absolute inset-0 flex  items-end justify-end overflow-hidden rounded-lg p-4">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-60"
        />
        <p className="relative text-lg font-semibold text-white">{label}</p>
      </div>
    </div>
  );
};

export default ProductImage;
