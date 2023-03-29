import { urlWritebackPlugin } from "https://deno.land/x/yextpages@plugins@1.0.0-beta.3/mod.ts";

const pageUrlCustomField = "c_deployedURL";
const API_KEY = "2f23ea7012a0ae61f1a18e22c9320479";

export const main = urlWritebackPlugin({
  field: pageUrlCustomField,
  apiKey: API_KEY,
  environment: "prod",
  v: "20221010",
});
