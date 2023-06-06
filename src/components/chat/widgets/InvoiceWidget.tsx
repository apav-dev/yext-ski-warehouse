import React from "react";
import {
  Message,
  useChatActions,
  useChatState,
} from "@yext/chat-headless-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPaymentIntent, fetchProducts } from "../../../utils/api";
import { Image } from "@yext/pages/components";
import { formatter } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";
import { centsToDollars } from "../../../utils/centsToDollars";
import { Transition } from "@headlessui/react";

interface Order {
  id: string;
  paymentIntentId: string;
  date: string;
  items: {
    id: string;
    quantity: number;
    yextId: string;
  }[];
}

export interface InvoiceMessageProps {
  message: Message;
  paymentRecord: Order;
}

const InvoiceWidget = ({ paymentRecord }: InvoiceMessageProps) => {
  const chat = useChatActions();

  const context = useChatState((state) => state.meta.context);

  const productIds = paymentRecord.items.map(
    (item) => item.yextId.split("-")[0]
  );

  const productQuery = useQuery({
    queryKey: ["products", productIds],
    queryFn: () => fetchProducts(productIds || []),
  });

  const paymentIntentQuery = useQuery({
    queryKey: ["payment-intent", paymentRecord.paymentIntentId],
    queryFn: () => fetchPaymentIntent(paymentRecord.paymentIntentId),
    onSuccess: (data) => {
      chat.setContext({
        ...context,
        paymentIntentId: data.id,
      });
    },
  });

  const paymentAmount = paymentIntentQuery.data?.amount;
  const products = productQuery.data?.response.docs;

  // TODO: add order number to backend and display here
  return (
    <Transition
      show={true}
      appear={true}
      enter="transition-opacity duration-400"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="bg-white rounded-lg max-w-3xl">
        <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="sr-only">Recent orders</h2>
          <div className="space-y-20">
            <div key={paymentRecord.id}>
              <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:flex-none lg:gap-x-8">
                  <div className="flex justify-between sm:block">
                    <dt className="font-medium text-gray-900">Date placed</dt>
                    <dd className="sm:mt-1">
                      <time dateTime={paymentRecord.date}>
                        {formatDate(paymentRecord.date)}
                      </time>
                    </dd>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-gray-900">Order number</dt>
                    <dd className="sm:mt-1">WU88191111</dd>
                  </div>
                  {paymentAmount && (
                    <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                      <dt>Total amount</dt>
                      <dd className="sm:mt-1">
                        {centsToDollars(paymentAmount)}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                <caption className="sr-only">Products</caption>
                <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                  <tr>
                    <th scope="col" className="py-3 pr-8 font-normal ">
                      Product
                    </th>

                    <th
                      scope="col"
                      className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                    >
                      Price
                    </th>
                    <th scope="col" className="w-0 py-3 text-right font-normal">
                      Info
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td className="py-6 pr-8">
                        <div className="flex items-center">
                          {product.photoGallery && (
                            <Image
                              image={product.photoGallery[0]}
                              layout="fixed"
                              width={64}
                              height={64}
                              className="mr-6  rounded object-cover object-center"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="mt-1 sm:hidden">
                              {formatter.format(Number(product.c_price))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">
                        {formatter.format(Number(product.c_price))}
                      </td>

                      <td className="whitespace-nowrap py-6 text-right font-medium">
                        <a href={product.slug} className="text-sky-400">
                          View
                          <span className="hidden lg:inline"> Product</span>
                          <span className="sr-only">, {product.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default InvoiceWidget;
