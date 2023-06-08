import React from "react";

const BlogCardLoadingSkeleton = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="rounded-xl bg-gray-200 h-60 w-full"></div>
      <div className="mt-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="mt-6 flex items-center space-x-4">
        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
};

export default BlogCardLoadingSkeleton;
