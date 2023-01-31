import * as React from "react";
import { Fragment } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { NavItem } from "./Header";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Image } from "@yext/pages/components";
import { twMerge } from "tailwind-merge";

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigation?: NavItem[];
};

const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  navigation,
}: MobileMenuProps) => {
  return (
    <Transition.Root show={mobileMenuOpen} as={Fragment}>
      <Dialog className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
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
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4">
                    {navigation?.map((item) => (
                      <Tab
                        key={item.name}
                        className={({ selected }) =>
                          twMerge(
                            selected
                              ? "text-sky-400 border-sky-400"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                          )
                        }
                      >
                        {item.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation?.map((item) => (
                    <Tab.Panel key={item.name} className="space-y-12 px-4 py-6">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                        {item.c_collection.filters.map((filter) => (
                          <div
                            key={filter.label || filter.value}
                            className="group relative"
                          >
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                              {filter.image && <Image image={filter.image} />}
                            </div>
                            <a
                              href={filter.href}
                              className="mt-6 block text-sm font-medium text-sky-400"
                            >
                              <span
                                className="absolute inset-0 z-10"
                                aria-hidden="true"
                              />
                              {filter.label || filter.value}
                            </a>
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu;
