import React from "react";

const FaqCardLoadingSkeleton = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="border border-gray-100 rounded-lg p-4 shadow-sm">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default FaqCardLoadingSkeleton;
