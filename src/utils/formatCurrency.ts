// format the subtotal to be a currency
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
