import React from "react";
import { useCartState } from "./hooks/useCartState";
import { formatter } from "../../utils/formatCurrency";

const Subtotal = () => {
  const cartState = useCartState();
  const subtotal = cartState.products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <div className="flex items-center justify-between pt-4">
        <h2 className="text-lg font-medium text-gray-900">Subtotal</h2>
        <dd className="text-base font-medium text-gray-900">
          {formatter.format(subtotal)}
        </dd>
      </div>
      <div className="mt-6">
        <a
          href="/checkout"
          type="submit"
          className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-400 py-3 px-8 text-base font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
        >
          Checkout
        </a>
      </div>
    </section>
  );
};

export default Subtotal;
