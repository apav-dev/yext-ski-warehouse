import React, { useState, useEffect } from "react";
import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Product } from "./providers/CartProvider";
import { formatter } from "../../utils/formatCurrency";

export interface StripeFormProps {
  products: Product[];
  subtotal: number;
}

const taxes = 23.68;
const shipping = 22.0;

const StripeForm = ({ products, subtotal }: StripeFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isStripeLoading, setIsStripeLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // return_url equals the current page protocol and host while the path is /order-summary
    let return_url = `${window.location.protocol}//${window.location.host}/order-summary`;

    // create a product id to quantity map
    const productQuantities = products.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});

    // add the product id to quantity map to the return_url as a query param
    return_url += `?productQuantities=${JSON.stringify(productQuantities)}`;

    // add taxes and shipping to the return_url as query params
    return_url += `&taxes=${taxes}&shipping=${shipping}`;

    const resp = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url,
      },
    });

    console.log(resp);

    // TODO: handle errors
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }

    setIsLoading(false);
  };

  return (
    <section
      aria-labelledby="payment-heading"
      className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
    >
      <div className="mx-auto max-w-lg">
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-x-4 gap-y-6">
            <div className="col-span-full">
              <div className="mt-1">
                <LinkAuthenticationElement className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm" />
              </div>
            </div>
            <div className="col-span-full">
              <div className="mt-1">
                <PaymentElement />
              </div>
            </div>
            <div className="col-span-full">
              <AddressElement
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm"
                options={{
                  mode: "shipping",
                  allowedCountries: ["US"],
                  autocomplete: { mode: "automatic" },
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md border border-transparent bg-sky-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
          >
            Pay {formatter.format(subtotal + taxes + shipping)}
          </button>

          <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
            <LockClosedIcon
              className="mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Payment details stored in plain text
          </p>
        </form>
      </div>
    </section>
  );
};

export default StripeForm;
