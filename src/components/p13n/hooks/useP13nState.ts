import { useContext } from "react";
import { P13nContext, P13nState } from "../providers/P13nProvider";

type Selector<TState, TResult> = (state: TState) => TResult;

//TODO: throw error if useP13nState is called outside of P13nProvider
export const useP13nState = <TResult>(
  selector: Selector<P13nState, TResult>
) => {
  const context = useContext(P13nContext);

  return selector(context.state);
};
