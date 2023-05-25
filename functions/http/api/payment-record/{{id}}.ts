// TODO: see how I can create a path that looks like api/customers/{{id}}/payment-record/{{id}}

// Supabase configuration
const supabaseUrl = "https://hryiqhmtfhiobebqpqqc.supabase.co/rest/v1";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyeWlxaG10Zmhpb2JlYnFwcXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ5Mzc3MDgsImV4cCI6MjAwMDUxMzcwOH0.fZ9aTZ6EYt78fsibQxxVJEWptzcQnqWzYqqDQwZViAM";

interface PaymentRecord {
  firstName: string;
  lastName: string;
  items: {
    id: string;
    quantity: number;
  }[];
}

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

// TODO: Error Handling
// TODO: Validate no repeat of payment id
// TODO: Rollback if any of the inserts fail
const createPaymentRecord = async (request) => {
  const { pathParams, body, method } = request;

  switch (method) {
    case "POST":
      console.log("Hello from POST");
      break;
    default:
      return new Response("Method not allowed", null, 405);
  }

  const payment_intent_id = pathParams.id;

  const customerId = crypto.randomUUID();
  const paymentRecord: PaymentRecord = JSON.parse(body);

  try {
    // Upsert the customer record
    await upsertCustomer(customerId, paymentRecord);

    //   if (customerError) {
    //     console.error("Error upserting customer:", customerError);
    //     return new Response("Failed to upsert customer", null, 500);
    //   }

    // Insert the order record
    const order_id = crypto.randomUUID();
    await insertOrder(customerId, order_id, payment_intent_id);

    //   if (orderError) {
    //     console.error("Error inserting order:", orderError);
    //     return new Response("Failed to insert order", null, 500);
    //   }

    // Prepare the order items
    const orderItems = paymentRecord.items.map(({ id, quantity }) => ({
      order_id,
      yext_id: id,
      quantity: quantity,
    }));

    //   // Insert the order items
    await insertOrderItems(orderItems);

    //   if (orderItemsError) {
    //     console.error("Error inserting order items:", orderItemsError);
    //     return new Response("Failed to insert order items", null, 500);
    //   }

    return new Response("Payment record created successfully", null, 201);
  } catch (error) {
    console.error("Error creating payment record:", error);
    return new Response("Failed to create payment record", null, 500);
  }
};

export default createPaymentRecord;

async function upsertCustomer(
  customerId: string,
  paymentRecord: PaymentRecord
) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${supabaseKey}`);
  headers.set("apikey", supabaseKey);
  headers.set("Prefer", "resolution=merge-duplicates");

  const body = {
    id: customerId,
    first_name: paymentRecord.firstName,
    last_name: paymentRecord.lastName,
  };

  try {
    const response = await fetch(`${supabaseUrl}/customers`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    console.log("response:", response);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("Customer inserted successfully:", data);
  } catch (error) {
    console.error("Error inserting customer:", error);
  }
}

async function insertOrder(
  customer_id: string,
  order_id: string,
  payment_intent_id: string
) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${supabaseKey}`);
  headers.set("apikey", supabaseKey);
  headers.set("Prefer", "resolution=merge-duplicates");

  const body = { id: order_id, customer_id, payment_intent_id };

  try {
    const response = await fetch(`${supabaseUrl}/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    console.log("response:", response);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("Inserted Order:", data);
  } catch (error) {
    console.error("Error inserting order:", error);
  }
}

async function insertOrderItems(
  items: {
    order_id: string;
    yext_id: string;
    quantity: number;
  }[]
) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${supabaseKey}`);
  headers.set("apikey", supabaseKey);
  headers.set("Prefer", "resolution=merge-duplicates");

  const body = items;

  try {
    const response = await fetch(`${supabaseUrl}/order_items`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    console.log("response:", response);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("Inserted Order Items: ", data);
  } catch (error) {
    console.error("Error inserting order items: ", error);
  }
}
