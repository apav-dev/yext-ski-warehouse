import React from "react";

const OrderedItemsSkeleton = () => {
  return (
    <div className="py-12">
      <div className="animate-pulse">
        {/* Ordered products skeleton */}
        <ul
          role="list"
          className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
        >
          {Array.from({ length: 1 }).map((_, index) => (
            <li key={index} className="flex space-x-6 py-6">
              <div className="rounded-md bg-gray-100 h-40 w-40 flex-none"></div>
              <div className="flex-auto space-y-1">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
              </div>
              <div className="h-4 bg-gray-100 rounded w-20 flex-none"></div>
              <div className="h-4 bg-gray-100 rounded w-12"></div>
            </li>
          ))}
        </ul>

        {/* Summary skeleton */}
        <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
          {["Subtotal", "Shipping", "Taxes"].map((label, index) => (
            <div key={index} className="flex justify-between">
              <dt>{label}</dt>
              <dd className="text-gray-900">
                <div className="h-4 bg-gray-100 rounded w-20"></div>
              </dd>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
            <dt className="text-base">Total</dt>
            <dd className="text-base">
              <div className="h-4 bg-gray-100 rounded w-24"></div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default OrderedItemsSkeleton;
