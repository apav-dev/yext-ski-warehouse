import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import LocationCard from "./LocationCard";
import PinComponent from "./PinComponent";

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();

  useEffect(() => {
    searchActions.setVertical("locations");

    searchActions.setUserLocation({
      latitude: 39.7392358,
      longitude: -104.990251,
    });

    // set location for taos new mexico
    searchActions.setUserLocation({
      latitude: 36.407249,
      longitude: -105.573066,
    });

    searchActions.executeVerticalQuery();
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
    <div className="mx-auto mt-2 mb-8 h-[600px] max-w-7xl px-0 sm:h-[900px] sm:px-4 ">
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
      <div className="h-full border sm:flex sm:flex-row-reverse">
        <div className="relative h-2/3 w-full sm:h-full sm:w-2/3">
          <MapboxMap
            mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY || ""}
            PinComponent={PinComponent}
          />
        </div>
        <div className="h-1/3 overflow-y-auto sm:h-full sm:w-1/3">
          <VerticalResults
            customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
            CardComponent={LocationCard}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
