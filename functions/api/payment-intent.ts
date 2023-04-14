export const main = async (request) => {
  const url = "https://api.stripe.com/v1/payment_intents";
  const amount = "2000";
  const currency = "usd";
  const automaticPaymentMethodsEnabled = "true";

  const formData = new URLSearchParams();
  formData.append("amount", amount);
  formData.append("currency", currency);
  formData.append(
    "automatic_payment_methods[enabled]",
    automaticPaymentMethodsEnabled
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(YEXT_PUBLIC_STRIPE_SK_KEY),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
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
      body: "Payment intent creation failed",
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
