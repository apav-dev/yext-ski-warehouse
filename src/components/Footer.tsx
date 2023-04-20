import React from "react";
import { SkiWarehouseDirectory } from "../utils/transformSiteData";
import { Image } from "@yext/pages/components";

interface FooterProps {
  directory?: SkiWarehouseDirectory;
}

const Footer = ({ directory }: FooterProps) => {
  return (
    <footer className="bg-gray-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16  lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {directory?.secondaryLogo && (
            <Image
              layout="fixed"
              width={32}
              height={32}
              image={directory.secondaryLogo}
            />
          )}
          <div className="mt-16 grid grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {directory?.genders?.[0].name}
                </h3>
                {/* TODO: uncomment when there are more product types for each gender  */}
                {/* <ul role="list" className="mt-6 space-y-4">
                  {directory?.genders?.[0].productTypes?.map((productType) => (
                    <li key={productType.name}>
                      <a
                        href={`/${productType.slug}`}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {productType.name}
                      </a>
                    </li>
                  ))}
                </ul> */}
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {directory?.genders?.[1].name}
                </h3>
                {/* TODO: uncomment when there are more product types for each gender  */}
                {/* <ul role="list" className="mt-6 space-y-4">
                  {directory?.genders?.[1].productTypes?.map((productType) => (
                    <li key={productType.name}>
                      <a
                        href={`/${productType.slug}`}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {productType.name}
                      </a>
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <div className="mt-10 md:mt-0">
                  <a
                    href="/stores"
                    className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
                  >
                    Stores
                  </a>
                </div>
              </div>
              <div>
                <div className="mt-10 md:mt-0">
                  <a
                    href="/stores"
                    className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
                  >
                    Blog
                  </a>
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <a
                  href="/support"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
