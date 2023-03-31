import React from "react";
import {
  DirectAnswer,
  Pagination,
  SearchBar,
  SectionProps,
  StandardCard,
  StandardSection,
  UniversalResults,
} from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";
import ArticleCard from "./ArticleCard";
import VideoCard from "./VideoCard";

const GridSection = ({ results, CardComponent, header }: SectionProps<T>) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }

  return (
    <div>
      <div>{header}</div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {results.map((r) => (
          <CardComponent key={r.id} result={r} />
        ))}
      </div>
    </div>
  );
};

const SupportResults = () => {
  const searchActions = useSearchActions();

  useEffect(() => {
    searchActions.setUniversal();
    searchActions.setUniversalLimit({
      help_articles: 3,
      videos: 3,
      products: 0,
      blog: 0,
      locations: 0,
    });
  }, []);

  return (
    <>
      <div className="py-8">
        <SearchBar />
      </div>
      <DirectAnswer />
      <UniversalResults
        verticalConfigMap={{
          help_articles: {
            label: "Articles",
            SectionComponent: GridSection,
            CardComponent: ArticleCard,
          },
          videos: {
            label: "Videos",
            SectionComponent: GridSection,
            CardComponent: VideoCard,
          },
          // help_articles: {
          //   label: "Our Products",
          //   SectionComponent: StandardSection,
          //   CardComponent: StandardCard,
          // },
        }}
      />
      <Pagination />
    </>
  );
};

export default SupportResults;
