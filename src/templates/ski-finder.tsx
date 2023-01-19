import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TemplateConfig,
} from "@yext/pages";
import { Image } from "@yext/pages/components";
import Header from "../components/Header";
import ScrollingSelector from "../components/CategorySelector";
import { useState } from "react";

export const config: TemplateConfig = {
  stream: {
    $id: "ski-finder",
    fields: [
      "c_coverPhoto",
      "c_headingText",
      "c_subHeadingText",
      "c_finderHeadingText",
      "c_finderDescriptionText",
      "c_navBar.name",
      "c_navBar.c_collection",
      "c_filters.title",
      "c_filters.description",
      "c_filters.filterId",
      "c_filters.filterItems.name",
      "c_filters.filterItems.description",
      "c_filters.filterItems.primaryPhoto",
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
  return `ski-finder`;
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
    c_finderHeadingText,
    c_finderDescriptionText,
    c_navBar,
    c_filters,
    _site,
  } = document;
  const logo = _site?.c_primaryLogo;

  const [started, getStarted] = useState(false);

  const handleComplete = (
    filters: {
      filterId: string;
      filterValue: string;
    }[]
  ) => {
    // add each filter to the url and redirect to the results page
    let url = "/ski-finder/results";
    filters.forEach((filter, index) => {
      url += `${index === 0 ? "?" : "&"}${filter.filterId}=${
        filter.filterValue
      }`;
    });
    window.location.href = url;
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="relative ">
          <Header logo={logo} navigation={c_navBar} />
          {c_coverPhoto && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 top-16 overflow-hidden"
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
        <ScrollingSelector
          title={c_finderHeadingText}
          description={c_finderDescriptionText}
          sections={c_filters}
          scrollToStart={started}
          onComplete={handleComplete}
        />
      </div>
    </>
  );
};

export default SkiFinder;
