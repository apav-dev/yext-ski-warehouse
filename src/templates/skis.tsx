import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TemplateConfig,
} from "@yext/pages";
import Header from "../components/Header";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { Image } from "@yext/pages/components";
import Main from "../layouts/Main";

export const config: TemplateConfig = {
  stream: {
    $id: "skis",
    fields: [
      "name",
      "description",
      "photoGallery",
      "c_price",
      "slug",
      "c_abilityLevel.name",
      "c_abilityLevel.c_icon",
      "c_terrain.name",
      "c_terrain.c_icon",
    ],
    filter: {
      // savedFilterIds: [YEXT_PUBLIC_SKI_FILTER],
      entityTypes: ["ce_skis"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateRenderProps> = ({ document }) => {
  return document.slug ?? document.id;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const SkiFinder = ({ document }: TemplateRenderProps) => {
  const {
    _site,
    name,
    description,
    photoGallery,
    c_price,
    c_abilityLevel,
    c_terrain,
  } = document;
  const logo = _site?.c_primaryLogo;
  const navBar = _site?.c_navBar;
  const image = photoGallery?.[0];
  const abilityLevel = c_abilityLevel?.[0];
  const terrain = c_terrain?.[0];

  return (
    <Main>
      <div className="relative">
        <Header logo={logo} navigation={navBar} />
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            {/* <nav aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-2">
                  {product.breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center text-sm">
                        <a
                          href={breadcrumb.href}
                          className="font-medium text-gray-500 hover:text-gray-900"
                        >
                          {breadcrumb.name}
                        </a>
                        {breadcrumbIdx !== product.breadcrumbs.length - 1 ? (
                          <svg
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            aria-hidden="true"
                            className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                          </svg>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
 */}
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">{`$${c_price}`}</p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={twMerge(
                              5 > rating ? "text-yellow-400" : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      {/* <p className="sr-only">
                          {reviews.average} out of 5 stars
                        </p> */}
                    </div>
                    {/* <p className="ml-2 text-sm text-gray-500">
                        {reviews.totalCount} reviews
                      </p> */}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{description}</p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">
                  In stock and ready to ship
                </p>
              </div>
              {abilityLevel && (
                <div className="flex items-center">
                  {abilityLevel.c_icon && <Image image={abilityLevel.c_icon} />}
                  <p className="ml-2 text-sm text-gray-500 text-left">
                    {abilityLevel.name}
                  </p>
                </div>
              )}
              {terrain && (
                <div className="flex items-center">
                  {terrain.c_icon && (
                    <Image className="" image={terrain.c_icon} />
                  )}
                  <p className="ml-2 text-sm text-gray-500 text-left">
                    {terrain.name}
                  </p>
                </div>
              )}
            </section>
          </div>

          {image && (
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                <Image
                  image={image}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Main>
  );
};

export default SkiFinder;
