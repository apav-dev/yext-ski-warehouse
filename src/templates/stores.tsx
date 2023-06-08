import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TransformProps,
  TemplateConfig,
} from "@yext/pages";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import StoreLocator from "../components/search/Locator";
import { v4 as uuid } from "uuid";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";

export const config: TemplateConfig = {
  stream: {
    $id: "stores-locator",
    fields: [
      "slug",
      "c_headingText",
      "c_subHeadingText",
      "dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.address",
      "dm_directoryChildren.dm_directoryChildren.mainPhone",
      "dm_directoryChildren.dm_directoryChildren.slug",
    ],
    filter: {
      entityIds: ["stores"],
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
  const { _site, c_headingText, c_subHeadingText, dm_directoryChildren } =
    document;

  const renderRegionColumn = (regions: any) => {
    return (
      <div>
        {regions.map((region) => {
          return (
            <div key={uuid()} className="py-4">
              <div className="w-52">
                <h2 className="mb-4 text-left text-3xl font-bold tracking-tight text-sky-400 sm:text-4xl">
                  {region.name}
                </h2>
                <ul role="list" className="space-y-3">
                  {region.dm_directoryChildren.map((store) => {
                    return (
                      <li key={uuid()}>
                        <a
                          href={store.slug}
                          className="text-lg font-semibold text-sky-400 hover:text-sky-500"
                        >
                          {store.address.city}
                        </a>
                        <p className="text-gray-500">{store.address.line1}</p>
                        <p className="text-gray-500">
                          {formatPhoneNumber(store.mainPhone)}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Main directory={_site}>
      <div className="bg-white py-8 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-sky-400 sm:text-4xl">
              {c_headingText}
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-lg sm:leading-8">
              {c_subHeadingText}
            </p>
          </div>
          <div className="py-4">
            <StoreLocator />
          </div>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-sky-400 sm:text-4xl">
              All Stores
            </h2>
          </div>
          <div className="grid grid-cols-1 pl-8 sm:grid-cols-2 sm:justify-items-center sm:pl-0">
            {renderRegionColumn(
              dm_directoryChildren.slice(0, dm_directoryChildren.length / 2)
            )}
            {renderRegionColumn(
              dm_directoryChildren.slice(dm_directoryChildren.length / 2)
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Home;
