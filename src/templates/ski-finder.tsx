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
import ScrollingSelector from "../components/CategorySelector";
import { useState } from "react";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";

export const config: TemplateConfig = {
  stream: {
    $id: "ski-finder",
    fields: [
      "c_coverPhoto",
      "c_headingText",
      "c_subHeadingText",
      "c_filters.title",
      "c_filters.description",
      "c_filters.filterId",
      "c_filters.filterItems.name",
      "c_filters.filterItems.description",
      "c_filters.filterItems.primaryPhoto",
      "slug",
    ],
    filter: {
      entityIds: ["ski_finder"],
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
    title: "Ski Warehouse - Ski Finder",
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
  const { c_coverPhoto, c_headingText, c_subHeadingText, c_filters, _site } =
    document;
  const [started, getStarted] = useState(false);

  const handleComplete = (
    filters: {
      filterId: string;
      filterValue: string;
    }[]
  ) => {
    // add each filter to the url and redirect to the results page
    let url = "/results";
    filters.forEach((filter, index) => {
      url += `${index === 0 ? "?" : "&"}${filter.filterId}=${
        filter.filterValue
      }`;
    });
    // add one more filter for the dm_directoryParents.name=Skis
    url += "&dm_directoryParents.name=Skis";
    window.location.href = url;
  };

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
        {c_coverPhoto && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 top-16 overflow-hidden"
          >
            <Image
              className="h-full w-full object-cover object-center"
              image={c_coverPhoto}
            />
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
        sections={c_filters}
        scrollToStart={started}
        onComplete={handleComplete}
      />
    </Main>
  );
};

export default SkiFinder;
