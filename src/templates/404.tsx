import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  HeadConfig,
  TransformProps,
} from "@yext/pages";
import * as React from "react";
import Main from "../layouts/Main";
import "../index.css";
import skiSign from "../assets/images/ski-sign.avif";
import { transformSiteData } from "../utils/transformSiteData";

export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Page Not Found",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
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

const FourOhFour: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  console.log("404", document);

  return (
    <Main directory={_site}>
      <div className="h-[calc(100vh-64px)]">
        <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
          <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
            <div className="max-w-lg">
              <p className="text-base font-semibold leading-8 text-gray-900">
                404
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-sky-400 sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-10">
                <a
                  href="/"
                  className="text-sm font-semibold leading-7 text-sky-400"
                >
                  <span aria-hidden="true">&larr;</span> Back to home
                </a>
              </div>
            </div>
          </main>
          <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={skiSign}
              alt=""
            />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default FourOhFour;
