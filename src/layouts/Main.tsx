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
import { SkiWarehouseDirectory } from "../utils/transformSiteData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { P13nProvider } from "../components/p13n/providers/P13nProvider";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";

interface MainProps {
  children?: React.ReactNode;
  initialFilters?: SelectableStaticFilter[];
  directory?: SkiWarehouseDirectory;
}

const queryClient = new QueryClient();

const searcher = provideHeadless(getSearchProviderConfig("products"));

const Main = ({ children, initialFilters, directory }: MainProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatHeadlessProvider
        config={{
          apiKey: "ba41c60c65d874c5340985ad4fcda69a",
          botId: "ski-warehouse-chat",
        }}
      >
        <P13nProvider>
          {/* <HeadlessProvider
            searcher={searcher}
            routing={defaultRouter}
            initialFilters={initialFilters}
          > */}
          <CartProvider>
            <div className="min-h-screen text-gray-900">
              <div className="relative">
                <Header directory={directory} />
                {children}
                <Footer directory={directory} />
              </div>
            </div>
            <ChatBot configId="ski-warehouse-assistant" />
          </CartProvider>
          {/* </HeadlessProvider> */}
        </P13nProvider>
      </ChatHeadlessProvider>
    </QueryClientProvider>
  );
};

export default Main;
