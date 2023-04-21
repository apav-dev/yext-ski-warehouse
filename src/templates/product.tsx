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
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { Image } from "@yext/pages/components";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import { useEffect, useState } from "react";
import ProductImageSelector from "../components/ProductImageSelector";
import {
  FilterCombinator,
  Matcher,
  SelectableStaticFilter,
  StaticFilter,
} from "@yext/search-headless-react";
import { SimilarItems } from "../components/SimilarItems";
import { Table } from "../components/Table";
import { Breadcrumbs } from "../components/Breadcrumbs";
import EditTool from "../components/EditTool";
import { Reviews } from "../components/reviews/Reviews";
import { ProductSchema } from "../components/ProductSchema";
import AddToCart from "../components/AddToCartButton";

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
      "c_sizeDescriptor",
      "c_sizeRequired",
      "c_genderName",
      "c_productType",
      "c_categoryName",
      "c_specs.name",
      "c_specs.value",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "c_sizingGuide.c_sizingGuidePDF",

      // TODO: pull in review agg data
    ],
    filter: {
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
    slug,
    c_productDescription,
    c_price,
    c_abilityLevel,
    c_terrain,
    c_sizes,
    c_sizeDescriptor,
    c_sizeRequired,
    c_genderName,
    c_productType,
    c_categoryName,
    c_specs,
    dm_directoryParents,
    c_sizingGuide,
  } = document;
  const abilityLevel = c_abilityLevel?.[0];
  const terrain = c_terrain?.[0];

  const [similarItemsFilter, setSimilarItemsFilter] =
    useState<SelectableStaticFilter>();

  const sizingGuidePdfUrl = c_sizingGuide?.[0].c_sizingGuidePDF?.url;

  useEffect(() => {
    const filters: StaticFilter[] = [];
    c_genderName &&
      filters.push({
        kind: "fieldValue",
        matcher: Matcher.Equals,
        fieldId: "c_genderName",
        value: c_genderName,
      });
    c_productType?.[0] &&
      filters.push({
        kind: "fieldValue",
        matcher: Matcher.Equals,
        fieldId: "c_productType",
        value: c_productType,
      });
    c_categoryName &&
      filters.push({
        kind: "fieldValue",
        matcher: Matcher.Equals,
        fieldId: "c_categoryName",
        value: c_categoryName,
      });

    const andFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        combinator: FilterCombinator.AND,
        kind: "conjunction",
        filters,
      },
    };

    setSimilarItemsFilter(andFilter);
  }, []);

  return (
    <Main directory={_site}>
      <ProductSchema
        name={name}
        description={c_productDescription}
        photoGallery={photoGallery}
        price={c_price}
      />
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
              <p className="text-base text-gray-500">{c_productDescription}</p>
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
            <AddToCart
              product={{
                id,
                name,
                slug,
                price: c_price,
                image: photoGallery[0],
                quantity: 1,
              }}
              similarItemsFilter={similarItemsFilter}
              sizes={c_sizes}
              sizeDescriptor={c_sizeDescriptor}
              sizingGuidePdfUrl={sizingGuidePdfUrl}
            />
          </div>
        </div>
        {photoGallery && photoGallery.length > 0 && (
          <ProductImageSelector images={photoGallery} />
        )}
        <div className="col-span-2">
          <SimilarItems title="Similar Items" filter={similarItemsFilter} />
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
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {<EditTool data={document} />}
    </Main>
  );
};

export default Product;
