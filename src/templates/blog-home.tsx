import * as React from "react";
import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TemplateConfig,
  TransformProps,
} from "@yext/pages";
import { Image, Link } from "@yext/pages/components";
import Header from "../components/Header";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import { formatDate } from "../utils/formatDate";

export const config: TemplateConfig = {
  stream: {
    $id: "blog-home",
    fields: [
      "id",
      "slug",
      "c_headingText",
      "c_subHeadingText",
      "c_blogs.name",
      "c_blogs.c_author",
      "c_blogs.datePosted",
      "c_blogs.c_coverPhoto",
      "c_blogs.c_summary",
      "c_blogs.slug",
    ],
    filter: {
      entityIds: ["blog_home"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  const { _site } = data.document;

  return {
    ...data,
    document: {
      ...data.document,
      _site: transformSiteData(_site),
    },
  };
};

export const getPath: GetPath<TemplateRenderProps> = ({ document }) => {
  return document.slug ?? document.id;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const BlogHome = ({ document }: TemplateRenderProps) => {
  const { _site, c_headingText, c_subHeadingText, c_blogs } = document;

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-sky-400 sm:text-4xl">
              {c_headingText}
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {c_subHeadingText}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {c_blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex flex-col items-start justify-between"
              >
                <div className="relative w-full">
                  {blog.c_coverPhoto && (
                    <Image
                      image={blog.c_coverPhoto}
                      aspectRatio={16 / 9}
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                  )}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={blog.datePosted} className="text-gray-500">
                      {formatDate(blog.datePosted)}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-sky-400 group-hover:text-sky-700">
                      <Link href={blog.slug}>
                        <span className="absolute inset-0" />
                        {blog.name}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                      {blog.c_summary}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    {blog.c_author.headshot && (
                      <Image
                        className="inline-block h-10 w-10 rounded-full"
                        image={blog.c_author.headshot}
                        layout="aspect"
                        aspectRatio={1}
                      />
                    )}
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        {blog.c_author.name}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default BlogHome;
