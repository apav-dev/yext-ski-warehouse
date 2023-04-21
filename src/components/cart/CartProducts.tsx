import React from "react";
import { useCartState } from "./hooks/useCartState";
import { Image } from "@yext/pages/components";
import { XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";
import { useCartActions } from "./hooks/useCartActions";

const CartProducts = () => {
  const cartState = useCartState();
  const cartActions = useCartActions();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.dataset.productId;
    const quantity = parseInt(e.target.value, 10);
    console.log(productId, quantity);
    if (productId) {
      cartActions.setProductQuantity(productId, quantity);
    }
  };

  const handleRemoveProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = e.currentTarget.dataset.productId;
    if (productId) {
      cartActions.setProductQuantity(productId, 0);
    }
  };

  if (cartState.products.length === 0) {
    return (
      <>
        <div className="flex flex-col justify-center text-2xl font-semibold text-gray-900 ">
          <p>Your cart is empty</p>
          <a
            className="text-sm underline text-sky-400 hover:text-sky-700 mt-1"
            href="/"
          >
            Continue Shopping
          </a>
        </div>
      </>
    );
  }

  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-b border-t border-gray-200"
    >
      {cartState.products.map((product, productIdx) => (
        <li key={product.id} className="flex py-6 sm:py-10">
          <div className="flex-shrink-0">
            {product.image && (
              <Image
                image={product.image}
                className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
              />
            )}
          </div>
          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <a
                      href={product.slug}
                      className="font-medium text-gray-700 hover:text-gray-800"
                    >
                      {product.name}
                    </a>
                  </h3>
                </div>
                <div className="mt-1 flex text-sm">
                  {product.size ? (
                    <p className="text-gray-500">{product.size}</p>
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {`$${product.price}`}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:pr-9">
                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                  Quantity, {product.name}
                </label>
                <select
                  id={`quantity-${productIdx}`}
                  name={`quantity-${productIdx}`}
                  className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={product.quantity}
                  data-product-id={product.id}
                  onChange={handleQuantityChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                </select>

                <div className="absolute right-0 top-0">
                  <button
                    type="button"
                    className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                    data-product-id={product.id}
                    onClick={handleRemoveProduct}
                  >
                    <span className="sr-only">Remove</span>
                    <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartProducts;
