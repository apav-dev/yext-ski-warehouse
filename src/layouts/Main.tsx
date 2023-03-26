import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import * as React from "react";
import HeadlessProvider from "../components/search/HeadlessProvider";
import { getSearchProviderConfig } from "../config";
import { defaultRouter } from "../routing";

interface MainProps {
  children?: React.ReactNode;
}

const searcher = provideHeadless(getSearchProviderConfig("skis"));

const Main = (props: MainProps) => {
  const { children } = props;

  return (
    // <SearchHeadlessProvider searcher={searcher}>
    <HeadlessProvider searcher={searcher} routing={defaultRouter}>
      <div className="min-h-screen text-gray-900">
        <div className="relative">{children}</div>
      </div>
    </HeadlessProvider>
    // </SearchHeadlessProvider>
  );
};

export default Main;
