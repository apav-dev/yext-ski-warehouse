import React from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  NumericalFacet,
  StandardFacet,
  Facets as FacetContainer,
} from "@yext/search-ui-react";

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
      <FacetContainer
        // onlyRenderChildren
        customCssClasses={{
          optionInput: "focus:ring-sky-400 text-sky-400 w-6 h-6",
          optionLabel: "text-base text-left",
        }}
      >
        <NumericalFacet fieldId="c_price" />
        <StandardFacet fieldId="c_abilityLevel.name" label="Ability Level" />
        <StandardFacet fieldId="c_brand" />
        <StandardFacet fieldId="c_terrain.name" label="Terrain" />
        <StandardFacet fieldId="c_rockerType" />
      </FacetContainer>
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
