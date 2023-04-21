import {
  Product,
  CartActionTypes,
  CartContext,
} from "../providers/CartProvider";
import { useContext } from "react";

//TODO: throw error if useCartActions is called outside of CartProvider
export const useCartActions = () => {
  const { state, dispatch } = useContext(CartContext);

  // if (state === undefined) {
  //   throw new Error(
  //     "Attempted to call useCartActions() outside of CartProvider." +
  //       " Please ensure that 'useCartActions()' is called within an CartProvider component."
  //   );
  // }

  const addProductToCart = (product: Product) => {
    // if item already exists in cart, increment quantity
    const existingItem = state.products.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (existingItem) {
      setProductQuantity(product.id, existingItem.quantity + 1);
      return;
    }

    dispatch({
      type: CartActionTypes.AddProduct,
      payload: product,
    });
  };

  const setProductQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: CartActionTypes.SetProductQuantity,
      payload: {
        productId,
        quantity,
      },
    });
  };

  const clearCart = () => {
    dispatch({
      type: CartActionTypes.ClearCart,
    });
  };

  return {
    addProductToCart,
    setProductQuantity,
    clearCart,
  };
};
