import {
  provideHeadless,
  SelectableStaticFilter,
} from "@yext/search-headless-react";
import * as React from "react";
import HeadlessProvider from "../components/search/HeadlessProvider";
import { getSearchProviderConfig } from "../config";
import { defaultRouter } from "../routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "../components/cart/providers/CartProvider";
import { SkiWarehouseDirectory } from "../utils/transformSiteData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { P13nProvider } from "../components/p13n/providers/P13nProvider";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import { ChatPopUp } from "@yext/chat-ui-react";

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
      <P13nProvider>
        <ChatHeadlessProvider
          config={{
            apiKey: YEXT_PUBLIC_CONTENT_API_KEY || "",
            botId: "ski-warehouse-chat",
            saveToSessionStorage: false,
          }}
        >
          <HeadlessProvider
            searcher={searcher}
            routing={defaultRouter}
            initialFilters={initialFilters}
          >
            <CartProvider>
              <div className="min-h-screen text-gray-900">
                <div className="relative">
                  <Header directory={directory} />
                  {children}
                  <Footer directory={directory} />
                </div>
              </div>
              <ChatPopUp
                title="Ski Warehouse"
                stream={false}
                customCssClasses={{
                  buttonIcon: "text-white",
                  button:
                    "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700",
                  panelCssClasses: {
                    messageBubbleCssClasses: {
                      message: "text-base",
                      message__user: "bg-gradient-to-r from-sky-500 to-sky-600",
                    },
                    inputCssClasses: {
                      sendButton:
                        "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700",
                      textArea:
                        "border border-gray-300 focus:ring-sky-500 focus:border-sky-500 text-base",
                    },
                  },
                  headerCssClasses: {
                    container:
                      "bg-gradient-to-r from-sky-500 to-sky-600 rounded-t-3xl",

                    title: "overflow-hidden",
                  },
                }}
              />
            </CartProvider>
          </HeadlessProvider>
        </ChatHeadlessProvider>
      </P13nProvider>
    </QueryClientProvider>
  );
};

export default Main;
