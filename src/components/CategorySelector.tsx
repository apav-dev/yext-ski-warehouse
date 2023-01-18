import { ComplexImageType, Image } from "@yext/pages/components";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import InfoPanel from "./InfoPanel";

type SectionItem = {
  name: string;
  image: ComplexImageType;
  description?: string;
};

export type Section = {
  name: string;
  items: SectionItem[];
};

type ScrollingSelectorProps = {
  sections: Section[];
  scrollToStart: boolean;
};

const ScrollingSelector = ({
  sections,
  scrollToStart = false,
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
      [sectionIndex]: sections[sectionIndex].items[itemIndex].name,
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

  return (
    <>
      <div ref={containerRef} className="container mx-auto py-4 mb-[50vh]">
        <div className="text-center py-4">
          <h1 className="text-4xl font-bold tracking-tight text-sky-400 lg:text-6xl">
            Welcome to the Ski Finder
          </h1>
          <p className="mt-4 text-xl text-sky-400">
            Your answers to the following questions will help us recommend the
            best skis based on your skills and preferences.
          </p>
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
              {section.name}
            </h3>
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              {section.items.map((item, itemIndex) => (
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
                    <div className="aspect-w-3 aspect-h-2 max-w-[300px] ">
                      <Image
                        className="rounded-lg object-cover shadow-lg"
                        image={item.image}
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
            {section.items.some((item) => item.description) && (
              <div className="flex justify-center">
                <button
                  className={twMerge(
                    "mx-auto mt-8 inline-block rounded-md border border-sky-400 bg-white py-3 px-8 text-base font-medium text-sky-400 ",
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
