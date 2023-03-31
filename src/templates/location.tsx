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
import Banner from "../components/Banner";
import Header from "../components/Header";
import Details from "../components/Details";
import Hours from "../components/Hours";
import About from "../components/About";
import StaticMap from "../components/StaticMap";

export const config: TemplateConfig = {
  stream: {
    $id: "location-stream",
    // Defines the scope of entities that qualify for this stream.
    // You can use entityTypes, savedFilterIds, and/or entityIds
    filter: {
      entityTypes: ["location"],
    },
    // Specifies the exact data that each generated document will contain.
    // This data is passed in directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "photoGallery",
    ],
    // The entity language profiles that documents will be generated for.
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

const Skis = ({ document }: TemplateRenderProps) => {
  const {
    _site,
    id,
    name,
    address,
    description,
    mainPhone,
    hours,
    services,
    photoGallery,
    geocodedCoordinate
  } = document;
  const image = photoGallery[0];



  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
        <Banner name={name} address={address} image={image} />
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          <Details address={address} phone={mainPhone} services={services} />
          {hours && <Hours title={"Store Hours"} hours={hours} />}
          {description && <About name={name} description={description} />}
          {geocodedCoordinate && (
            <StaticMap
              latitude={geocodedCoordinate.latitude}
              longitude={geocodedCoordinate.longitude}
            ></StaticMap>
          )}
        </div>
      </div>
    </Main>

  );
};

export default Skis;
