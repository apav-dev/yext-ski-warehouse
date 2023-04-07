import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { NumericalFacets, StandardFacets } from "@yext/search-ui-react";
import React from "react";

const Facets = () => {
  const resultsCount = useSearchState((state) => state.vertical.resultsCount);
  const selectedFacetCount =
    useSearchState((state) => state.filters.facets)
      ?.flatMap((facet) => facet.options)
      .filter((option) => option.selected).length ?? 0;
  const selectedStaticFilters =
    useSearchState((state) => state.filters.static)?.filter(
      (filter) => filter.selected
    ) ?? [];

  const searchActions = useSearchActions();

  const handleClearFilters = () => {
    searchActions.resetFacets();

    // this is to handle when setting a min or max price filter that returns no results
    const filtersToSet = selectedStaticFilters.filter((f) => {
      if (f.filter.kind === "fieldValue" && f.filter.fieldId === "c_price") {
        return false;
      } else {
        return true;
      }
    });
    searchActions.setStaticFilters(filtersToSet);

    searchActions.executeVerticalQuery();
  };
  return (
    <>
      <StandardFacets
        customCssClasses={{
          optionInput: "focus:ring-sky-400 text-sky-400 w-6 h-6",
          optionLabel: "text-base text-left",
        }}
      />
      <NumericalFacets
        customCssClasses={{
          optionInput: "focus:ring-sky-400 text-sky-400 w-6 h-6",
          optionLabel: "text-base",
          input: "focus:border-sky-400",
          applyButton: "text-sky-400",
        }}
      />
      {(selectedFacetCount > 0 || resultsCount === 0) && (
        <button
          className="text-sky-400 hover:underline w-full text-left"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      )}
    </>
  );
};

export default Facets;
