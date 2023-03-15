import { Image, Link } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_skis from "../types/skis";

const SkiCard = ({ result }: CardProps<Ce_skis>) => {
  const skis = result.rawData;
  const image = skis.photoGallery?.[0];
  const abilityLevel = skis.c_abilityLevel?.[0];
  const terrain = skis.c_terrain?.[0];

  return (
    <Link href={"/" + skis.slug}>
      <div key={result.id}>
        <div className="relative">
          <div className="relative h-96 w-full overflow-hidden rounded-lg">
            {image && (
              <Image
                className="h-full w-full object-cover object-center"
                image={image}
                loading="eager"
              />
            )}
          </div>
          <div className="relative mt-4">
            <h3 className="text-sm font-medium text-gray-900 text-left">
              {skis.name}
            </h3>
            {abilityLevel && (
              <div className="flex items-center">
                {abilityLevel.c_icon && <Image image={abilityLevel.c_icon} />}
                <p className="ml-1 text-sm text-gray-500 text-left">
                  {abilityLevel.name}
                </p>
              </div>
            )}
            {terrain && (
              <div className="flex items-center">
                {terrain.c_icon && (
                  <Image className="" image={terrain.c_icon} />
                )}
                <p className="ml-1 text-sm text-gray-500 text-left">
                  {terrain.name}
                </p>
              </div>
            )}
          </div>
          <div className="absolute inset-x-0 top-0 flex h-96 items-end justify-end overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-60"
            />
            {skis.c_price && (
              <p className="relative text-lg font-semibold text-white">
                {`$${skis.c_price}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SkiCard;
