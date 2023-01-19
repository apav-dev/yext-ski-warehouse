import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
} from "@yext/pages";
import {
  FieldValueStaticFilter,
  Matcher,
  provideHeadless,
  SearchHeadlessProvider,
  SelectableStaticFilter,
} from "@yext/search-headless-react";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import { useEffect, useState } from "react";
import useURLSearchParams from "../hooks/useURLSearchParams";

export const getPath: GetPath<TemplateRenderProps> = () => {
  return `ski-finder/results`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
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

const searcher = provideHeadless({
  apiKey: import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY,
  experienceKey: "yext-ski-warehouse",
  locale: "en",
  verticalKey: "skis",
});

const SkiFinder = ({ document }: TemplateRenderProps) => {
  const { _site } = document;
  const logo = _site?.c_primaryLogo;

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="bg-gray-50 min-h-screen">
        <div className="relative ">
          <Header logo={logo} />
          <SearchResults />
        </div>
      </div>
    </SearchHeadlessProvider>
  );
};

export default SkiFinder;
