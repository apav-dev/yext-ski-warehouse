import { HeadlessConfig } from "@yext/search-headless-react";

// Search configuration used to initialize provider
export const getSearchProviderConfig = (
  verticalKey?: string,
  headlessId?: string
) => {
  let config: HeadlessConfig = {
    apiKey: YEXT_PUBLIC_SEARCH_API_KEY || "",
    experienceKey: "yext-ski-warehouse",
    locale: "en",
  };

  if (verticalKey) {
    config = {
      ...config,
      verticalKey,
    };
  }

  if (headlessId) {
    config = {
      ...config,
      headlessId,
    };
  }

  return config;
};
