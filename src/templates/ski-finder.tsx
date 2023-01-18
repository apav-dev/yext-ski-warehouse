import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TemplateConfig,
} from "@yext/pages";
import { ComplexImageType, Image } from "@yext/pages/components";
import Header from "../components/Header";
import ScrollingSelector from "../components/CategorySelector";
import { useEffect, useState } from "react";

export const config: TemplateConfig = {
  stream: {
    $id: "ski-finder",

    fields: [
      "c_coverPhoto",
      "c_headingText",
      "c_subHeadingText",
      "c_navBar.name",
      "c_navBar.c_collection",
      "c_genderFilter.name",
      "c_genderFilter.primaryPhoto",
      "c_abilityFilter.name",
      "c_abilityFilter.description",
      "c_abilityFilter.primaryPhoto",
      "c_terrainFilter.name",
      "c_terrainFilter.description",
      "c_terrainFilter.primaryPhoto",
    ],
    filter: {
      entityTypes: ["ce_skiFinder"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateRenderProps> = () => {
  return `/ski-finder`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: "Yext Ski Warehouse - Ski Finder",
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

const SkiFinder = ({ document }: TemplateRenderProps) => {
  const {
    c_coverPhoto,
    c_headingText,
    c_subHeadingText,
    c_navBar,
    c_genderFilter,
    c_abilityFilter,
    c_terrainFilter,
    _site,
  } = document;
  const logo = _site?.c_primaryLogo;

  const [sections, setSections] = useState<
    {
      name: string;
      items: {
        name: string;
        image: ComplexImageType;
        description?: string;
      }[];
    }[]
  >([]);
  const [started, getStarted] = useState(false);

  useEffect(() => {
    setSections([
      {
        name: "What kind of skis are you looking for?",
        items: c_genderFilter.map((gender) => ({
          name: gender.name,
          image: gender.primaryPhoto,
        })),
      },
      {
        name: "What level of Skier are you?",
        items: c_abilityFilter.map((ability) => ({
          name: ability.name,
          description: ability.description,
          image: ability.primaryPhoto,
        })),
      },
      {
        name: "What terrain do you like to ski?",
        items: c_terrainFilter.map((terrain) => ({
          name: terrain.name,
          description: terrain.description,
          image: terrain.primaryPhoto,
        })),
      },
    ]);
  }, []);

  return (
    <>
      <div className="bg-white">
        {/* Hero section */}
        <div className="relative bg-gray-900">
          <Header logo={logo} navigation={c_navBar} />

          {/* Decorative image and overlay */}
          {c_coverPhoto && (
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
            >
              <Image image={c_coverPhoto} />
            </div>
          )}
          <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
              {c_headingText}
            </h1>
            <p className="mt-4 text-xl text-white">{c_subHeadingText}</p>
            <button
              className="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => getStarted(true)}
            >
              Get Started
            </button>
          </div>
        </div>

        <ScrollingSelector sections={sections} scrollToStart={started} />
      </div>
    </>
  );
};

export default SkiFinder;
