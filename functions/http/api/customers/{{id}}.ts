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

interface CustomerOrderRecord {
  id: string;
  firstName?: string;
  lastName?: string;
  orders: {
    id: string;
    payment_intent_id: string;
    items: {
      id: string;
      quantity: number;
      yextId: string;
    }[];
  }[];
}

interface Order {
  id: string;
  customer_id: string;
  payment_intent_id: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  quantity: number;
  yext_id: string;
}

const supabaseUrl = "https://hryiqhmtfhiobebqpqqc.supabase.co/rest/v1";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyeWlxaG10Zmhpb2JlYnFwcXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ5Mzc3MDgsImV4cCI6MjAwMDUxMzcwOH0.fZ9aTZ6EYt78fsibQxxVJEWptzcQnqWzYqqDQwZViAM";

const fetchPaymentRecordsForCustomer = async (request) => {
  const { pathParams, method } = request;

  const customerId = pathParams.id;

  switch (method) {
    case "GET":
      break;
    default:
      return new Response("Method not allowed", null, 405);
  }

  const orders = await selectOrdersByCustomerId(customerId);

  const orderItems = await Promise.all(
    orders.map(async (order) => {
      return await selectOrderItemsByOrderId(order.id);
    })
  );

  // create list of orders containing items
  const customerOrderRecords: CustomerOrderRecord = {
    id: customerId,
    orders: orders.map((order, index) => {
      return {
        id: order.id,
        payment_intent_id: order.payment_intent_id,
        items: orderItems[index].map((item) => {
          return {
            id: item.id,
            quantity: item.quantity,
            yextId: item.yext_id,
          };
        }),
      };
    }),
  };

  return new Response(JSON.stringify(customerOrderRecords), null, 200);
};

export default fetchPaymentRecordsForCustomer;

const selectOrdersByCustomerId = async (
  customer_id: string
): Promise<Order[]> => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${supabaseKey}`);
  headers.set("apikey", supabaseKey);

  try {
    const response = await fetch(
      `${supabaseUrl}/orders?customer_id=eq.${customer_id}&select=*`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

const selectOrderItemsByOrderId = async (
  order_id: string
): Promise<OrderItem[]> => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${supabaseKey}`);
  headers.set("apikey", supabaseKey);

  try {
    const response = await fetch(
      `${supabaseUrl}/order_items?order_id=eq.${order_id}&select=*`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};
