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

export const config: TemplateConfig = {
  stream: {
    $id: "ski-finder",

    fields: [
      "c_coverPhoto",
      "c_headingText",
      "c_subHeadingText",
      "c_navBar.name",
      "c_navBar.c_collection",
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

/**
 * Defines the path that the generated file will live at for production.
 */
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `/ski-finder`;
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SkiFinder = ({ document }: TemplateRenderProps) => {
  const { c_coverPhoto, c_headingText, c_subHeadingText, c_navBar, _site } =
    document;
  const logo = _site?.c_primaryLogo;

  console.log("c_navBar", c_navBar);

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
          {/* <div
            aria-hidden="true"
            className="absolute inset-0 bg-sky-400 opacity-40"
          /> */}

          <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
              {c_headingText}
            </h1>
            <p className="mt-4 text-xl text-white">{c_subHeadingText}</p>
            <a
              href="#"
              className="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Shop New Arrivals
            </a>
          </div>
        </div>

        {/* <footer
        aria-labelledby="footer-heading"
        className="bg-gray-900 fixed bottom-0 w-full"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 py-10">
            <p className="text-sm text-gray-400">
              Copyright &copy; 2021 Your Company, Inc.
            </p>
          </div>
        </div>
      </footer> */}
      </div>
    </>
  );
};

export default SkiFinder;
