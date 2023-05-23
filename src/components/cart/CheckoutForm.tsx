import React from "react";
import { Disclosure } from "@headlessui/react";
import { useCartState } from "./hooks/useCartState";
import { Image } from "@yext/pages/components";
import { formatter } from "../../utils/formatCurrency";

import StripeForm from "./StripeForm";
import { StripeFormProvider } from "./providers/StripeFormProvider";

const taxes = 23.68;
const shipping = 22.0;

const CheckoutForm = () => {
  const cartState = useCartState();

  const subtotal = cartState.products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

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
                            <p className="text-gray-900">
                              {formatter.format(product.price)}
                            </p>
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
        <StripeFormProvider>
          <StripeForm products={cartState.products} subtotal={subtotal} />
        </StripeFormProvider>
      </main>
    </>
  );
};

export default CheckoutForm;
