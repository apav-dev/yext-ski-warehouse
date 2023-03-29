import { Product } from "schema-dts";
import { JsonLd } from "react-schemaorg";
import React from "react";

interface ProductSchemaProps {
  name: string;
  description: string;
  photoGallery: { url: string }[];
  price: number;
}

export function ProductSchema({
  name,
  description,
  photoGallery,
  price,
}: ProductSchemaProps): JSX.Element {
  return (
    <JsonLd<Product>
      item={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: name,
        description: description,
        image:
          photoGallery && photoGallery.length > 0 ? photoGallery[0].url : "",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: price,
          priceCurrency: "USD",
        },
      }}
    />
  );
}
