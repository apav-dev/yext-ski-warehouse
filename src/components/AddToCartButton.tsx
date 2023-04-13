import React from "react";
import { useCartActions } from "../hooks/useCartActions";
import { Product } from "../providers/CartProvider";

const AddToCartButton = ({ product }: { product: Product }) => {
  const cartActions = useCartActions();

  return (
    <button
      type="submit"
      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-400 py-3 px-8 text-base font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 opacity-60"
      onClick={() => cartActions.addItemToCart(product)}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
