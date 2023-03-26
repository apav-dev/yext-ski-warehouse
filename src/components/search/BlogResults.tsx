import React from "react";
import { VerticalResults } from "@yext/search-ui-react";
import BlogCard from "./BlogCard";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";

const BlogResults = () => {
  const searchActions = useSearchActions();

  useEffect(() => {
    searchActions.setVertical("blog");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <VerticalResults
      customCssClasses={{
        verticalResultsContainer:
          "grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8",
      }}
      CardComponent={BlogCard}
    />
  );
};

export default BlogResults;
