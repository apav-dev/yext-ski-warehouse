import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import * as React from "react";
import { getSearchProviderConfig } from "../config";

interface MainProps {
  children?: React.ReactNode;
}

const searcher = provideHeadless(getSearchProviderConfig("skis"));

const Main = (props: MainProps) => {
  const { children } = props;

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="min-h-screen">
        <div className="relative">{children}</div>
      </div>
    </SearchHeadlessProvider>
  );
};

export default Main;
