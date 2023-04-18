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
import CheckoutForm from "../components/cart/CheckoutForm";
import { StripeProvider } from "../components/cart/providers/StripeProvider";

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
  return "checkout";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Checkout",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Checkout = ({ document }: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="flex justify-center py-8 text-2xl font-semibold text-sky-400 sm:text-4xl">
          Checkout
        </h1>
        <StripeProvider>
          <CheckoutForm />
        </StripeProvider>
      </div>
    </Main>
  );
};

export default Checkout;
