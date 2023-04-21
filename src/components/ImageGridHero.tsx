import React from "react";
import { ComplexImageType, Image } from "@yext/pages/components";

export interface HeroProps {
  title: string;
  subtitle: string;
  cta?: {
    label: string;
    link: string;
  };
  images?: ComplexImageType[];
}

const ImageGridHero = ({ title, subtitle, cta, images }: HeroProps) => {
  return (
    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div className="sm:max-w-lg">
          <h1 className="font text-4xl font-bold tracking-tight text-sky-400 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-xl text-gray-500">{subtitle}</p>
        </div>
        <div>
          <div className="mt-10">
            {/* Decorative image grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  {images && images.length > 0 && (
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {images[0] && (
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <Image
                            className="h-full w-full object-cover object-center"
                            image={images[0]}
                          />
                        </div>
                      )}
                      {images[1] && (
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            className="h-full w-full object-cover object-center"
                            image={images[1]}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {images && images.length > 2 && (
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {images[2] && (
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            className="h-full w-full object-cover object-center"
                            image={images[2]}
                          />
                        </div>
                      )}
                      {images[3] && (
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            className="h-full w-full object-cover object-center"
                            image={images[3]}
                          />
                        </div>
                      )}
                      {images[4] && (
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            className="h-full w-full object-cover object-center"
                            image={images[4]}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {images && images.length > 5 && (
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {images[5] && (
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            className="h-full w-full object-cover object-center"
                            image={images[5]}
                          />
                        </div>
                      )}
                      {images[6] && (
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            className="h-full w-full object-cover object-center"
                            image={images[6]}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {cta && (
              <a
                href={cta.link}
                className="inline-block rounded-md border border-transparent bg-sky-400 px-8 py-3 text-center font-medium text-white hover:bg-sky-700"
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGridHero;
