import React from "react";
import { Pagination, VerticalResults } from "@yext/search-ui-react";
import BlogCard from "./BlogCard";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect } from "react";
import BlogCardLoadingSkeleton from "./BlogCardLoadingSkeleton";

const BlogResults = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    searchActions.setVertical("blog");
    searchActions.setVerticalLimit(12);
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      {loading ? (
        // map over a range of 12 to show loading cards
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {Array.from(Array(12).keys()).map((i) => (
            <BlogCardLoadingSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <VerticalResults
            customCssClasses={{
              verticalResultsContainer:
                "grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8",
            }}
            CardComponent={BlogCard}
          />
          <Pagination />
        </>
      )}
    </>
  );
};

export default BlogResults;
