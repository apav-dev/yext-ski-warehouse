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
import ImageGridHero from "../components/ImageGridHero";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import GridContainer from "../components/GridContainer";
import FeatureCard from "../components/FeatureCard";
import ProductCard from "../components/search/ProductCard";
import Hero from "../components/Hero";
import { Image } from "@yext/pages/components";

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

const Home = ({ document }: TemplateRenderProps) => {
  const {
    _site,
    c_primaryHero,
    c_featuredCategories,
    c_featuredProducts,
    c_featuredBlog,
    c_saleHero,
  } = document;

  const featuredProducts = c_featuredProducts?.map((product) => ({
    rawData: product,
  }));

  return (
    <Main directory={_site}>
      <div className="relative overflow-hidden bg-white">
        {/* Hero section */}
        <ImageGridHero
          title={c_primaryHero.title}
          subtitle={c_primaryHero.subtitle}
          cta={c_primaryHero.cta}
          images={c_primaryHero.images}
        />
      </div>
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
        <Section>
          <Hero
            title={c_featuredBlog.title}
            description={c_featuredBlog.description}
            cta={c_featuredBlog.cta}
            image={c_featuredBlog.image}
          />
        </Section>

        {/* Favorites section */}
        <Section backgroundColor="bg-gray-50">
          <SectionHeader title="Featured Products" />
          {/* <GridContainer> */}
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:gap-x-6 sm:grid-cols-3 lg:gap-8">
            {featuredProducts?.map((product) => (
              <ProductCard key={product.id} result={product} />
            ))}
          </div>
        </Section>

        {/* CTA section */}
        {/* TODO: Studiotize */}
        <Section aria-labelledby="sale-heading">
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
