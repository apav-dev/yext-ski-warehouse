import { useContext } from "react";
import { CartContext, CartState } from "../providers/CartProvider";

//TODO: throw error if useCartState is called outside of CartProvider
export const useCartState = (): CartState => {
  const cart = useContext(CartContext);
  // if (cart.state === undefined) {
  //   throw new Error(
  //     "Attempted to call useCartState() outside of CartProvider." +
  //       " Please ensure that 'useCartState()' is called within an CartProvider component."
  //   );
  // }

  return cart.state;
};
