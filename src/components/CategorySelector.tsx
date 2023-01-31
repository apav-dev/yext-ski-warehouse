import { ComplexImageType, Image } from "@yext/pages/components";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import InfoPanel from "./InfoPanel";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

type SectionItem = {
  name: string;
  primaryPhoto: ComplexImageType;
  description?: string;
};

export type Section = {
  title: string;
  filterId: string;
  description?: string;
  filterItems: SectionItem[];
};

type ScrollingSelectorProps = {
  title: string;
  description: string;
  sections: Section[];
  scrollToStart: boolean;
  onComplete?: (
    filters: {
      filterId: string;
      filterValue: string;
    }[]
  ) => void;
};

const ScrollingSelector = ({
  title,
  description,
  sections,
  scrollToStart = false,
  onComplete,
}: ScrollingSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<number, string>
  >({ 0: "" });
  const [autoScrollOn, setAutoScrollOn] = useState(true);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [infoPanelData, setInfoPanelData] = useState<Section>();

  useEffect(() => {
    if (scrollToStart && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [scrollToStart]);

  const handleButtonClick = (itemIndex: number, sectionIndex: number) => {
    if (autoScrollOn && sectionsRef.current[sectionIndex + 1]) {
      setTimeout(() => {
        sectionsRef.current[sectionIndex + 1].scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    }

    let newSelectedFilters = {
      ...selectedFilters,
      [sectionIndex]: sections[sectionIndex].filterItems[itemIndex].name,
    };

    if (
      !newSelectedFilters[sectionIndex + 1] &&
      sectionIndex < sections.length - 1
    ) {
      newSelectedFilters = {
        ...newSelectedFilters,
        [sectionIndex + 1]: "",
      };
    }

    if (sectionIndex === sections.length - 2) setAutoScrollOn(false);

    setSelectedFilters(newSelectedFilters);
  };

  const handleLearnMoreClick = (section: Section) => {
    setInfoPanelData(section);
    setInfoPanelOpen(true);
  };

  const handleNextClick = () => {
    if (onComplete) {
      const selectedFiltersArray = Object.keys(selectedFilters).map((key) => ({
        filterId: sections[parseInt(key)].filterId,
        filterValue: selectedFilters[parseInt(key)],
      }));
      onComplete(selectedFiltersArray);
    }
  };

  return (
    <>
      <div ref={containerRef} className="container mx-auto py-4 ">
        <div className="text-center py-4">
          <h1 className="text-4xl font-bold tracking-tight text-sky-400 lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-xl text-sky-400">{description}</p>
        </div>
        {sections?.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            ref={(el) =>
              (sectionsRef.current = el
                ? [...sectionsRef.current, el]
                : [...sectionsRef.current])
            }
            className={twMerge(
              "mb-16 max-w-4xl mx-auto opacity-40",
              Object.keys(selectedFilters).includes(sectionIndex.toString()) &&
                "opacity-100"
            )}
          >
            <h3 className="text-3xl text-center text-sky-400 font-bold py-4">
              {section.title}
            </h3>
            <p className="text-center text-sky-400">{section.description}</p>
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              {section.filterItems.map((item, itemIndex) => (
                <li
                  key={item.name}
                  onClick={() => handleButtonClick(itemIndex, sectionIndex)}
                >
                  <div
                    className={twMerge(
                      "space-y-4 p-4 border-4 rounded-lg border-transparent text-center",
                      Object.values(selectedFilters).includes(item.name) &&
                        "border-sky-400"
                    )}
                  >
                    <div className="aspect-w-3 aspect-h-2 max-w-[300px] mx-auto">
                      <Image
                        className="rounded-lg object-cover object-center  shadow-lg"
                        image={item.primaryPhoto}
                        loading="eager"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3 className="text-sky-400">{item.name}</h3>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* if any of the category items have a description show the button */}
            {section.filterItems.some((item) => item.description) && (
              <div className="flex justify-center">
                <button
                  className={twMerge(
                    "mx-auto mt-8 inline-block rounded-md border border-sky-400 bg-white py-3 px-8 text-base font-medium text-sky-400",
                    Object.keys(selectedFilters).includes(
                      sectionIndex.toString()
                    ) && "hover:bg-sky-400 hover:text-white"
                  )}
                  disabled={
                    !Object.keys(selectedFilters).includes(
                      sectionIndex.toString()
                    )
                  }
                  onClick={() => handleLearnMoreClick(section)}
                >
                  Learn More
                </button>
              </div>
            )}
          </section>
        ))}
        <div className="flex justify-center">
          <button
            disabled={Object.keys(selectedFilters).length !== sections.length}
            className={twMerge(
              "mx-auto flex mt-8 items-center rounded-full border border-sky-400  py-3 px-16 text-base font-medium text-white bg-sky-400 ",
              Object.keys(selectedFilters).length !== sections.length
                ? "opacity-50"
                : "hover:bg-sky-200 hover:text-blue-400"
            )}
            onClick={handleNextClick}
          >
            Next
            <ArrowSmallRightIcon className="h-5 w-5 ml-1" />
          </button>
        </div>
      </div>
      <InfoPanel
        infoPanelOpen={infoPanelOpen}
        setPanelOpen={setInfoPanelOpen}
        data={infoPanelData}
      />
    </>
  );
};

export default ScrollingSelector;
