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
import Header from "../components/Header";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { Image, Link } from "@yext/pages/components";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import ProductImageSelector from "../components/ProductImageSelector";
import { Matcher, SelectableStaticFilter } from "@yext/search-headless-react";
import { SimilarItems } from "../components/SimilarItems";
import { Table } from "../components/Table";
import { Breadcrumbs } from "../components/Breadcrumbs";
import EditTool from "../components/EditTool";
import { Reviews } from "../components/reviews/Reviews";
import { ProductSchema } from "../components/ProductSchema";

export const config: TemplateConfig = {
  stream: {
    $id: "product",
    fields: [
      "id",
      "name",
      "c_productDescription",
      "photoGallery",
      "c_price",
      "slug",
      "c_abilityLevel.name",
      "c_abilityLevel.c_icon",
      "c_terrain.name",
      "c_terrain.c_icon",
      "c_sizes",
      "c_genderName",
      "c_specs.name",
      "c_specs.value",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "c_sizingGuide.c_sizingGuidePDF",
    ],
    filter: {
      // savedFilterIds: [YEXT_PUBLIC_SKI_FILTER],
      entityTypes: ["ce_product"],
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

const Product = ({ document }: TemplateRenderProps) => {
  const {
    _site,
    id,
    name,
    photoGallery,
    c_productDescription,
    c_price,
    c_abilityLevel,
    c_terrain,
    c_sizes,
    c_genderName,
    c_specs,
    dm_directoryParents,
    c_sizingGuide,
  } = document;
  const abilityLevel = c_abilityLevel?.[0];
  const terrain = c_terrain?.[0];

  const [selectedSize, setSelectedSize] = useState<string>(c_sizes?.[0] || "");
  const [similarItemsFilters, setSimilarItemsFilters] = useState<
    SelectableStaticFilter[]
  >([]);

  const sizingGuidePdfUrl = c_sizingGuide?.[0].c_sizingGuidePDF?.url;

  // TODO: change to use combinator filter
  useEffect(() => {
    const filters: SelectableStaticFilter[] = [];
    c_abilityLevel?.[0] &&
      filters.push({
        selected: true,
        filter: {
          kind: "fieldValue",
          matcher: Matcher.Equals,
          fieldId: "c_abilityLevel.name",
          value: c_abilityLevel[0].name,
        },
      });
    c_terrain?.[0] &&
      filters.push({
        selected: true,
        filter: {
          kind: "fieldValue",
          matcher: Matcher.Equals,
          fieldId: "c_terrain.name",
          value: c_terrain?.[0].name,
        },
      });
    c_genderName &&
      filters.push({
        selected: true,
        filter: {
          kind: "fieldValue",
          matcher: Matcher.Equals,
          fieldId: "c_genderName",
          value: c_genderName,
        },
      });
    setSimilarItemsFilters(filters);
  }, []);

  return (
    <Main>
      <ProductSchema
        name={name}
        description={c_productDescription}
        photoGallery={photoGallery}
        price={c_price}
      />
      <div className="relative">
        <Header directory={_site} />
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg">
            <Breadcrumbs breadcrumbs={dm_directoryParents} />

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                {c_price && (
                  <p className="text-lg text-gray-900 sm:text-xl">{`$${c_price}`}</p>
                )}
                <div className="ml-4 border-l border-gray-300 pl-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={twMerge(
                              5 > rating ? "text-yellow-400" : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      {/* <p className="sr-only">
                          {reviews.average} out of 5 stars
                        </p> */}
                    </div>
                    {/* <p className="ml-2 text-sm text-gray-500">
                        {reviews.totalCount} reviews
                      </p> */}
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">
                  {c_productDescription}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">
                  In stock and ready to ship
                </p>
              </div>
              {abilityLevel && (
                <div className="flex items-center">
                  {abilityLevel.c_icon && <Image image={abilityLevel.c_icon} />}
                  <p className="ml-2 text-sm text-gray-500 text-left">
                    {abilityLevel.name}
                  </p>
                </div>
              )}
              {terrain && (
                <div className="flex items-center">
                  {terrain.c_icon && (
                    <Image className="" image={terrain.c_icon} />
                  )}
                  <p className="ml-2 text-sm text-gray-500 text-left">
                    {terrain.name}
                  </p>
                </div>
              )}
            </section>
            {/* Size picker */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">
                  Ski length (cm)
                </h2>
                {sizingGuidePdfUrl && (
                  <Link
                    className="text-sm underline text-sky-400 hover:text-sky-700"
                    href={sizingGuidePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Size guide
                  </Link>
                )}
              </div>
              {c_sizes && c_sizes.length > 0 && (
                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a Ski length (cm)
                  </RadioGroup.Label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {c_sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        className={({ active, checked }) =>
                          twMerge(
                            active ? "ring-2 ring-offset-2 ring-sky-400" : "",
                            checked
                              ? "bg-sky-400 border-transparent text-white hover:bg-sky-600"
                              : "bg-white border-gray-700 text-gray-900 hover:bg-gray-50",
                            "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 opacity-60"
                          )
                        }
                      >
                        <RadioGroup.Label>{size}</RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              )}
              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-400 py-3 px-8 text-base font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 opacity-60"
              >
                Add to cart
              </button>
            </div>
          </div>
          {photoGallery && photoGallery.length > 0 && (
            <ProductImageSelector images={photoGallery} />
          )}
          <div className="col-span-2">
            <SimilarItems filters={similarItemsFilters} />
          </div>
          {c_specs && c_specs.length > 0 && (
            <div className="col-span-2 mt-16 sm:mt-24">
              <Table items={c_specs} title="Specs" />
            </div>
          )}
          <Reviews
            entityId={id}
            entityName={name}
            entityImage={photoGallery[0]}
          />
        </div>
      </div>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {<EditTool data={document} />}
    </Main>
  );
};

export default Product;
