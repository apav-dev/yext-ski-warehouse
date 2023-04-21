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
import SearchResults from "../components/search/SearchResults";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import { useEffect, useState } from "react";

export const config: TemplateConfig = {
  stream: {
    $id: "results",
    fields: [
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
      entityIds: ["search_results"],
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
  return document.slug ?? "results";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Yext Ski Warehouse - Ski Finder Results",
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
  const { _site, c_headingText, c_subHeadingText, c_filters } = document;

  const [resultsHeading, setResultsHeading] = useState("Results");

  useEffect(() => {
    // check if a query param exists and set the heading text accordingly
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    if (query) {
      setResultsHeading(`Results for "${query}"`);
    }
  }, []);

  return (
    <Main directory={_site}>
      <div className="flex justify-center py-8 text-2xl font-semibold text-sky-400 sm:text-4xl">
        <h1>{resultsHeading}</h1>
      </div>
      <SearchResults
        filters={c_filters}
        headingText={c_headingText}
        subheadingText={c_subHeadingText}
      />
    </Main>
  );
};

export default SkiFinder;
