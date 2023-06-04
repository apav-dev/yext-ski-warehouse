import React from "react";
import { useContext } from "react";
import {
  Gender,
  P13nActionTypes,
  P13nContext,
} from "../providers/P13nProvider";

//TODO: throw error if useP13nActions is called outside of CartProvider
export const useP13nActions = () => {
  const { dispatch } = useContext(P13nContext);

  const setGender = (gender: Gender) => {
    // if item already exists in cart, increment quantity

    dispatch({
      type: P13nActionTypes.SetGender,
      payload: { gender },
    });
  };

  return {
    setGender,
  };
};
