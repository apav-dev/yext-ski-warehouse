import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import Header from "../components/Header";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import StoreLocator from "../components/search/Locator";

// export const config: TemplateConfig = {
//   stream: {
//     $id: "home",
//     fields: [
//       "name",
//       "c_coverPhoto",
//       "slug",
//       "c_headingText",
//       "c_featuredLinks",
//       "c_featuredProducts.name",
//       "c_featuredProducts.c_price",
//       "c_featuredProducts.photoGallery",
//       "c_featuredProducts.slug",
//     ],
//     filter: {
//       entityIds: ["warehouse_home"],
//     },
//     localization: {
//       locales: ["en"],
//       primary: false,
//     },
//   },
// };

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
  // return document.slug ?? "index.html";
  return "stores";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Ski Warehouse - Stores",
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

const Home = ({ document }: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>
      <div>
        <StoreLocator />
      </div>
    </Main>
  );
};

export default Home;
