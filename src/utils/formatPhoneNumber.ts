export const formatPhoneNumber = (phone: string) => {
  // format +11234567890 as (123) 456-7890
  return `(${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8)}`;
};
