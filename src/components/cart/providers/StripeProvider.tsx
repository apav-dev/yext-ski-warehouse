import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useCartState } from "../hooks/useCartState";

type StripeProviderProps = {
  children: React.ReactNode;
};

const stripePromise = loadStripe(YEXT_PUBLIC_STRIPE_PK_KEY);

const fetchStripeClientSecret = async (
  amount: number
): Promise<{ client_secret: string }> => {
  const response = await fetch(`/payment-intent?amount=${amount}`);
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
    // amount is in cents
    queryFn: () => fetchStripeClientSecret(subtotal * 100),
    retry: 0,
    enabled: subtotal > 0,
  });

  const options = {
    clientSecret: data?.client_secret,
    // clientSecret:
    //   "pi_3MxtojKvyTQ9FFsY23fF7AwK_secret_4UqcsR78DRwS9smGuEGJTHvD8",
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
