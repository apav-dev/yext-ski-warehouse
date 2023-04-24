import React from "react";
import { ComplexImageType, Image } from "@yext/pages/components";

export interface GridHeroProps {
  title?: string;
  subtitle?: string;
  cta?: {
    label: string;
    link: string;
  };
  image?: ComplexImageType;
}

const GridHero = ({ title, subtitle, cta, image }: GridHeroProps) => {
  return (
    <div className="flex flex-col border-b border-gray-200 lg:border-0">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute hidden h-full w-1/2 bg-white lg:block"
        />
        <div className="relative bg-white lg:bg-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
            <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
              <div className="lg:pr-16">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                  {title}
                </h1>
                <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
                {cta && (
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-block rounded-md border border-transparent bg-sky-400 px-8 py-3 font-medium text-white hover:bg-sky-700"
                    >
                      {cta.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2 2xl:max-w-3xl 2xl:left-1/2">
          {image && (
            <Image
              image={image}
              className="h-full w-full object-cover object-center shadow-md "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GridHero;
