import * as React from "react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { VerticalResults } from "@yext/search-ui-react";
import { useEffect } from "react";
import SkiCard from "./SkiCard";
import CategoryFilters from "./CategoryFilters";
import { getRuntime } from "@yext/pages/util";
import { Section } from "./CategorySelector";

type SearchResultsProps = {
  filters: Section[];
  headingText?: string;
  subheadingText?: string;
};

const SearchResults = ({
  headingText,
  subheadingText,
  filters,
}: SearchResultsProps) => {
  const searchActions = useSearchActions();

  const staticFilters = useSearchState((state) => state.filters.static);

  useEffect(() => {
    if (!getRuntime().isServerSide) {
      const urlParams = new URLSearchParams(window.location.search);
      // go through the query params and set the initial filters
      const filters: SelectableStaticFilter[] = [];
      // const urlParams = new URLSearchParams(window.location.search);
      urlParams.forEach((value, fieldId) => {
        filters.push({
          selected: true,
          filter: {
            kind: "fieldValue",
            matcher: Matcher.Equals,
            fieldId,
            value,
          },
        });
      });
      searchActions.setStaticFilters(filters);
      searchActions.executeVerticalQuery();
    }
  }, []);

  useEffect(() => {
    searchActions.executeVerticalQuery();
  }, [staticFilters]);

  return (
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
      <CategoryFilters
        headingText={headingText}
        subheadingText={subheadingText}
        filters={filters}
      />
      <VerticalResults
        customCssClasses={{
          verticalResultsContainer:
            "grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8",
        }}
        CardComponent={SkiCard}
      />
    </div>
  );
};

export default SearchResults;
