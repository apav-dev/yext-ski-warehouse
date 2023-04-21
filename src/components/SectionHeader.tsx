import React from "react";

export interface SectionHeaderProps {
  title?: string;
  cta?: {
    label: string;
    link: string;
  };
}
const SectionHeader = ({ title, cta }: SectionHeaderProps) => {
  return (
    <div className="sm:flex sm:items-baseline sm:justify-between">
      <h2
        id="category-heading"
        className="text-2xl font-bold tracking-tight text-sky-400"
      >
        {title || "Section Header"}
      </h2>
      {cta && (
        <a
          href={cta.link}
          className="hidden text-sm font-semibold text-sky-400 hover:text-sky-600 sm:block"
        >
          {cta.label}
          <span aria-hidden="true"> &rarr;</span>
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
