import * as React from "react";
import { VerticalResults } from "@yext/search-ui-react";
import SkiCard from "./SkiCard";
import CategoryFilters from "./CategoryFilters";
import { Section } from "./CategorySelector";

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
