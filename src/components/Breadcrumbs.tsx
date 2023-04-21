import * as React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";

export interface BreadcrumbsProps {
  breadcrumbs: {
    name: string;
    slug?: string;
  }[];
}

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  // since there aren't pages for the top level categories, we route to the last category in the breadcrumbs
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1].slug;

  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
          <li key={breadcrumbIdx}>
            <div className="flex items-center text-sm cursor-pointer">
              {breadcrumbIdx !== 0 ? (
                <a
                  href={`/${lastBreadcrumb}`}
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  {breadcrumb.name}
                </a>
              ) : (
                <a href="/">
                  <HomeIcon className="h-4 w-4 text-gray-600" />
                </a>
              )}
              {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
