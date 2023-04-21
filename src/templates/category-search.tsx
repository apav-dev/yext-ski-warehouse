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
import { Image, Link } from "@yext/pages/components";
import { twMerge } from "tailwind-merge";
import SearchResults from "../components/search/SearchResults";
import { FilterCombinator, Matcher } from "@yext/search-headless-react";

export const config: TemplateConfig = {
  stream: {
    $id: "product-type-results",
    fields: [
      "name",
      "c_coverPhoto",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryChildren.name",
      "dm_directoryParents.dm_directoryChildren.slug",
    ],
    filter: {
      entityIds: [
        "warehouse_men_ski_ski_boot",
        "warehouse_women_ski_ski_boot",
        "warehouse_men_ski_skis",
        "warehouse_women_ski_skis",
        "warehouse_men_ski_binding",
        "warehouse_women_ski_binding",
        "warehouse_men_ski_poles",
        "warehouse_women_ski_poles",
      ],
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

const CategorySearch = ({ document }: TemplateRenderProps) => {
  const { name, _site, c_coverPhoto, dm_directoryParents } = document;

  // const gender equals the last item in the dm_directoryParents array
  const gender = dm_directoryParents?.[1].name;
  const productTypes =
    dm_directoryParents?.[dm_directoryParents.length - 1].dm_directoryChildren;
  const productTypeName =
    dm_directoryParents?.[dm_directoryParents.length - 1].name;

  const filters = [
    {
      matcher: Matcher.Equals,
      fieldId: "dm_directoryParents.name",
      value: gender,
      kind: "fieldValue",
    },
    {
      matcher: Matcher.Equals,
      fieldId: "dm_directoryParents.name",
      value: name,
      kind: "fieldValue",
    },
    {
      matcher: Matcher.Equals,
      fieldId: "dm_directoryParents.name",
      value: productTypeName,
      kind: "fieldValue",
    },
  ];

  const initialFilters = [
    {
      selected: true,
      filter: {
        combinator: FilterCombinator.AND,
        kind: "conjunction",
        filters,
      },
    },
  ];

  return (
    <Main initialFilters={initialFilters} directory={_site}>
      {c_coverPhoto && (
        <div className="bg-white">
          <div className="mx-auto max-w-7xl sm:px-6 sm:py-8 lg:px-8">
            <div className="relative overflow-hidden px-6 py-24 sm:rounded-lg sm:px-16 min-h-[600px]">
              <Image
                image={c_coverPhoto}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end  overflow-hidden sm:rounded-lg p-4 h-96">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black opacity-60"
                />
                <h1 className="relative text-6xl font-semibold text-white">
                  {`${gender}'s ${name}`}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center py-4">
        <div className="flex justify-center border-b border-gray-300 px-20 sm:px-44 space-x-8 sm:space-x-16">
          {productTypes.map((productType) => {
            return (
              <Link
                key={productType.slug}
                className={twMerge(
                  "py-4 border-b-4 border-transparent hover:border-sky-400 font-semibold",
                  productType.name === name
                    ? "border-sky-400"
                    : "text-gray-500 hover:text-gray-900"
                )}
                href={`/${productType.slug}`}
              >
                {productType.name}
              </Link>
            );
          })}
        </div>
      </div>
      <SearchResults />
    </Main>
  );
};

export default CategorySearch;
