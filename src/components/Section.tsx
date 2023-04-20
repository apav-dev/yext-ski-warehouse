import React from "react";

export interface SectionProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const Section = ({ children, backgroundColor }: SectionProps) => {
  return (
    <section aria-labelledby="category-heading" className={backgroundColor}>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
