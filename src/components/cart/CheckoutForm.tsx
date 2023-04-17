import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useCartState } from "./hooks/useCartState";
import { Image } from "@yext/pages/components";
import { formatter } from "../../utils/formatCurrency";
import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

//TODO: get actual shipping and tax rates
const taxes = 23.68;
const shipping = 22.0;

type CheckoutFormProps = {
  domain: string;
};

// TODO: add edit and remove product functionality
const CheckoutForm = ({ domain }: CheckoutFormProps) => {
  const cartState = useCartState();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const subtotal = cartState.products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url:
          "https://payments-commerce-skiware-us.preview.pagescdn.com/order-summary",
      },
    });

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
    <>
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section
          aria-labelledby="order-heading"
          className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
        >
          <Disclosure as="div" className="mx-auto max-w-lg">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between">
                  <h2
                    id="order-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Your Order
                  </h2>
                  <Disclosure.Button className="font-medium text-sky-400 hover:text-sky-600">
                    {open ? (
                      <span>Hide full summary</span>
                    ) : (
                      <span>Show full summary</span>
                    )}
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel>
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-b border-gray-200"
                  >
                    {cartState.products.map((product) => (
                      <li key={product.id} className="flex space-x-6 py-6">
                        {product.image && (
                          <Image
                            image={product.image}
                            layout="fixed"
                            width={160}
                            height={160}
                            className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                          />
                        )}
                        <div className="flex flex-col justify-between space-y-4">
                          <div className="space-y-1 text-sm font-medium">
                            <h3 className="text-gray-900">{product.name}</h3>
                            <p className="text-gray-900">{`$${product.price}`}</p>
                            <p className="text-gray-500">{product.size}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center pt-2">
                    <a
                      type="button"
                      className="text-sm font-medium text-sky-400 hover:text-sky-600"
                      href="/cart"
                    >
                      Edit Cart
                    </a>
                  </div>
                  <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="text-gray-900">
                        {formatter.format(subtotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Taxes</dt>
                      <dd className="text-gray-900">
                        {formatter.format(taxes)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd className="text-gray-900">
                        {formatter.format(shipping)}
                      </dd>
                    </div>
                  </dl>
                </Disclosure.Panel>

                <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
                  <span className="text-base">Total</span>
                  <span className="text-base">
                    {formatter.format(subtotal + taxes + shipping)}
                  </span>
                </p>
              </>
            )}
          </Disclosure>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul
            role="list"
            className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6"
          >
            {cartState.products.map((product) => (
              <li key={product.id} className="flex space-x-6 py-6">
                {product.image && (
                  <Image
                    image={product.image}
                    layout="fixed"
                    width={160}
                    height={160}
                    className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                  />
                )}
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-1 text-sm font-medium">
                    <h3 className="text-gray-900">{product.name}</h3>
                    <p className="text-gray-900">
                      {formatter.format(product.price)}
                    </p>
                    <p className="text-gray-500">{product.size}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            <div className="flex justify-center pt-2">
              <a
                type="button"
                className="text-sm font-medium text-sky-400 hover:text-sky-600"
                href="/cart"
              >
                Edit Cart
              </a>
            </div>
            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">{formatter.format(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">{formatter.format(taxes)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-gray-900">{formatter.format(shipping)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">
                  {formatter.format(subtotal + taxes + shipping)}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
        >
          <div className="mx-auto max-w-lg">
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                <div className="col-span-full">
                  <div className="mt-1">
                    <LinkAuthenticationElement
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring-sky-400 sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
      </main>
    </>
  );
};

export default CheckoutForm;
