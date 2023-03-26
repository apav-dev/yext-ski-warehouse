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
import Header from "../components/Header";
import { transformSiteData } from "../utils/transformSiteData";

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

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
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
