import { ComplexImageType, ImageType } from "@yext/pages/components";
import { getRuntime } from "@yext/pages/util";
import * as React from "react";
import { createContext, useEffect, useReducer } from "react";
import { deepEqual } from "../../../utils/deepEqual";
import { SelectableStaticFilter } from "@yext/search-headless-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  slug: string;
  image?: ImageType | ComplexImageType;
  similarItemsFilter?: SelectableStaticFilter;
}

export interface CartState {
  products: Product[];
}

export enum CartActionTypes {
  AddProduct,
  RemoveProduct,
  SetCartFromStorage,
  SetProductQuantity,
}

export type CartActions =
  | { type: CartActionTypes.SetCartFromStorage; payload: CartState }
  | {
      type: CartActionTypes.AddProduct;
      payload: Product;
    }
  | { type: CartActionTypes.RemoveProduct; payload: string }
  | {
      type: CartActionTypes.SetProductQuantity;
      payload: { productId: string; quantity: number };
    };

export const cartReducer = (state: CartState, action: CartActions) => {
  switch (action.type) {
    case CartActionTypes.SetCartFromStorage:
      return action.payload;
    case CartActionTypes.AddProduct:
      // eslint-disable-next-line no-case-declarations
      const productToAdd = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (productToAdd) {
        productToAdd.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      return { ...state };

    case CartActionTypes.RemoveProduct:
      // eslint-disable-next-line no-case-declarations
      const productToRemove = state.products.find(
        (product) => product.id === action.payload
      );
      if (productToRemove) {
        productToRemove.quantity--;
        if (productToRemove.quantity === 0) {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
        return { ...state };
      } else {
        return state;
      }
    case CartActionTypes.SetProductQuantity:
      // eslint-disable-next-line no-case-declarations
      const productToSet = state.products.find(
        (product) => product.id === action.payload.productId
      );
      if (productToSet) {
        if (action.payload.quantity === 0) {
          state.products = state.products.filter(
            (product) => product.id !== action.payload.productId
          );
        } else {
          productToSet.quantity = action.payload.quantity;
        }
        return { ...state };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export const initialState: CartState = {
  products: [],
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // useEffect hook to parse the cart from local storage if not server side
  useEffect(() => {
    if (!getRuntime().isServerSide) {
      const storageCartString = localStorage.getItem("ski_warehouse_cart");
      if (storageCartString) {
        const storageCart = JSON.parse(storageCartString);
        dispatch({
          type: CartActionTypes.SetCartFromStorage,
          payload: storageCart,
        });
      }
    }
  }, [getRuntime().isServerSide]);

  // // useEffect hook to update local storage if the cart state changes
  useEffect(() => {
    if (!getRuntime().isServerSide) {
      if (
        !deepEqual(
          state,
          JSON.parse(localStorage.getItem("ski_warehouse_cart") ?? "{}")
        )
      ) {
        localStorage.setItem("ski_warehouse_cart", JSON.stringify(state));
      }
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
