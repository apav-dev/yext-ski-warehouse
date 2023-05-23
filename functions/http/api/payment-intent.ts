const stripeUrl = "https://api.stripe.com/v1/payment_intents";
const currency = "usd";
const automaticPaymentMethodsEnabled = "true";

const responseHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:5173",
};

const paymentIntent = async (request) => {
  const { queryParams } = request;

  // in a real app, you would want to determine the amount on the server
  const amount = queryParams.amount;
  if (!amount) {
    return {
      statusCode: 400,
      headers: responseHeaders,
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

  const response = await fetch(stripeUrl, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(YEXT_PUBLIC_STRIPE_SK_KEY),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const data = await response.json();

  const clientSecret = data.client_secret;

  console.log(data);

  if (!clientSecret) {
    console.error(data.error.message);
    return {
      statusCode: 500,
      headers: responseHeaders,
      body: "Payment intent creation failed",
    };
  }

  return {
    statusCode: 200,
    headers: responseHeaders,
    body: JSON.stringify({ client_secret: clientSecret }),
  };
};

export default paymentIntent;
