import React from "react";
import { twMerge } from "tailwind-merge";

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
  const colCountClass = `sm:grid-cols-${colCount}`;
  const rowCountClass = `sm:grid-rows-${rowCount}`;

  return (
    <div
      className={twMerge(
        `mt-6 grid grid-cols-1 gap-y-6 sm:gap-x-6 lg:gap-8`,
        colCountClass,
        rowCountClass
      )}
    >
      {children}
    </div>
  );
};

export default CategoryGrid;
