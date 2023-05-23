import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useCartState } from "../hooks/useCartState";

export interface StripeProviderProps {
  children: React.ReactNode;
}

const stripePromise = loadStripe(YEXT_PUBLIC_STRIPE_PK_KEY);

const fetchStripeClientSecret = async (
  amount: number
): Promise<{ client_secret: string }> => {
  const response = await fetch(
    `http://localhost:8000/api/payment-intent?amount=${amount}`
  );
  return response.json();
};

export const StripeFormProvider = ({ children }: StripeProviderProps) => {
  const cartState = useCartState();

  const subtotal = cartState.products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const { data } = useQuery({
    queryKey: ["stripe-client-secret"],
    // amount is in cents. Stripe expects an integer.
    queryFn: () => fetchStripeClientSecret(Math.round(subtotal * 100)),
    retry: 0,
    enabled: subtotal > 0,
  });

  const options = {
    clientSecret: data?.client_secret,
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
