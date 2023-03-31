import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  StandardCard,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();

  useEffect(() => {
    searchActions.setVertical("locations");
  }, []);

  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };

  return (
    <div className="mx-auto max-w-7xl px-0 sm:px-4 h-[calc(100vh-64px)]">
      <FilterSearch
        onSelect={handleFilterSelect}
        placeholder="Find Locations Near You"
        searchFields={[
          {
            entityType: "location",
            fieldApiName: "builtin.location",
          },
        ]}
      />
      <div className="border h-full">
        <div className="relative w-full h-2/3 sm:w-2/3">
          <MapboxMap
            mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY || ""}
          />
        </div>
        <div className="h-1/3 overflow-y-auto">
          <VerticalResults
            customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
            CardComponent={StandardCard}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
