import React from "react";
import { ComplexImageType, Image } from "@yext/pages/components";
import { twMerge } from "tailwind-merge";

export interface FeatureCardProps {
  title?: string;
  image?: ComplexImageType;
  link?: string;
  rowSpan?: 1 | 2;
}

const CategoryCard = ({ title, image, link, rowSpan }: FeatureCardProps) => {
  return (
    <div
      className={twMerge(
        "group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative",
        rowSpan === 2
          ? "sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2"
          : "sm:h-full"
      )}
    >
      {image ? (
        <Image
          image={image}
          layout="aspect"
          aspectRatio={rowSpan === 2 ? 1 : 2}
          className={twMerge(
            "object-cover object-center group-hover:opacity-75 ",
            rowSpan === 1 ? "sm:absolute sm:inset-0 sm:h-full sm:w-full" : ""
          )}
        />
      ) : (
        <img
          src={
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          }
          className={twMerge(
            "object-cover object-center group-hover:opacity-75",
            rowSpan === 1 ? "sm:absolute sm:inset-0 sm:h-full sm:w-full" : ""
          )}
        />
      )}
      <div
        aria-hidden="true"
        className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
      />
      <div className="flex items-end p-6 sm:absolute sm:inset-0">
        <div>
          <h3 className="font-semibold text-white">
            <a href={link}>
              <span className="absolute inset-0" />
              {title || "Feature Card"}
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
