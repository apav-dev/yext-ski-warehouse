import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { ReviewSort } from "./Reviews";

const reviewSorts: { reviewSort: ReviewSort; label: string }[] = [
  {
    reviewSort: "reviewDateDesc",
    label: "Most Recent",
  },
  {
    reviewSort: "reviewDateAsc",
    label: "Oldest",
  },
  {
    reviewSort: "ratingDesc",
    label: "Highest Rated",
  },
  {
    reviewSort: "ratingAsc",
    label: "Lowest Rated",
  },
];

export interface ReviewSortDropdownProps {
  selectedSort: ReviewSort;
  setSelectedSort: (sort: ReviewSort) => void;
}

const ReviewSortDropdown = ({
  selectedSort,
  setSelectedSort,
}: ReviewSortDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2  font-semibold text-gray-900  hover:bg-gray-50">
          {reviewSorts.find((sort) => sort.reviewSort === selectedSort)?.label}
          <ChevronDownIcon className="-mr-1 h-5 w-5 " aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex flex-col items-start">
            {reviewSorts
              .filter((sort) => sort.label !== selectedSort)
              .map((sort) => (
                <Menu.Item key={sort.label}>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        setSelectedSort(sort.reviewSort);
                      }}
                      className={twMerge(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "px-4 py-2 text-sm w-full text-left"
                      )}
                    >
                      {sort.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ReviewSortDropdown;
