import React, { useState } from "react";
import { useCartActions } from "./cart/hooks/useCartActions";
import { Product } from "./cart/providers/CartProvider";
import { SelectableStaticFilter } from "@yext/search-headless-react";
import { Link } from "@yext/pages/components";
import { RadioGroup } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import AddToCartToast from "./cart/AddToCartToast";

type AddToCartProps = {
  product: Omit<Product, "size">;
  similarItemsFilter?: SelectableStaticFilter;
  sizes?: string[];
  sizeDescriptor?: string;
  sizingGuidePdfUrl?: string;
};

const AddToCart = ({
  product,
  similarItemsFilter,
  sizes,
  sizeDescriptor,
  sizingGuidePdfUrl,
}: AddToCartProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showSelectSizeTooltip, setShowSelectSizeTooltip] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const cartActions = useCartActions();

  const handleAddToCart = () => {
    // cart product id is the id of the product and the size
    if (!selectedSize && sizes && sizes.length > 0) {
      setShowSelectSizeTooltip(true);
      return;
    }

    cartActions.addProductToCart({
      ...product,
      similarItemsFilter,
      id: `${product.id}-${selectedSize}`,
      size: selectedSize,
    });

    // show toast for 3 seconds
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setShowSelectSizeTooltip(false);
  };

  return (
    <>
      {sizeDescriptor && (
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">
            {sizeDescriptor}
            {showSelectSizeTooltip && (
              <span className="transition-opacity bg-red-500 p-1 text-sm text-gray-100 rounded-md ml-4 mb-1">
                Please select a size
              </span>
            )}
          </h2>
          {sizingGuidePdfUrl && (
            <Link
              className="text-sm underline text-sky-400 hover:text-sky-700"
              href={sizingGuidePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Size guide
            </Link>
          )}
        </div>
      )}
      {sizes && sizes.length > 0 && (
        <RadioGroup
          value={selectedSize}
          onChange={handleSizeChange}
          className="mt-2"
        >
          <RadioGroup.Label className="sr-only">
            {`Choose a ${sizeDescriptor}`}
          </RadioGroup.Label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {sizes.map((size) => (
              <RadioGroup.Option
                key={size}
                value={size}
                className={({ active, checked }) =>
                  twMerge(
                    active ? "ring-2 ring-offset-2 ring-sky-400" : "",
                    checked
                      ? "bg-sky-400 border-transparent text-white hover:bg-sky-600"
                      : "bg-white border-gray-700 text-gray-900 hover:bg-gray-50",
                    "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 opacity-60"
                  )
                }
              >
                <RadioGroup.Label>{size}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
      <button
        type="submit"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-400 py-3 px-8 text-base font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 "
        // disabled={sizes && sizes.length > 0 && !selectedSize}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <AddToCartToast show={showToast} productName={product.name} />
    </>
  );
};

export default AddToCart;
