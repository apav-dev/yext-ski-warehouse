import React from "react";
import Ce_HelpArticle from "../../types/help_articles";
import { CardProps } from "@yext/search-ui-react";
import { Image } from "@yext/pages/components";
import { formatDate } from "../../utils/formatDate";
import skiLiftUrl from "../../assets/images/ski-lift.jpeg";
import headshotUrl from "../../assets/images/max.jpeg";

const ArticleCard = ({ result }: CardProps<Ce_HelpArticle>) => {
  const article = result.rawData;

  return (
    <div key={article.id} className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        {article.c_coverPhoto ? (
          <Image
            image={article.c_coverPhoto}
            aspectRatio={16 / 9}
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        ) : (
          <img
            src={skiLiftUrl}
            alt=""
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={article.datePosted} className="text-gray-500">
            {formatDate(article.datePosted || new Date().toISOString())}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-sky-400 group-hover:text-sky-700">
            <a href={article.slug || "#"}>
              <span className="absolute inset-0" />
              {article.name}
            </a>
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
            {article.c_summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
