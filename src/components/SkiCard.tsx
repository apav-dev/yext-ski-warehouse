import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_skis from "../types/skis";

const SkiCard = ({ result }: CardProps<Ce_skis>) => {
  const skis = result.rawData;
  const image = skis.photoGallery?.[0];

  return (
    <div>
      {image && (
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            image={image}
            className="h-full w-full object-contain object-center hover:opacity-75"
          />
        </div>
      )}
      <div className="mt-4 text-left text-base font-medium text-gray-900">
        <h3>{skis.name}</h3>
        <p>${skis.c_price}</p>
      </div>
    </div>
  );
};

export default SkiCard;
