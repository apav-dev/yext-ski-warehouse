import React from "react";

export interface GridContainerProps {
  children: React.ReactNode;
  colCount?: 1 | 2 | 3;
  rowCount?: 1 | 2 | 3;
}

const CategoryGrid = ({
  children,
  rowCount = 1,
  colCount = 2,
}: GridContainerProps) => {
  return (
    <div
      className={`mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-${colCount} sm:grid-rows-${rowCount} sm:gap-x-6 lg:gap-8`}
    >
      {children}
    </div>
  );
};

export default CategoryGrid;
