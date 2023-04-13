import React from "react";
import { Fragment } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import { useCartState } from "../hooks/useCartState";
import { Image } from "@yext/pages/components";

const CartPopover = () => {
  const cartState = useCartState();

  return (
    <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
      <Popover.Button className="group -m-2 flex items-center p-2">
        <div className="ml-4 flow-root lg:ml-8">
          <a href="#" className="group -m-2 flex items-center p-2">
            <ShoppingBagIcon
              className="h-6 w-6 flex-shrink-0 text-white"
              aria-hidden="true"
            />
            <span className="ml-2 text-sm font-medium text-white">
              {cartState.products.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </span>
            <span className="sr-only">items in cart, view bag</span>
          </a>
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
          <h2 className="sr-only">Shopping Cart</h2>
          <form className="mx-auto max-w-2xl px-6">
            <ul role="list" className="divide-y divide-gray-200">
              {cartState.products.map((product) => (
                <li key={product.id} className="flex  py-6">
                  {product.image && (
                    // <div className="h-16 w-16 border border-gray-200 rounded-md">
                    <Image
                      image={product.image}
                      layout="fixed"
                      width={64}
                      height={64}
                      className="border border-gray-200 rounded-md"
                    />
                    // </div>
                  )}
                  <div className="ml-4 flex-auto text-gray-900 font-medium">
                    <h3>
                      <a href={product.slug}>{product.name}</a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {`$${product.price}`}
                    </p>
                  </div>
                  <div>{`x${product.quantity}`}</div>
                </li>
              ))}
            </ul>
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-sky-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>

            <p className="mt-6 text-center">
              <a
                href="#"
                className="text-sm font-medium text-sky-400 hover:text-sky-700"
              >
                View Shopping Bag
              </a>
            </p>
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default CartPopover;
