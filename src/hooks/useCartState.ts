import { useContext } from "react";
import { CartContext, CartState } from "../providers/CartProvider";

export const useCartState = (): CartState => {
  const { state } = useContext(CartContext);

  const cart = useContext(CartContext);
  if (cart.state === undefined) {
    throw new Error(
      "Attempted to call useCartState() outside of CartProvider." +
        " Please ensure that 'useCartState()' is called within an CartProvider component."
    );
  }

  return state;
};
