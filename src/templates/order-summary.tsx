import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import Main from "../layouts/Main";
import Header from "../components/Header";
import { transformSiteData } from "../utils/transformSiteData";
import OrderedItems from "../components/cart/OrderedItems";

export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  const { _site } = data.document;

  return {
    ...data,
    document: {
      ...data.document,
      _site: transformSiteData(_site),
    },
  };
};

export const getPath: GetPath<TemplateRenderProps> = () => {
  return "order-summary";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Order Summary",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const OrderSummary = ({ document }: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>

      <main className="relative lg:min-h-[calc(100vh-64px)]">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            src="https://images.unsplash.com/photo-1555670846-1600fbb55b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
            alt="TODO"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <OrderedItems />
      </main>
    </Main>
  );
};

export default OrderSummary;
