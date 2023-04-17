export const main = async (request) => {
  const url = "https://api.stripe.com/v1/payment_intents";
  const currency = "usd";
  const automaticPaymentMethodsEnabled = "true";

  const requestURL = request["requestUrl"];
  const params = new URLSearchParams(requestURL.split("?")[1]);

  // in a real app, you would want to determine the amount on the server
  const amount = params.get("amount");
  if (!amount) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: "Missing amount",
    };
  }

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

  const clientSecret = data.client_secret;

  if (!clientSecret) {
    console.error(data.error.message);
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
