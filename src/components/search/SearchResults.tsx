import * as React from "react";
import { Pagination, VerticalResults } from "@yext/search-ui-react";
import SkiCard from "./SkiCard";
import { Section } from "../CategorySelector";
import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import MobileFilters from "../mobile/MobileFilters";
import { useSearchState } from "@yext/search-headless-react";
import Facets from "./Facets";
import SortDropdown from "./SortDropdown";

type SearchResultsProps = {
  filters?: Section[];
  headingText?: string;
  subheadingText?: string;
};

const SearchResults = ({
  headingText,
  subheadingText,
  filters,
}: SearchResultsProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const resultsCount =
    useSearchState((state) => state.vertical.resultsCount) || 0;

  const handleFiltersClick = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <>
      <MobileFilters open={mobileFiltersOpen} setOpen={setMobileFiltersOpen} />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        {/* <CategoryFilters
        headingText={headingText}
        subheadingText={subheadingText}
        filters={filters}
      /> */}
        <div className="flex justify-between lg:justify-end py-8">
          <button
            type="button"
            className="rounded py-1 px-2 text-sky-400 font-semibold lg:hidden"
            onClick={handleFiltersClick}
          >
            <div className="flex">
              Filters
              <AdjustmentsHorizontalIcon className="h-5 w-5 ml-1.5" />
            </div>
          </button>
          <SortDropdown />
        </div>
        <div className="flex">
          <div className="hidden lg:block w-52 shrink-0 mr-8">
            <h2 className="text-left mb-4 text-2xl font-semibold text-sky-400">
              Filters
            </h2>
            <Facets />
          </div>
          <div className="flex-grow">
            {resultsCount > 0 ? (
              <>
                <VerticalResults
                  customCssClasses={{
                    verticalResultsContainer:
                      "grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8",
                  }}
                  CardComponent={SkiCard}
                />
              </>
            ) : (
              <div className="text-center py-8">No results found</div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:pl-52">
        <Pagination
          customCssClasses={{
            selectedLabel: "text-sky-400 border-sky-400 bg-sky-100",
          }}
        />
      </div>
    </>
  );
};

export default SearchResults;
