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
    fields: ["id", "name", "c_blogContent", "c_author", "datePosted", "slug"],
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
  };
};

const Blog = ({ document }: TemplateRenderProps) => {
  const { _site, name, c_author, c_blogContent } = document;

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>
      <BlogPost
        title={name}
        content={c_blogContent.markdown}
        author={c_author}
        datePosted={document.datePosted}
      />
    </Main>
  );
};

export default Blog;
