import {
  State,
  SearchActions,
  Matcher,
  SelectableStaticFilter,
} from "@yext/search-headless-react";

export interface Router {
  serializeState: (state: State) => URLSearchParams;
  deserializeParams: (params: URLSearchParams, actions: SearchActions) => void;
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
  deserializeParams: (params, actions) => {
    const query = params.get("query");
    const staticFilters: SelectableStaticFilter[] = [];
    if (query) {
      actions.setQuery(query);
    }

    // parse static filters from the URL for the Men's and Women's search result pages
    if (/\/(men|women)\/.*/.test(window.location.pathname)) {
      console.log(window.location.pathname);
      const categories = window.location.pathname.split("/").slice(1);
      // replace dashes with spaces and capitalize the first letter of each word in the category
      categories.forEach((category, index) => {
        categories[index] = category
          .replace(/-/g, " ")
          .replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
      });

      staticFilters.push({
        selected: true,
        filter: {
          matcher: Matcher.Equals,
          fieldId: "dm_directoryParents.name",
          value: categories[0],
          kind: "fieldValue",
        },
      });

      if (categories[1]) {
        staticFilters.push({
          selected: true,
          filter: {
            matcher: Matcher.Equals,
            fieldId: "c_productType",
            value: categories[1],
            kind: "fieldValue",
          },
        });
      }

      // TODO: Search Core "ORs" when there are 2 of the same static filter. The above is a workaround
      // add a static filter for each category
      // categories.forEach((category) => {
      //   staticFilters.push({
      //     selected: true,
      //     filter: {
      //       matcher: Matcher.Equals,
      //       fieldId: "dm_directoryParents.name",
      //       value: category,
      //       kind: "fieldValue",
      //     },
      //   });
      // });
    }

    if (staticFilters.length > 0) {
      actions.setStaticFilters(staticFilters);
    }

    if (query || staticFilters.length > 0) {
      actions.executeVerticalQuery();
    }
  },
};
