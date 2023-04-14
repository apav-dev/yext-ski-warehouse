import {
  provideHeadless,
  SelectableStaticFilter,
} from "@yext/search-headless-react";
import * as React from "react";
import HeadlessProvider from "../components/search/HeadlessProvider";
import { getSearchProviderConfig } from "../config";
import { defaultRouter } from "../routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatBot } from "../components/ChatBot";
import { CartProvider } from "../components/cart/providers/CartProvider";

interface MainProps {
  children?: React.ReactNode;
  initialFilters?: SelectableStaticFilter[];
}

const queryClient = new QueryClient();

const searcher = provideHeadless(getSearchProviderConfig("products"));

const Main = ({ children, initialFilters }: MainProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HeadlessProvider
        searcher={searcher}
        routing={defaultRouter}
        initialFilters={initialFilters}
      >
        <CartProvider>
          <div className="min-h-screen text-gray-900">
            <div className="relative">{children}</div>
          </div>
        </CartProvider>
        <ChatBot configId="ski-shop-demo" />
      </HeadlessProvider>
    </QueryClientProvider>
  );
};

export default Main;
