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
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import GridContainer from "../components/GridContainer";
import FeatureCard from "../components/FeatureCard";
import Hero from "../components/Hero";
import { Image } from "@yext/pages/components";
import GridHero from "../components/GridHero";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { getSearchProviderConfig } from "../config";
import { FeaturedProducts } from "../components/search/FeaturedProducts";
import P13nHeader from "../components/p13n/P13nHeader";
import P13nTool from "../components/p13n/P13nTool";
import { useState } from "react";
import HomeHero from "../components/HomeHero";
import Chat from "../components/chat/Chat";

export const config: TemplateConfig = {
  stream: {
    $id: "home",
    fields: [
      "slug",
      "c_primaryHero",
      "c_featuredCategories",
      "c_featuredProducts.name",
      "c_featuredProducts.c_price",
      "c_featuredProducts.photoGallery",
      "c_featuredProducts.slug",
      "c_featuredBlog",
      "c_saleHero",
      "c_p13nHeros",
    ],
    filter: {
      entityIds: ["home_page"],
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
  return document.slug ?? document.id;
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

const featuredProductsSearcher = provideHeadless(
  getSearchProviderConfig("products", "featured-products")
);

const Home = ({ document }: TemplateRenderProps) => {
  const {
    _site,
    c_primaryHero,
    c_featuredCategories,
    c_featuredBlog,
    c_saleHero,
    c_p13nHeros,
  } = document;

  const [isP13nHeaderOpen, setIsP13nHeaderOpen] = useState(false);
  const [isP13nToolOpen, setIsP13nToolOpen] = useState(true);

  const handleP13nHeaderClose = () => {
    setIsP13nHeaderOpen(false);
    setIsP13nToolOpen(true);
  };

  const handleP13nToolClick = () => {
    setIsP13nToolOpen(false);
    setIsP13nHeaderOpen(true);
  };

  return (
    <Main directory={_site}>
      {/* <P13nHeader isOpen={isP13nHeaderOpen} onClose={handleP13nHeaderClose} />
      <P13nTool open={isP13nToolOpen} onClick={handleP13nToolClick} />
      <HomeHero heros={c_p13nHeros} /> */}
      <Chat />
      <main>
        {/* Category section */}
        <Section backgroundColor="bg-gray-50">
          <SectionHeader title="Featured Categories" />
          <GridContainer>
            {c_featuredCategories?.[0] && (
              <FeatureCard
                rowSpan={2}
                title={c_featuredCategories[0].title}
                link={c_featuredCategories[0].link}
                image={c_featuredCategories[0].primaryPhoto}
              />
            )}
            {c_featuredCategories?.[1] && (
              <FeatureCard
                title={c_featuredCategories[1].title}
                link={c_featuredCategories[1].link}
                image={c_featuredCategories[1].primaryPhoto}
              />
            )}
            {c_featuredCategories?.[2] && (
              <FeatureCard
                title={c_featuredCategories[2].title}
                link={c_featuredCategories[2].link}
                image={c_featuredCategories[2].primaryPhoto}
              />
            )}
          </GridContainer>
        </Section>

        {/* Featured section */}
        <Section backgroundColor="">
          <Hero
            title={c_featuredBlog.title}
            description={c_featuredBlog.description}
            cta={c_featuredBlog.cta}
            image={c_featuredBlog.image}
          />
        </Section>

        {/* Featured Products section */}
        <SearchHeadlessProvider searcher={featuredProductsSearcher}>
          <Section backgroundColor="bg-gray-50">
            <SectionHeader title="Featured Products" />
            <FeaturedProducts />
          </Section>
        </SearchHeadlessProvider>

        {/* CTA section */}
        {/* TODO: Studiotize */}
        <Section aria-labelledby="sale-heading" backgroundColor="">
          <div className="overflow-hidden pt-32 sm:pt-14">
            <div className="bg-sky-400">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative pb-16 pt-48 sm:pb-24">
                  <div>
                    <h2
                      id="sale-heading"
                      className="text-4xl font-bold tracking-tight text-white md:text-5xl"
                    >
                      {c_saleHero.title}
                    </h2>
                    <div className="mt-6 text-base">
                      <a href="#" className="font-semibold text-white">
                        {c_saleHero.subtitle}
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>

                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                    <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          {c_saleHero.images?.[0] && (
                            <Image
                              image={c_saleHero.images[0]}
                              className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            />
                          )}
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          {c_saleHero.images?.[1] && (
                            <Image
                              image={c_saleHero.images[1]}
                              className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          {c_saleHero.images?.[2] && (
                            <Image
                              image={c_saleHero.images[2]}
                              className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72 shadow-3xl -top"
                            />
                          )}
                        </div>
                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          {c_saleHero.images?.[3] && (
                            <Image
                              image={c_saleHero.images[3]}
                              className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          {c_saleHero.images?.[4] && (
                            <Image
                              image={c_saleHero.images[4]}
                              className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            />
                          )}
                        </div>
                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          {c_saleHero.images?.[5] && (
                            <Image
                              image={c_saleHero.images[5]}
                              className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </Main>
  );
};

export default Home;
