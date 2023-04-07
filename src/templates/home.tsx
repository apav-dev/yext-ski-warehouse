import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TemplateConfig,
  TransformProps,
} from "@yext/pages";
import { Image } from "@yext/pages/components";
import Header from "../components/Header";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import ProductCard from "../components/search/ProductCard";
import { v4 as uuid } from "uuid";
import GuidedSearchCover from "../assets/images/guided-search-cover.jpeg";

export const config: TemplateConfig = {
  stream: {
    $id: "home",
    fields: [
      "name",
      "c_coverPhoto",
      "slug",
      "c_headingText",
      "c_featuredLinks",
      "c_featuredProducts.name",
      "c_featuredProducts.c_price",
      "c_featuredProducts.photoGallery",
      "c_featuredProducts.slug",
    ],
    filter: {
      entityIds: ["warehouse_home"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  const { _site } = data.document;

  return {
    ...data,
    document: {
      ...data.document,
      _site: transformSiteData(_site),
    },
  };
};

export const getPath: GetPath<TemplateRenderProps> = ({ document }) => {
  return document.slug ?? "index.html";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Ski Warehouse - Home",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Find the perfect skis for you",
        },
      },
    ],
  };
};

const Home = ({ document }: TemplateRenderProps) => {
  const {
    _site,
    c_coverPhoto,
    c_headingText,
    c_featuredLinks,
    c_featuredProducts,
  } = document;

  const featuredProducts = c_featuredProducts?.map((product) => ({
    rawData: product,
  }));

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>

      <main>
        {/* Hero section */}
        <div className="relative">
          {/* Background image and overlap */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden sm:flex sm:flex-col"
          >
            {c_coverPhoto && (
              <div className="relative w-full flex-1 bg-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    image={c_coverPhoto}
                    className="h-full w-full object-center"
                  />
                </div>

                <div className="absolute inset-0 bg-gray-900 opacity-80" />
              </div>
            )}
            <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
          </div>

          <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
            {/* Background image and overlap */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col sm:hidden"
            >
              {c_coverPhoto && (
                <div className="relative w-full flex-1 bg-gray-800">
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      image={c_coverPhoto}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-900 opacity-50" />
                </div>
              )}
              <div className="h-48 w-full bg-white" />
            </div>
            <div className="relative pb-32 pt-8">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {c_headingText}
              </h1>
            </div>
          </div>

          <section
            aria-labelledby="collection-heading"
            className="relative -mt-96 sm:mt-0"
          >
            <h2 id="collection-heading" className="sr-only">
              Featured Links
            </h2>
            <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
              {c_featuredLinks?.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-4 sm:aspect-h-5 sm:h-auto"
                >
                  <div>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                        <Image
                          image={feature.primaryPhoto}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black opacity-90" />
                    </div>
                    <div className="absolute inset-0 flex items-end rounded-lg p-6">
                      <div>
                        <p aria-hidden="true" className=" text-white">
                          {feature.subtitle}
                        </p>
                        <h3 className="mt-1 font-semibold text-white text-lg">
                          <a href={feature.link}>
                            <span className="absolute inset-0" />
                            {feature.title}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby="trending-heading">
          <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
            <div className="md:flex md:items-center md:justify-between">
              <h2
                id="favorites-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Featured Products
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {featuredProducts?.map((product) => (
                <ProductCard key={uuid()} result={product} />
              ))}
            </div>
          </div>
        </section>

        {/* TODO: fetch data from home page entity rather than hard code */}
        <section className="mb-16">
          <div className="relative max-w-7xl mx-auto rounded-lg">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 overflow-hidden"
            >
              <div className="bg-gray-900 opacity-60 inset-0 absolute"></div>
              <img
                className="h-full w-full object-cover object-center rounded-lg"
                src={GuidedSearchCover}
              />
            </div>
            <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-44 lg:px-0">
              <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
                {"Find the skis of your dreams today!"}
              </h1>
              <p className="mt-4 text-xl text-white">
                {"Picking the right skis is tough. but we're here to help."}
              </p>
              <button
                className="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => {
                  window.location.href = "/ski-finder";
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      </main>
    </Main>
  );
};

export default Home;
