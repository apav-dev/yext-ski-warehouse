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
import HelpArticle from "../components/HelpArticle";

export const config: TemplateConfig = {
  stream: {
    $id: "helpArticle",
    fields: [
      "id",
      "name",
      "c_subtitle",
      "c_summary",
      "datePosted",
      "slug",
      "c_coverPhoto",
      "c_helpArticleContent",
      "c_keywords",
      "c_metaDescription",
    ],
    filter: {
      entityTypes: ["ce_helpArticle"],
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

const Article = ({ document }: TemplateRenderProps) => {
  const {
    _site,
    name,
    datePosted,
    c_coverPhoto,
    c_subtitle,
    c_helpArticleContent,
  } = document;

  const markdown = c_helpArticleContent?.markdown;

  return (
    <Main>
      <div className="relative">
        <Header directory={_site} />
      </div>
      {markdown && (
        <HelpArticle
          title={name}
          subtitle={c_subtitle}
          content={markdown}
          datePosted={datePosted}
          coverPhoto={c_coverPhoto}
        />
      )}
    </Main>
  );
};

export default Article;
