import React from "react";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import EditTool from "../components/EditTool";
import Main from "../layouts/Main";
import Header from "../components/Header";
import { transformSiteData } from "../utils/transformSiteData";
import StoreDetails from "../components/StoreDetails";
import Hours from "../components/Hours";
import StaticMap from "../components/StaticMap";
import { Image } from "@yext/pages/components";

export const config: TemplateConfig = {
  stream: {
    $id: "stores",
    filter: {
      entityTypes: ["location"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_coverPhoto",
      "address",
      "mainPhone",
      "c_storeDescription",
      "hours",
      "slug",
      "geocodedCoordinate",
    ],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
    transform: {
      replaceOptionValuesWithDisplayNames: ["paymentOptions"],
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

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.c_storeDescription,
        },
      },
    ],
  };
};

const Store: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const {
    address,
    hours,
    mainPhone,
    c_storeDescription,
    geocodedCoordinate,
    c_coverPhoto,
    _site,
  } = document;

  return (
    <>
      <Main>
        <Header directory={_site} />
        {c_coverPhoto && (
          <div className="bg-white">
            <div className="mx-auto max-w-7xl sm:px-6 sm:py-8 lg:px-8">
              <div className="relative overflow-hidden px-6 py-24 sm:rounded-lg sm:px-16 min-h-[600px]">
                <Image
                  image={c_coverPhoto}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            <div>
              <StoreDetails address={address} phone={mainPhone} />
              {hours && <Hours title={"Store Hours"} hours={hours} />}
            </div>
            {c_storeDescription && (
              <div className="p-2 px-4 py-5 sm:p-6">
                <div className="text-sky-400 font-semibold text-xl">
                  <h3>{`About our ${address.city} Store`}</h3>
                  <p className="my-4 prose lg:prose-lg ">
                    {c_storeDescription}
                  </p>
                </div>
              </div>
            )}
            {geocodedCoordinate?.latitude && geocodedCoordinate?.longitude && (
              <StaticMap
                latitude={geocodedCoordinate.latitude}
                longitude={geocodedCoordinate.longitude}
              />
            )}
          </div>
        </div>
      </Main>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {<EditTool data={document} />}
    </>
  );
};

export default Store;
