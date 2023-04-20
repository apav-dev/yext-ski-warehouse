import React from "react";
import { ComplexImageType, Image } from "@yext/pages/components";

export interface HeroProps {
  title?: string;
  description?: string;
  image?: ComplexImageType;
  cta?: {
    label: string;
    link: string;
  };
}

const Hero = ({ title, description, cta, image }: HeroProps) => {
  return (
    <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
      {image && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            image={image}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 bg-opacity-50"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          id="cause-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-3 text-xl text-white">{description}</p>
        {cta && (
          <a
            href={cta.link}
            className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
};

export default Hero;
