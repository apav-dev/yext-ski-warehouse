import React, { useEffect, useState } from "react";
import { SimilarItems } from "../SimilarItems";
import { useCartState } from "./hooks/useCartState";
import { SelectableStaticFilter } from "@yext/search-headless-react";

const RelatedProducts = () => {
  const cartState = useCartState();
  const [filter, setFilter] = useState<SelectableStaticFilter>();

  const firstProductFilter = cartState.products[0]?.similarItemsFilter;

  // Using a filter search to show items that are similar to the first item in the cart
  // Not going to rerun search if the cart changes
  useEffect(() => {
    if (firstProductFilter && !filter) {
      setFilter(firstProductFilter);
    }
  }, [firstProductFilter]);

  if (!filter) {
    return <></>;
  }

  return (
    <section aria-labelledby="related-heading" className="mt-24">
      <SimilarItems title="You may also like..." filter={firstProductFilter} />
    </section>
  );
};

export default RelatedProducts;
