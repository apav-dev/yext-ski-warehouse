import React from "react";
import { useChatState } from "@yext/chat-headless-react";
import { VerticalResultsSchema } from "../../../schema/VerticalResultsSchema";
import ProductImage from "../../ProductImage";
import { useCartActions } from "../../cart/hooks/useCartActions";
import Ce_product from "../../../types/products";

const ProductWidget = () => {
  const cartActions = useCartActions();

  const searchResults = useChatState(
    (state) => state.conversation.notes?.queryResult
  );
  const parsedResults = VerticalResultsSchema.safeParse(searchResults);

  if (!parsedResults.success) {
    return null;
  }

  const skis = parsedResults.data.response.results.map(
    (searchResult) => searchResult.data
  );

  // TODO: unify Product interfaces and use a single type. Maybe handle size guide in chat.
  const handleAddToCart = (ski: Ce_product) => {
    const image = ski.photoGallery?.[0];
    debugger;
    cartActions.addProductToCart({
      ...ski,
      price: Number(ski.c_price),
      size: ski.c_sizes?.[0],
      image,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white rounded-lg max-w-sm lg:max-w-xl">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-x-4 ">
          {skis.map((ski) => (
            <div key={ski.id}>
              <ProductImage image={ski.photoGallery?.[0]} />
              <div className="h-14 mb-6">
                <p className="hover:underline hover:text-gray-500 text-sm font-medium py-4 ">
                  <a href={ski.slug}>{ski.name}</a>
                </p>
              </div>
              <div className="flex  py-2">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
                  onClick={() => handleAddToCart(ski)}
                >
                  Add to cart
                </button>
              </div>
              <div className="py-3">
                {/* TODO: add prices to all kg products */}
                <p className=" text-xs text-gray-500 pb-1">Price</p>
                <p className=" text-sm ">{"$" + ski.c_price}</p>
              </div>
              <div className="py-3">
                <p className="text-xs text-gray-500 pb-1">Brand</p>
                <p className="text-sm ">{ski.c_brand}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductWidget;
