import { Link } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_product from "../../types/products";
import IconLabel from "../LabelIcon";
import ProductImage from "../ProductImage";

const ProductCard = ({ result }: CardProps<Ce_product>) => {
  const skis = result.rawData;
  const image = skis.photoGallery?.[0];
  const abilityLevel = skis.c_abilityLevel?.[0];
  const terrain = skis.c_terrain?.[0];

  return (
    <Link href={`/${skis.slug}`}>
      <div className="relative">
        {image && <ProductImage image={image} label={"$" + skis.c_price} />}
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900 text-left">
            {skis.name}
          </h3>
          {abilityLevel && <IconLabel icon={abilityLevel} />}
          {terrain && <IconLabel icon={terrain} />}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
