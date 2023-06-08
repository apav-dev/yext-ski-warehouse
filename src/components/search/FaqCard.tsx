import React from "react";
import { CardProps } from "@yext/search-ui-react";
import Faq from "../../types/faqs";

const FaqCard = ({ result }: CardProps<Faq>) => {
  const faq = result.rawData;

  return (
    <div
      key={faq.id}
      className="flex flex-col items-start justify-between border border-gray-100 rounded-lg p-4 shadow-sm"
    >
      <div className="relative">
        <div className="flex justify-between">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-sky-400">
            <span className="absolute inset-0" />
            {faq.question}
          </h3>
        </div>
        <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

export default FaqCard;
