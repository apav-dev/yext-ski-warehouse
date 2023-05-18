import * as React from "react";
import { createContext, useReducer } from "react";

export type Gender = "Not Specified" | "Male" | "Female";

export interface P13nState {
  gender: Gender;
}

export enum P13nActionTypes {
  SetGender,
}

export type P13nActions = {
  type: P13nActionTypes.SetGender;
  payload: P13nState;
};

export const p13nReducer = (state: P13nState, action: P13nActions) => {
  switch (action.type) {
    case P13nActionTypes.SetGender:
      return action.payload;
    default:
      return state;
  }
};

export const initialState: P13nState = {
  gender: "Not Specified",
};

export const P13nContext = createContext<{
  state: P13nState;
  dispatch: React.Dispatch<P13nActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const P13nProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(p13nReducer, initialState);

  return (
    <P13nContext.Provider value={{ state, dispatch }}>
      {children}
    </P13nContext.Provider>
  );
};
