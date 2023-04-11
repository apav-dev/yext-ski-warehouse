import * as React from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Image, Link } from "@yext/pages/components";
import MobileMenu from "./mobile/MobileMenu";
import { twMerge } from "tailwind-merge";
import MobileSearchPanel from "./mobile/MobileSearchPanel";
import SearchBar from "./search/SearchBar";
import { useSearchActions } from "@yext/search-headless-react";
import { SkiWarehouseDirectory } from "../utils/transformSiteData";

type HeaderProps = {
  directory?: SkiWarehouseDirectory;
};

const Header = ({ directory }: HeaderProps) => {
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
        directory={directory}
      />
      <MobileSearchPanel
        searchPanelOpen={mobileSearchOpen}
        setSearchPanelOpen={toggleMobileSearch}
      />
      <header className="relative z-10">
        <div aria-hidden="true" className="absolute inset-0 bg-sky-400 " />
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="bg-white/10 backdrop-blur-md backdrop-filter">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <a href="/" className="hidden lg:block">
                    <span className="sr-only">Ski Warehouse</span>
                    {directory?.logo && (
                      <Image className="h-8 w-auto" image={directory.logo} />
                    )}
                  </a>
                  {/* Flyout menus */}
                  <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                    <div className="flex h-full space-x-8">
                      {directory?.genders?.map((gender) => (
                        <Popover key={gender.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  className={twMerge(
                                    open
                                      ? "border-sky-700 text-sky-700"
                                      : "border-transparent text-white hover:text-sky-700",
                                    "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                  )}
                                >
                                  {gender.name}
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
                                    <div className="mx-auto max-w-7xl px-8">
                                      <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                          {gender.featuredCollections?.map(
                                            (collection) => (
                                              <div
                                                key={collection.name}
                                                className="group relative text-base sm:text-sm"
                                              >
                                                {collection.c_coverPhoto && (
                                                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                    <Image
                                                      image={
                                                        collection.c_coverPhoto
                                                      }
                                                      className="object-cover object-center"
                                                    />
                                                  </div>
                                                )}
                                                <a
                                                  // href={collection.href}
                                                  className="mt-6 block font-medium text-gray-900"
                                                >
                                                  <span
                                                    className="absolute inset-0 z-10"
                                                    aria-hidden="true"
                                                  />
                                                  {collection.name}
                                                </a>
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                          {gender.productTypes?.map(
                                            (productType) => (
                                              <div key={productType.name}>
                                                <p
                                                  id={`${productType.name}-heading`}
                                                  className="font-medium text-gray-900"
                                                >
                                                  {productType.name}
                                                </p>
                                                <ul
                                                  role="list"
                                                  aria-labelledby={`${productType.name}-heading`}
                                                  className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                >
                                                  {productType.categories?.map(
                                                    (category) => (
                                                      <li
                                                        key={category.name}
                                                        className="flex"
                                                      >
                                                        <a
                                                          href={`/${category.slug}`}
                                                          className="hover:text-gray-800"
                                                        >
                                                          {category.name}
                                                        </a>
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}

                      <div className="flex items-center">
                        <div className="my-auto h-8 w-px bg-white py-4" />
                      </div>
                      <div className="flex items-center">
                        <Link
                          href="/stores"
                          className="text-sm font-medium text-white hover:text-sky-700"
                        >
                          Stores
                        </Link>
                      </div>
                      <div className="flex items-center">
                        <Link
                          href="/blogs"
                          className="text-sm font-medium text-white hover:text-sky-700"
                        >
                          Blog
                        </Link>
                      </div>
                      <div className="flex items-center">
                        <Link
                          href="/support"
                          className="text-sm font-medium text-white hover:text-sky-700"
                        >
                          Support
                        </Link>
                      </div>
                    </div>
                  </Popover.Group>

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
                  <a href="/" className="lg:hidden">
                    <span className="sr-only">Ski Warehouse</span>
                    {directory?.logo && (
                      <Image className="h-8 w-auto" image={directory.logo} />
                    )}
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="hidden w-80 lg:block">
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
