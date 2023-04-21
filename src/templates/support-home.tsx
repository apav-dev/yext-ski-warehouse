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
