import React from "react";

const ProductCardLoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative h-72 lg:h-96 w-full overflow-hidden rounded-lg bg-gray-200"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="h-36 mt-4 bg-gray-200 rounded w-full"></div>
    </div>
  );
};

export default ProductCardLoadingSkeleton;
