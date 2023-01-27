import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TemplateConfig,
} from "@yext/pages";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";

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

export const getPath: GetPath<TemplateRenderProps> = () => {
  return `results`;
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
  const { _site, c_headingText, c_subHeadingText, c_filters } = document;
  const logo = _site?.c_primaryLogo;

  const navBar = _site?.c_navBar;

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="bg-gray-50 min-h-screen">
        <div className="relative ">
          <Header logo={logo} navigation={navBar} />
          <SearchResults
            filters={c_filters}
            headingText={c_headingText}
            subheadingText={c_subHeadingText}
          />
        </div>
      </div>
    </SearchHeadlessProvider>
  );
};

export default SkiFinder;
