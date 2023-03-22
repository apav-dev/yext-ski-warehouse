import React, { Suspense, useEffect, useState } from "react";
import { StyledComponents } from "./StyledComponents";
import { ComplexImageType, Image } from "@yext/pages/components";
// Import reactmarkdown lazily
const ReactMarkdown = React.lazy(() => import("react-markdown"));

export type BlogPostProps = {
  title?: string;
  datePosted?: string;
  author?: {
    name: string;
    headshot?: ComplexImageType;
  };
  content: string;
};

export const BlogPost = ({
  title,
  datePosted,
  author,
  content,
}: BlogPostProps) => {
  const [showContent, setShowContent] = useState(false);

  // format date as "Month Day, Year"
  const formatDate = (date?: string) => {
    if (!date) {
      return "";
    }

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (window) {
      setShowContent(true);
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-4xl lg:gap-x-8 lg:px-8">
      <h1 className="prose text-7xl text-sky-400 font-bold my-6">{title}</h1>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {author?.headshot && (
            <Image className="h-10 w-10 rounded-full" image={author.headshot} />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium prose">{author?.name}</p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <p>{formatDate(datePosted)}</p>
          </div>
        </div>
      </div>
      <Suspense fallback="">
        <ReactMarkdown components={StyledComponents}>{content}</ReactMarkdown>
      </Suspense>
    </div>
  );
};

export default BlogPost;
