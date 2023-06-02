import React, { useState } from "react";
import { ProductResult } from "../../../schema/VerticalResultsSchema";
import ProductImage from "../../ProductImage";
import { useCartActions } from "../../cart/hooks/useCartActions";
import Ce_product from "../../../types/products";
import AddToCartToast from "../../cart/AddToCartToast";
import { Transition } from "@headlessui/react";

interface ProductWidgetProps {
  products: ProductResult[];
}

const ProductWidget = ({ products }: ProductWidgetProps) => {
  const [showToast, setShowToast] = useState(false);
  const [productName, setProductName] = useState("");

  const cartActions = useCartActions();
  // TODO: unify Product interfaces and use a single type. Maybe handle size guide in chat.
  const handleAddToCart = (ski: Ce_product) => {
    setProductName(ski.name);
    const image = ski.photoGallery?.[0];
    cartActions.addProductToCart({
      ...ski,
      price: Number(ski.c_price),
      size: ski.c_sizes?.[0],
      image,
      quantity: 1,
    });
    // show toast for 3 seconds
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <Transition
      show={true}
      appear={true}
      enter="transition-opacity duration-400"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="bg-white rounded-lg max-w-sm lg:max-w-xl">
        <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-x-4 ">
            {products.map((product, i) => (
              <div key={`product-${i}`}>
                <ProductImage image={product.photoGallery?.[0]} />
                <div className="h-14 mb-6">
                  <p className="hover:underline hover:text-gray-500 text-sm font-medium py-4 ">
                    <a href={product.slug}>{product.name}</a>
                  </p>
                </div>
                <div className="flex  py-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
                <div className="py-3">
                  {/* TODO: add prices to all kg products */}
                  <p className=" text-xs text-gray-500 pb-1">Price</p>
                  <p className=" text-sm ">{"$" + product.c_price}</p>
                </div>
                <div className="py-3">
                  <p className="text-xs text-gray-500 pb-1">Brand</p>
                  <p className="text-sm ">{product.c_brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AddToCartToast show={showToast} productName={productName} />
      </div>
    </Transition>
  );
};

export default ProductWidget;
