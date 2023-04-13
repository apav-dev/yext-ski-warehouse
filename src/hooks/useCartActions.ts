import {
  Product,
  CartActionTypes,
  CartContext,
} from "../providers/CartProvider";
import { useContext } from "react";

export const useCartActions = () => {
  const { state, dispatch } = useContext(CartContext);

  if (state === undefined) {
    throw new Error(
      "Attempted to call useCartActions() outside of CartProvider." +
        " Please ensure that 'useCartActions()' is called within an CartProvider component."
    );
  }

  const addItemToCart = (product: Product) => {
    // if item already exists in cart, increment quantity
    const existingItem = state.products.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (existingItem) {
      incrementProduct(product.id);
      return;
    }

    dispatch({
      type: CartActionTypes.AddProduct,
      payload: product,
    });
  };

  const removeItemFromCart = (productId: string) => {
    dispatch({
      type: CartActionTypes.RemoveProduct,
      payload: productId,
    });
  };

  const incrementProduct = (productId: string) => {
    dispatch({
      type: CartActionTypes.IncrementProduct,
      payload: productId,
    });
  };

  const decrementProduct = (productId: string) => {
    dispatch({
      type: CartActionTypes.DecrementProduct,
      payload: productId,
    });
  };

  return {
    addItemToCart,
    removeItemFromCart,
    incrementProduct,
    decrementProduct,
  };
};
