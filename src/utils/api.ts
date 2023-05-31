import { PaymentIntent } from "@stripe/stripe-js";
import Ce_product from "../types/products";

export const fetchProducts = async (
  productIds: string[]
): Promise<{
  response: {
    docs: Omit<Ce_product, "c_terrain" | "c_abilityLevel">[];
    count: number;
  };
}> => {
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

export const fetchPaymentIntent = async (
  paymentId: string
): Promise<PaymentIntent> => {
  try {
    const url = `https://api.stripe.com/v1/payment_intents/${paymentId}`;
    const headers = {
      Authorization: `Bearer ${YEXT_PUBLIC_STRIPE_SK_KEY}`,
    };
    const response = await fetch(url, {
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch payment intent");
  }
};
