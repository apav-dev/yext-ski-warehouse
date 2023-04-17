import React, { useEffect, useState } from "react";
import { useCartState } from "./hooks/useCartState";
import { Image } from "@yext/pages/components";
import { formatter } from "../../utils/formatCurrency";
import { useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js/types/api/payment-intents";
import { Product } from "./providers/CartProvider";
import OrderedItemsSkeleton from "./OrderedItemsSkeleton";
import { useCartActions } from "./hooks/useCartActions";

const OrderedItems = () => {
  const cartState = useCartState();
  const cartActions = useCartActions();

  const [shippingInfo, setShippingInfo] =
    useState<PaymentIntent.Shipping | null>();
  const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const stripe = useStripe();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (cartState.products.length > 0) {
      setOrderedProducts(cartState.products);
      cartActions.clearCart();
    }
  }, [cartState.products]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (clientSecret) {
      // Retrieve the PaymentIntent
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        if (paymentIntent) {
          switch (paymentIntent.status) {
            case "succeeded":
              console.log("Payment succeeded!");
              setShippingInfo(paymentIntent.shipping);
              setSubtotal(
                cartState.products.reduce(
                  (acc, item) => acc + Number(item.price) * item.quantity,
                  0
                )
              );
              break;
            case "processing":
              console.log("Payment processing");
              setMessage(
                "Payment processing. We'll update you when payment is received."
              );
              break;

            case "requires_payment_method":
              console.log("Payment failed");
              // Redirect your user back to your payment page to attempt collecting
              // payment again
              setMessage("Payment failed. Please try another payment method.");
              break;

            default:
              setMessage("Something went wrong.");
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

          {orderedProducts.length > 0 ? (
            <>
              <ul
                role="list"
                className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
              >
                {orderedProducts.map((product) => (
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
                    {formatter.format(subtotal + 23.68 + 22)}
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
