import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useCartState } from "../hooks/useCartState";

type StripeProviderProps = {
  children: React.ReactNode;
};

const stripePromise = loadStripe(YEXT_PUBLIC_STRIPE_PK_KEY);

const fetchStripeClientSecret = async (): Promise<string> => {
  const response = await fetch("/payment-intent");
  return response.json();
};

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const cartState = useCartState();

  const subtotal = cartState.products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const { data } = useQuery({
    queryKey: ["stripe-client-secret", subtotal],
    // TODO: pass payment amount
    queryFn: fetchStripeClientSecret,
    retry: 0,
    enabled: subtotal > 0,
  });

  const options = {
    clientSecret: data,
    loader: "auto",
    appearance: {
      theme: "stripe",
      rules: {
        ".Tab--selected": {
          borderColor: "#38BDF8",
        },
        ".Input:focus": {
          borderColor: "#38BDF8",
        },
        ".Label": {
          color: "#374151",
          fontWeight: 500,
          fontSize: "14px",
        },
      },
    },
  };

  return data ? (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  ) : (
    <></>
  );
};
