import * as React from "react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import {
  FieldValueFilter,
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { Section } from "./CategorySelector";
import { getRuntime } from "@yext/pages/util";

type CategoryFiltersProps = {
  headingText?: string;
  subheadingText?: string;
  filters: Section[];
};

const CategoryFilters = ({
  headingText,
  subheadingText,
  filters,
}: CategoryFiltersProps) => {
  const [open, setOpen] = useState(false);

  const searchActions = useSearchActions();
  const staticFilters = useSearchState((state) => state.filters.static) || [];

  useEffect(() => {
    if (!getRuntime().isServerSide) {
      const urlParams = new URLSearchParams(window.location.search);
      const filters: SelectableStaticFilter[] = [];
      urlParams.forEach((value, fieldId) => {
        filters.push({
          selected: true,
          filter: {
            kind: "fieldValue",
            matcher: Matcher.Equals,
            fieldId,
            value,
          },
        });
      });
      searchActions.setStaticFilters(filters);
      searchActions.executeVerticalQuery();
    }
  }, []);

  useEffect(() => {
    searchActions.executeVerticalQuery();
  }, [staticFilters]);

  const activeFiltersValues = useMemo(() => {
    const selectedFieldValueFilters = staticFilters
      .filter((f) => {
        return f.selected && f.filter.kind === "fieldValue";
      })
      .map((f) => f.filter) as FieldValueFilter[];

    return selectedFieldValueFilters.map((f) => f.value);
  }, [staticFilters]);

  const handleOptionClick = (
    fieldId: string,
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      searchActions.setStaticFilters([
        ...staticFilters,
        {
          selected: true,
          filter: {
            kind: "fieldValue",
            matcher: Matcher.Equals,
            fieldId,
            value,
          },
        },
      ]);
    } else {
      searchActions.setStaticFilters(
        staticFilters.filter(
          (f) =>
            !(
              f.filter.kind === "fieldValue" &&
              f.filter.fieldId === fieldId &&
              f.filter.value === value
            )
        )
      );
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure
                      key={section.title}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }: { open: boolean }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                              <span className="font-medium text-gray-900">
                                {section.title}
                              </span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={twMerge(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.filterItems.map((option, optionIdx) => (
                                <div
                                  key={option.name}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.title}-${optionIdx}`}
                                    name={`${section.filterId}[]`}
                                    defaultValue={option.name}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-sky-400 focus:ring-sky-400"
                                    onChange={(e) =>
                                      handleOptionClick(
                                        section.filterId,
                                        option.name,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.filterId}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-24">
          <h1 className="text-4xl font-bold tracking-tight text-sky-400">
            {headingText}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-sky-400">
            {subheadingText}
          </p>
        </div>

        <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 py-6"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  key={section.title}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span>{section.title}</span>
                      {staticFilters.filter(
                        (sf) =>
                          sf.filter.kind === "fieldValue" &&
                          sf.filter.fieldId === section.filterId
                      ).length > 0 ? (
                        <span className="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700">
                          {
                            section.filterItems.filter((item) =>
                              activeFiltersValues.includes(item.name)
                            ).length
                          }
                        </span>
                      ) : null}
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
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
                    <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form className="space-y-4">
                        {section.filterItems.map((option, optionIdx) => (
                          <div key={option.name} className="flex items-center">
                            <input
                              id={`filter-${section.filterId}-${optionIdx}`}
                              name={`${section.filterId}[]`}
                              defaultValue={option.name}
                              type="checkbox"
                              checked={activeFiltersValues.includes(
                                option.name
                              )}
                              onChange={(e) =>
                                handleOptionClick(
                                  section.filterId,
                                  option.name,
                                  e.target.checked
                                )
                              }
                              className="h-4 w-4 rounded border-gray-300 text-sky-400 focus:ring-sky-400"
                            />
                            <label
                              htmlFor={`filter-${section.filterId}-${optionIdx}`}
                              className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                            >
                              {option.name}
                            </label>
                          </div>
                        ))}
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ))}
            </Popover.Group>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryFilters;
