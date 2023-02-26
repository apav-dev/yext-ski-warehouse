import * as React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";

type BreadcrumbsProps = {
  breadcrumbs: {
    name: string;
    slug?: string;
  }[];
};

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
          <li key={breadcrumbIdx}>
            <div className="flex items-center text-sm">
              {breadcrumbIdx !== 0 ? (
                <a
                  // href={breadcrumb.slug}
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  {breadcrumb.name}
                </a>
              ) : (
                <a>
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
