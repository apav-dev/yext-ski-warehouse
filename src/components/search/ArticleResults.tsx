import React from "react";
import { Pagination, VerticalResults } from "@yext/search-ui-react";
import ArticleCard from "./ArticleCard";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";

const ArticleResults = () => {
  const searchActions = useSearchActions();

  useEffect(() => {
    searchActions.setVertical("help_articles");
    searchActions.setVerticalLimit(12);
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      <VerticalResults
        customCssClasses={{
          verticalResultsContainer:
            "grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8",
        }}
        CardComponent={ArticleCard}
      />
      <Pagination />
    </>
  );
};

export default ArticleResults;
