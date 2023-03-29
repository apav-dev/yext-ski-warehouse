import {
  State,
  SearchActions,
  SelectableStaticFilter,
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

    if (query || (initialFilters && initialFilters.length > 0)) {
      actions.executeVerticalQuery();
    }
  },
};
