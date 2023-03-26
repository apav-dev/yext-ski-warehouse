import * as React from "react";
import {
  FocusedItemData,
  SearchBar as SB,
  SearchBarCssClasses,
} from "@yext/search-ui-react";
import {
  provideHeadless,
  Result,
  VerticalResults,
} from "@yext/search-headless-react";
import { getSearchProviderConfig } from "../../config";
import Ce_skis from "../../types/skis";
import { Image, Link } from "@yext/pages/components";

type SearchBarProps = {
  customCssClasses?: SearchBarCssClasses;
};

const entityPreviewSearcher = provideHeadless(
  getSearchProviderConfig(undefined, "entity-preview-searcher")
);

const SearchBar = ({ customCssClasses }: SearchBarProps) => {
  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResults>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ) => {
    const skiResults = verticalKeyToResults["skis"]?.results as unknown as
      | Result<Ce_skis>[]
      | undefined;

    return skiResults ? (
      <div className="flex flex-col">
        {skiResults.slice(0, 3).map((result) => {
          const skis = result.rawData;
          const image = skis.photoGallery?.[0];
          return (
            <Link
              key={result.id}
              className="py-6 sm:flex px-4 hover:bg-gray-100"
              href={`/${skis.slug}`}
            >
              <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                <div className="h-20 w-20">
                  {image && <Image image={image} layout="fill" />}
                </div>
                <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    {skis.name}
                  </h3>
                  <p className="mt-1 font-medium text-gray-900">
                    {`$${skis.c_price}`}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    ) : (
      <></>
    );
  };

  const handleSearch = ({
    query,
    verticalKey,
  }: {
    verticalKey?: string;
    query?: string;
  }) => {
    if (query) {
      window.location.href = `/results?query=${query}`;
    }
  };

  return (
    <SB
      hideRecentSearches
      customCssClasses={customCssClasses}
      onSearch={handleSearch}
      visualAutocompleteConfig={{
        renderEntityPreviews,
        entityPreviewSearcher,
        includedVerticals: ["skis"],
      }}
    />
  );
};

export default SearchBar;
