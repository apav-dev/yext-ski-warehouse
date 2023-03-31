import React from "react";
import {
  DirectAnswer,
  Pagination,
  SearchBar,
  SectionProps,
  UniversalResults,
} from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";
import ArticleCard from "./ArticleCard";
import VideoCard from "./VideoCard";
import FaqCard from "./FaqCard";

const GridSection = ({ results, CardComponent, header }: SectionProps<T>) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }

  return (
    <>
      {header}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {results.map((r) => (
          <CardComponent key={r.id} result={r} />
        ))}
      </div>
    </>
  );
};

const ListSection = ({ results, CardComponent, header }: SectionProps<T>) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }

  return (
    <>
      {header}
      <div className="space-y-4">
        {results.map((r) => (
          <CardComponent key={r.id} result={r} />
        ))}
      </div>
    </>
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
      faqs: 3,
    });
  }, []);

  return (
    <>
      <div className="py-8">
        <SearchBar />
      </div>
      <DirectAnswer />
      {/* TODO: ask Slapshot about this interface */}
      <UniversalResults
        verticalConfigMap={{
          help_articles: {
            SectionComponent: ({ results, verticalKey }) => (
              <GridSection
                results={results}
                CardComponent={ArticleCard}
                verticalKey={verticalKey}
                header={
                  <h2 className="text-2xl font-semibold text-sky-400">
                    Articles
                  </h2>
                }
              />
            ),
            CardComponent: ArticleCard,
          },
          videos: {
            label: "Videos",
            SectionComponent: ({ results, verticalKey }) => (
              <GridSection
                results={results}
                CardComponent={VideoCard}
                verticalKey={verticalKey}
                header={
                  <h2 className="text-2xl font-semibold text-sky-400">
                    Videos
                  </h2>
                }
              />
            ),
            CardComponent: VideoCard,
          },
          faqs: {
            label: "Faqs",
            SectionComponent: ({ results, verticalKey }) => (
              <ListSection
                results={results}
                CardComponent={FaqCard}
                verticalKey={verticalKey}
                header={
                  <h2 className="text-2xl font-semibold text-sky-400">FAQs</h2>
                }
              />
            ),
            CardComponent: FaqCard,
          },
        }}
      />
    </>
  );
};

export default SupportResults;
