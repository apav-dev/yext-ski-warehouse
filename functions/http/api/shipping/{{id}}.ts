class Response {
  body: string;
  headers: any;
  statusCode: number;

  constructor(body: string, headers: any, statusCode: number) {
    this.body = body;
    this.headers = headers || {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173",
    };
    this.statusCode = statusCode;
  }
}

interface ShippingInfo {
  arrivalDate: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

const fetchShippingInfoForOrder = async (request) => {
  const { pathParams, method } = request;

  const paymentIntentId = pathParams.id;

  switch (method) {
    case "GET":
      break;
    default:
      return new Response("Method not allowed", null, 405);
  }

  const paymentIntent = await fetchPaymentIntent(paymentIntentId);
  const arrivalDate = getArrivalDate(paymentIntent.created);
  const shippingAddress = paymentIntent.shipping.address;

  const shippingInfo: ShippingInfo = {
    arrivalDate,
    shippingAddress,
  };

  return new Response(JSON.stringify(shippingInfo), null, 200);
};

export default fetchShippingInfoForOrder;

export const fetchPaymentIntent = async (paymentId: string) => {
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

const getArrivalDate = (unixTimestamp: number) => {
  // take the unix timestamp and add 5 days to it
  const arrivalDate = new Date(unixTimestamp * 1000);
  arrivalDate.setDate(arrivalDate.getDate() + 5);
  return arrivalDate.toLocaleDateString();
};
