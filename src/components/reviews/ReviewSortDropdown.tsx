import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

// typescript thing that can either be $sortBy__desc or $sortBy__asc
type SortKey = "$sortBy__desc" | "$sortBy__asc";

export interface ReviewSortBy {
  label: string;
  sort: {
    key: SortKey;
    value: string;
  };
}

const reviewSortOptions: ReviewSortBy[] = [
  {
    label: "Newest",
    sort: {
      key: "$sortBy__desc",
      value: "reviewDate",
    },
  },
  {
    label: "Oldest",
    sort: {
      key: "$sortBy__asc",
      value: "reviewDate",
    },
  },
  {
    label: "Rating: High to Low",
    sort: {
      key: "$sortBy__desc",
      value: "rating",
    },
  },
  {
    label: "Rating: Low to High",
    sort: {
      key: "$sortBy__asc",
      value: "rating",
    },
  },
];

const ReviewSortDropdown = () => {
  const [selectedSort, setSelectedSort] = useState(reviewSortOptions[0]);

  // const handleSortChange = (sortBy: { label: string; sortBy: SortBy }) => {
  //   setSelectedSort(sortBy);
  //   searchActions.setSortBys([sortBy.sortBy]);
  //   searchActions.executeVerticalQuery();
  // };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2  font-semibold text-sky-400  hover:bg-gray-50">
          {selectedSort.label}
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
            {reviewSortOptions
              .filter((option) => option.label !== selectedSort.label)
              .map((option) => (
                <Menu.Item key={option.label}>
                  {({ active }) => (
                    <button
                      // onClick={() => {
                      //   handleSortChange(option);
                      // }}
                      className={twMerge(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "px-4 py-2 text-sm w-full text-left"
                      )}
                    >
                      {option.label}
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
