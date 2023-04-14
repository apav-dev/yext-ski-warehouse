export const main = async (request) => {
  const response = await fetch("https://api.stripe.com/v1/payment_intents", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${YEXT_PUBLIC_STRIPE_SK_KEY}`,
    },
    body: {
      amount: 1099,
      currency: "usd",
      "automatic_payment_methods[enabled]": true,
    },
  });

  const data = await response.json();

  console.log(data);

  const clientSecret = data.client_secret;

  if (!clientSecret) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Payment intent creation failed" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ client_secret: clientSecret }),
  };
};
