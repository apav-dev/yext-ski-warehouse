import { useSearchActions } from "@yext/search-headless-react";
import { VerticalResults } from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

interface RecentSearches {
  query: string;
  timestamp: number;
}

export const FeaturedProducts = () => {
  const searchActions = useSearchActions();

  useEffect(() => {
    // check to see if __yxt_recent_searches_products__ exists in local storage
    const recentProductSearches = localStorage.getItem(
      "__yxt_recent_searches_products__"
    );

    if (recentProductSearches) {
      const parsedRecentProductSearches: RecentSearches[] = JSON.parse(
        recentProductSearches
      );
      parsedRecentProductSearches.length > 0 &&
        searchActions.setQuery(parsedRecentProductSearches[0].query);
    }

    searchActions.setVerticalLimit(4);
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <VerticalResults
      customCssClasses={{
        verticalResultsContainer:
          "mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8",
      }}
      CardComponent={ProductCard}
    />
  );
};
