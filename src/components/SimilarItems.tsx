import {
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
import { VerticalResults } from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import ProductCard from "./search/ProductCard";

type SimilarItemsProps = {
  title?: string;
  filter?: SelectableStaticFilter;
};

export const SimilarItems = ({ title, filter }: SimilarItemsProps) => {
  const searchActions = useSearchActions();

  useEffect(() => {
    if (filter) {
      searchActions.setStaticFilters([filter]);
      searchActions.setVerticalLimit(4);
      searchActions.executeVerticalQuery();
    }
  }, [filter]);

  return (
    <>
      <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
        <h2 id="related-heading" className="text-lg font-medium text-gray-900">
          {title}
        </h2>
        <VerticalResults
          customCssClasses={{
            verticalResultsContainer:
              "mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8",
          }}
          CardComponent={ProductCard}
        />
      </section>
    </>
  );
};
