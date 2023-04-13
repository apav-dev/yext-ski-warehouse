import * as React from "react";
import { Fragment } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Image, Link } from "@yext/pages/components";
import { twMerge } from "tailwind-merge";
import { SkiWarehouseDirectory } from "../../utils/transformSiteData";

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  directory?: SkiWarehouseDirectory;
};

const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  directory,
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
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4">
                    {directory?.genders?.map((gender) => (
                      <Tab
                        key={gender.name}
                        className={({ selected }) =>
                          twMerge(
                            selected
                              ? "text-sky-400 border-sky-400"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                          )
                        }
                      >
                        {gender.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {directory?.genders?.map((gender) => (
                    <Tab.Panel
                      key={gender.name}
                      className="space-y-10 px-4 pt-10 pb-8"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {gender.featuredCollections?.map((collection) => (
                          <div
                            key={collection.name}
                            className="group relative text-sm"
                          >
                            {collection.c_coverPhoto && (
                              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <Image
                                  image={collection.c_coverPhoto}
                                  className="object-cover object-center"
                                />
                              </div>
                            )}
                            <a
                              href={`/${collection.slug}`}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute inset-0 z-10"
                                aria-hidden="true"
                              />
                              {collection.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {gender.productTypes?.map((productType) => (
                        <div key={productType.name}>
                          <p
                            id={`${gender.name}-${productType.name}-heading-mobile`}
                            className="font-medium text-gray-900"
                          >
                            {productType.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${gender.name}-${productType.name}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {productType.categories?.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a
                                  href={`/${item.slug}`}
                                  className="-m-2 block p-2 text-gray-500"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <div className="space-y-6">
                        <div className="border-t border-gray-200 my-8" />
                        <div>
                          <Link
                            href="/blogs"
                            className="text-gray-900 font-medium"
                          >
                            Blog
                          </Link>
                        </div>
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
