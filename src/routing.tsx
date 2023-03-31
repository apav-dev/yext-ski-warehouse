import {
  State,
  SearchActions,
  SelectableStaticFilter,
  Matcher,
} from "@yext/search-headless-react";

export interface Router {
  serializeState: (state: State) => URLSearchParams;
  deserializeParams: (
    params: URLSearchParams,
    actions: SearchActions,
    initialFilters?: SelectableStaticFilter[]
  ) => void;
  updateCadence: "onStateChange" | "onSearch";
}

export const defaultRouter: Router = {
  updateCadence: "onSearch",
  serializeState: (state) => {
    const params = new URLSearchParams({});

    if (state.query.input) {
      params.set("query", state.query.input);
    }

    return params;
  },
  deserializeParams: (params, actions, initialFilters) => {
    const query = params.get("query");
    if (query) {
      actions.setQuery(query);
    }

    if (initialFilters && initialFilters.length > 0) {
      actions.setStaticFilters(initialFilters);
    }

    //grab the search params from the url
    const searchParams = new URLSearchParams(window.location.search);
    const filtersFromUrl: SelectableStaticFilter[] = [];
    // set each as a fieldValue static filter
    searchParams.forEach((value, key) => {
      if (key === "query") return;
      filtersFromUrl.push({
        selected: true,
        filter: {
          kind: "fieldValue",
          matcher: Matcher.Equals,
          fieldId: key,
          value,
        },
      });
    });
    if (filtersFromUrl.length > 0) {
      actions.setStaticFilters(filtersFromUrl);
    }
    debugger;
    if (
      query ||
      (initialFilters && initialFilters.length > 0) ||
      filtersFromUrl.length > 0
    ) {
      actions.executeVerticalQuery();
    }
  },
};
