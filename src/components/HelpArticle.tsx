import React, { Suspense } from "react";
import { StyledComponents } from "./StyledComponents";
import { ComplexImageType, Image } from "@yext/pages/components";
import NoSsr from "@mui/base/NoSsr";
// Import reactmarkdown lazily
const ReactMarkdown = React.lazy(() => import("react-markdown"));
import skiLiftUrl from "../assets/images/ski-lift.jpeg";

export type HelpArticleProps = {
  title?: string;
  subtitle?: string;
  coverPhoto?: ComplexImageType;
  datePosted?: string;
  content: string;
};

export const HelpArticle = ({
  title,
  subtitle,
  coverPhoto,
  datePosted,
  content,
}: HelpArticleProps) => {
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

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-4xl lg:gap-x-8 lg:px-8">
      <h1 className="prose text-7xl text-sky-400 font-bold my-6">{title}</h1>
      <p className="prose text-2xl text-gray-500 my-6">{subtitle}</p>
      <div className="flex items-center mb-4">
        <div className="flex space-x-1 text-sm text-gray-500">
          {formatDate(datePosted)}
        </div>
      </div>
      {coverPhoto && (
        <Image className="w-full h-full object-cover" image={coverPhoto} />
      )}
      <NoSsr>
        <Suspense fallback="">
          <ReactMarkdown components={StyledComponents}>{content}</ReactMarkdown>
        </Suspense>
      </NoSsr>
    </div>
  );
};

export default HelpArticle;
