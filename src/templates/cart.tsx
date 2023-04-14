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
import { useCartState } from "../components/cart/hooks/useCartState";
import CartProducts from "../components/cart/CartProducts";
import Subtotal from "../components/cart/Subtotal";
import { SimilarItems } from "../components/SimilarItems";
import RelatedProducts from "../components/cart/RelatedProducts";

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
  return "cart";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Cart",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Cart = ({ document }: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="flex justify-center py-8 text-2xl font-semibold text-sky-400 sm:text-4xl">
          Your Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <CartProducts />
          </section>
          <Subtotal />
        </form>
        {/* Related products */}
        <RelatedProducts />
      </div>
    </Main>
  );
};

export default Cart;
