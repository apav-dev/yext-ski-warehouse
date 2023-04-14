export const main = async (request) => {
  const response = await fetch("https://api.stripe.com/v1/payment_intents", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${YEXT_PUBLIC_STRIPE_SK_KEY}`,
    },
    body: new URLSearchParams({
      amount: 1099,
      currency: "usd",
      automatic_payment_methods: JSON.stringify({ enabled: true }),
    }),
  });

  const data = await response.json();

  // assuming the Stripe API response returns a "client_secret" field
  const clientSecret = data.client_secret;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ client_secret: clientSecret }),
  };
};
