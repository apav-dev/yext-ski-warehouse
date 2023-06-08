import * as React from "react";
import {
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import MobileFilters from "../mobile/MobileFilters";
import { useSearchState } from "@yext/search-headless-react";
import Facets from "./Facets";
import SortDropdown from "./SortDropdown";
import LoadingSnowflakes from "./LoadingSnowflakes";

type InitialSearchStatus = "notStarted" | "inProgress" | "complete";

const SearchResults = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [initialSearchStatus, setInitialSearchStatus] =
    useState<InitialSearchStatus>("notStarted");

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  const handleFiltersClick = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  useEffect(() => {
    if (initialSearchStatus === "notStarted" && searchLoading) {
      setInitialSearchStatus("inProgress");
    }
    if (initialSearchStatus === "inProgress" && !searchLoading) {
      setInitialSearchStatus("complete");
    }
  }, [searchLoading]);

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <>
          <div className="flex justify-between lg:justify-end pt-4">
            <MobileFilters
              open={mobileFiltersOpen}
              setOpen={setMobileFiltersOpen}
            />

            <button
              type="button"
              className="rounded px-2 text-sky-400 font-semibold py-2 lg:hidden flex flex-col justify-start"
              onClick={handleFiltersClick}
            >
              <div className="flex">
                Filters
                <AdjustmentsHorizontalIcon className="h-5 w-5 ml-1.5" />
              </div>
            </button>
            <div className="flex flex-col items-end">
              <SortDropdown />
              <ResultsCount
                customCssClasses={{
                  resultsCountContainer: "text-gray-500 text-sm py-0",
                }}
              />
            </div>
          </div>
          <div className="flex">
            <div className="hidden lg:block w-52 shrink-0 mr-8">
              <h2 className="text-left mb-4 text-2xl font-semibold text-sky-400">
                Filters
              </h2>
              <Facets />
            </div>
            <div className="flex-grow">
              <VerticalResults
                customCssClasses={{
                  verticalResultsContainer:
                    "grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8",
                }}
                CardComponent={ProductCard}
              />
            </div>
          </div>
        </>
        {initialSearchStatus === "inProgress" && <LoadingSnowflakes />}
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
