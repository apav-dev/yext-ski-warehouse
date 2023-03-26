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
import Header from "../components/Header";
import Main from "../layouts/Main";
import { transformSiteData } from "../utils/transformSiteData";
import BlogPost from "../components/BlogPost";

export const config: TemplateConfig = {
  stream: {
    $id: "blogs",
    fields: [
      "id",
      "name",
      "c_blogContent",
      "c_generatedBlogContent",
      "c_keywords",
      "c_metaDescription",
      "c_subtitle",
      "c_author",
      "datePosted",
      "slug",
      "c_coverPhoto",
    ],
    filter: {
      entityTypes: ["ce_blog"],
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
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.c_metaDescription,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "keywords",
          content: document.c_keywords,
        },
      },
    ],
  };
};

const Blog = ({ document }: TemplateRenderProps) => {
  const {
    _site,
    name,
    c_author,
    c_blogContent,
    c_generatedBlogContent,
    datePosted,
    c_coverPhoto,
    c_subtitle,
  } = document;

  const markdown = c_generatedBlogContent?.markdown || c_blogContent?.markdown;

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>
      {markdown && (
        <BlogPost
          title={name}
          subtitle={c_subtitle}
          content={markdown}
          author={c_author}
          datePosted={datePosted}
          coverPhoto={c_coverPhoto}
        />
      )}
    </Main>
  );
};

export default Blog;
