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
import SupportResults from "../components/search/SupportResults";
import { getSearchProviderConfig } from "../config";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { provideCore } from "@yext/search-core";

export const config: TemplateConfig = {
  stream: {
    $id: "support-home",
    fields: ["id", "slug", "c_headingText", "c_subHeadingText"],
    filter: {
      entityIds: ["support_home"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

async function fetchUniversalResults() {
  const url =
    "https://cdn.yextapis.com/v2/accounts/me/search/query?experienceKey=yext-ski-warehouse&api_key=61836bbb8fa572b8c9306eedfa4a2d2e&v=20230508&input=null";
  const headers = new Headers({
    "Cookie":
      "session-id=42747ca5-a9af-4b5d-845b-5f3cf056fa9f; __cf_bm=2MUQ8Fj8jVQdOLj4IhAcTt8iYbZjV6oHSfvSYRL1rmo-1683574309-0-AWpV1Ei/5lW9JeTVgLSF3oigRMY6f7A0KJJOgPtXuMQF6VnjCptbzceYMPpgSCKLQEYIUAu2yMY0duR5zULZgoE=",
  });

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error(
        "Error fetching data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  const { _site } = data.document;

  const searchClient = provideCore({
    apiKey: YEXT_PUBLIC_SEARCH_API_KEY || "",
    experienceKey: "yext-ski-warehouse",
    locale: "en",
  });

  const universalResults = fetchUniversalResults();

  return {
    ...data,
    document: {
      ...data.document,
      _site: transformSiteData(_site),
      universalResults,
    },
  };
};

export const getPath: GetPath<TemplateRenderProps> = ({ document }) => {
  return document.slug ?? document.id;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless(
  getSearchProviderConfig("", "support-searcher")
);

const SupportHome = ({ document }: TemplateRenderProps) => {
  const { _site, c_headingText, c_subHeadingText } = document;

  console.log("document", document);

  return (
    <Main directory={_site}>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-sky-400 sm:text-4xl">
              {c_headingText}
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {c_subHeadingText}
            </p>
          </div>
          <SearchHeadlessProvider searcher={searcher}>
            <SupportResults />
          </SearchHeadlessProvider>
        </div>
      </div>
    </Main>
  );
};

export default SupportHome;
