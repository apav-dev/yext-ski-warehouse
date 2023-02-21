import * as React from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { ComplexImageType, ImageType, Image } from "@yext/pages/components";
import MobileMenu from "./mobile/MobileMenu";
import { twMerge } from "tailwind-merge";
import MobileSearchPanel from "./mobile/MobileSearchPanel";
import SearchBar from "./SearchBar";
import { useSearchActions } from "@yext/search-headless-react";

// create a type from the navigation object
export type NavItem = {
  name: string;
  c_collection: {
    filterId: string;
    filters: {
      value: string;
      label?: string;
      href?: string;
      image?: ComplexImageType | ImageType;
    }[];
  };
};

type HeaderProps = {
  logo?: ComplexImageType | ImageType;
  navigation?: NavItem[];
};

const Header = ({ logo, navigation }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const searchActions = useSearchActions();

  const toggleMobileSearch = () => {
    if (mobileSearchOpen) {
      searchActions.setQuery("");
      setMobileSearchOpen(false);
    } else {
      setMobileSearchOpen(true);
    }
  };

  return (
    <>
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigation={navigation}
      />
      <MobileSearchPanel
        searchPanelOpen={mobileSearchOpen}
        setSearchPanelOpen={toggleMobileSearch}
      />
      <header className="relative z-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-sky-600 opacity-40"
        />
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="bg-white/10 backdrop-blur-md backdrop-filter">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  {logo && (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center">
                      <a href="#">
                        <span className="sr-only">Yext Ski Warehouse</span>
                        {logo && (
                          <Image
                            className="h-8 w-auto"
                            image={logo}
                            loading="eager"
                          />
                        )}
                      </a>
                      <div className="hidden h-full lg:flex">
                        {/* Flyout menus */}
                        <Popover.Group className="inset-x-0 bottom-0 px-8">
                          <div className="flex h-full justify-center space-x-6">
                            {navigation?.map((item) => (
                              <Popover key={item.name} className="flex">
                                {({ open }) => (
                                  <>
                                    <div className="relative flex">
                                      <Popover.Button className="relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                                        {item.name}
                                        <span
                                          className={twMerge(
                                            open ? "bg-white" : "",
                                            "absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </Popover.Button>
                                    </div>

                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-200"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="transition ease-in duration-150"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                        <div
                                          className="absolute inset-0 top-1/2 bg-white shadow"
                                          aria-hidden="true"
                                        />

                                        <div className="relative bg-white">
                                          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                            <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                              {item.c_collection.filters.map(
                                                (filter) => (
                                                  <div
                                                    key={filter.value}
                                                    className="group relative"
                                                  >
                                                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                      {filter.image && (
                                                        <Image
                                                          image={filter.image}
                                                        />
                                                      )}
                                                    </div>
                                                    <a
                                                      href={filter.href}
                                                      className="mt-4 block font-medium text-gray-900"
                                                    >
                                                      <span
                                                        className="absolute inset-0 z-10"
                                                        aria-hidden="true"
                                                      />
                                                      {filter.label ||
                                                        filter.value}
                                                    </a>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </Popover.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Popover>
                            ))}
                          </div>
                        </Popover.Group>
                      </div>
                    </div>
                  )}

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 p-2 text-white"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <button
                      className="ml-2 p-2 text-white"
                      type="button"
                      onClick={() => setMobileSearchOpen(true)}
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Yext Ski Warehouse</span>
                    {logo && <Image className="h-8 w-auto" image={logo} />}
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="w-80 hidden lg:block">
                      <SearchBar
                        customCssClasses={{
                          searchBarContainer: "hidden lg:block mb-0",
                        }}
                      />
                    </div>
                    <div className="flex items-center lg:ml-8">
                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-8">
                        <a
                          href="#"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 text-white"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-white">
                            0
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
