import React, { useEffect, useState } from "react";
import { Image } from "@yext/pages/components";
import { formatter } from "../../utils/formatCurrency";
import { useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js/types/api/payment-intents";
import { Product } from "./providers/CartProvider";
import OrderedItemsSkeleton from "./OrderedItemsSkeleton";
import { useCartActions } from "./hooks/useCartActions";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (productIds: string[]) => {
  // fetch products by appending a series of id__in query params to this url: https://cdn.yextapis.com/v2/accounts/me/content/products?api_key=1316c9fafd65fd4518e69100166461a7&v=20230417

  const url = new URL(
    "https://cdn.yextapis.com/v2/accounts/me/content/products"
  );
  const params = {
    api_key: YEXT_PUBLIC_CONTENT_API_KEY,
    v: "20230417",
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  productIds.forEach((id) => url.searchParams.append("id__in", id));

  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
};

const OrderedItems = () => {
  const cartActions = useCartActions();

  const [shippingInfo, setShippingInfo] =
    useState<PaymentIntent.Shipping | null>();
  const [subtotal, setSubtotal] = useState(0);
  const [productQuantities, setProductQuantities] =
    useState<Record<string, string>>();
  const [productIds, setProductIds] = useState<string[]>();
  const [products, setProducts] = useState<Product[]>([]);
  const [taxes, setTaxes] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);

  const stripe = useStripe();

  useEffect(() => {
    // the products and their quantities are query params as a stringified array called productQuantities
    const params = new URLSearchParams(window.location.search);
    const productsParam = params.get("productQuantities");
    if (productsParam) {
      const products = JSON.parse(productsParam);
      setProductQuantities(products);
      // each key in the products object is in the form of productId-size. Set product ids as a Set of product ids
      const productIds = new Set(
        Object.keys(products).map((key) => key.split("-")[0])
      );
      setProductIds(Array.from(productIds));
    }

    const shippingInfoParam = params.get("shipping");
    if (shippingInfoParam) {
      setShippingRate(JSON.parse(shippingInfoParam));
    }

    const taxesParam = params.get("taxes");
    if (taxesParam) {
      setTaxes(JSON.parse(taxesParam));
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["products", productIds],
    queryFn: () => fetchProducts(productIds || []),
    retry: 0,
    enabled: productIds && productIds.length > 0,
  });

  useEffect(() => {
    if (data && productQuantities) {
      const products = Object.entries(productQuantities).map(
        ([key, quantity]) => {
          const [productId, size] = key.split("-");
          const product = data.response.docs.find(
            (product: Product) => product.id === productId
          );
          return {
            ...product,
            price: product.c_price,
            image: product.photoGallery?.[0],
            quantity,
            size,
          };
        }
      );
      setProducts(products);
      const subtotal = products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      setSubtotal(subtotal);
    }
  }, [data]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (clientSecret) {
      // Retrieve the PaymentIntent
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (paymentIntent) {
          switch (paymentIntent.status) {
            case "succeeded":
              console.log("Payment succeeded!");
              setShippingInfo(paymentIntent.shipping);
              // cartActions.clearCart();
              break;
            case "processing":
              console.log("Payment processing");
              break;
            case "requires_payment_method":
              console.log("Payment failed");
              break;
            default:
              console.log("Payment failed");
              break;
          }
        }
      });
    }
  }, [stripe]);

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
        <div className="lg:col-start-2">
          <h1 className="text-sm font-medium text-sky-400">
            Payment successful
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for ordering
          </p>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order, we’re currently processing it. So hang
            tight and we’ll send you confirmation very soon!
          </p>

          <dl className="mt-16 text-sm font-medium">
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="mt-2 text-sky-400">51547878755545848512</dd>
          </dl>

          {products.length > 0 ? (
            <>
              <ul
                role="list"
                className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
              >
                {products.map((product) => (
                  <li key={product.id} className="flex space-x-6 py-6">
                    {product.image && (
                      <Image
                        image={product.image}
                        layout="fixed"
                        width={160}
                        height={160}
                        className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                      />
                    )}
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">
                        <a href={product.slug}>{product.name}</a>
                      </h3>
                      <p>{product.size}</p>
                    </div>
                    <p className="flex-none font-medium text-gray-900">
                      {formatter.format(product.price)}
                    </p>
                    <div>{`x${product.quantity}`}</div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">
                    {formatter.format(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">{formatter.format(23.68)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">{formatter.format(22)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">
                    {formatter.format(subtotal + taxes + shippingRate)}
                  </dd>
                </div>
              </dl>
              <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping Address
                  </dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">{shippingInfo?.name}</span>
                      <span className="block">
                        {shippingInfo?.address?.line1}
                      </span>
                      <span className="block">
                        {shippingInfo?.address?.line2}
                      </span>
                      <span className="block">{`${shippingInfo?.address?.city}, ${shippingInfo?.address?.state} ${shippingInfo?.address?.country} ${shippingInfo?.address?.postal_code}`}</span>
                    </address>
                  </dd>
                </div>
              </dl>
              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <a
                  href="/"
                  className="text-sm font-medium text-sky-400 hover:text-sky-600"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </>
          ) : (
            <OrderedItemsSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderedItems;
