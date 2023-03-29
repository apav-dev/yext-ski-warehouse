import { Blog } from "schema-dts";
import { JsonLd } from "react-schemaorg";
import React from "react";
import { ComplexImageType } from "@yext/pages/components";

interface BlogSchemaProps {
  title?: string;
  subtitle?: string;
  datePosted?: string;
  author?: {
    name: string;
    headshot?: ComplexImageType;
  };
}

export function BlogSchema({
  title,
  subtitle,
  datePosted,
  author,
}: BlogSchemaProps): JSX.Element {
  return (
    <JsonLd<Blog>
      item={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name: title,
        description: subtitle,
        datePublished: datePosted,
        author: {
          "@type": "Person",
          name: author?.name,
          image: {
            "@type": "ImageObject",
            url: author?.headshot?.image?.url || "",
          },
        },
      }}
    />
  );
}
