import React from "react";
import Ce_blog from "../../types/blog";
import { CardProps } from "@yext/search-ui-react";
import { Image } from "@yext/pages/components";
import { formatDate } from "../../utils/formatDate";

const BlogCard = ({ result }: CardProps<Ce_blog>) => {
  const blog = result.rawData;

  return (
    <div key={blog.id} className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        {blog.c_coverPhoto ? (
          <Image
            image={blog.c_coverPhoto}
            aspectRatio={16 / 9}
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        ) : (
          <img
            src="/src/assets/images/ski-lift.jpeg"
            alt=""
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={blog.datePosted} className="text-gray-500">
            {formatDate(blog.datePosted || new Date().toISOString())}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-sky-400 group-hover:text-sky-700">
            <a href={blog.slug || "#"}>
              <span className="absolute inset-0" />
              {blog.name}
            </a>
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
            {blog.c_summary}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          {blog.c_author?.headshot ? (
            <Image
              className="inline-block h-10 w-10 rounded-full"
              image={blog.c_author.headshot}
              layout="aspect"
              aspectRatio={1}
            />
          ) : (
            <img
              className="inline-block h-10 w-10 rounded-full aspect-1"
              src="/src/assets/images/max.jpeg"
              alt=""
            />
          )}
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {blog.c_author?.name || "Max S."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
