import {
  provideHeadless,
  SelectableStaticFilter,
} from "@yext/search-headless-react";
import * as React from "react";
import HeadlessProvider from "../components/search/HeadlessProvider";
import { getSearchProviderConfig } from "../config";
import { defaultRouter } from "../routing";

interface MainProps {
  children?: React.ReactNode;
  initialFilters?: SelectableStaticFilter[];
}

const searcher = provideHeadless(getSearchProviderConfig("products"));

const Main = ({ children, initialFilters }: MainProps) => {
  return (
    // <SearchHeadlessProvider searcher={searcher}>
    <HeadlessProvider
      searcher={searcher}
      routing={defaultRouter}
      initialFilters={initialFilters}
    >
      <div className="min-h-screen text-gray-900">
        <div className="relative">{children}</div>
      </div>
    </HeadlessProvider>
    // </SearchHeadlessProvider>
  );
};

export default Main;
