import React, { useState } from "react";
import { CardProps } from "@yext/search-ui-react";
import Faq from "../../types/faqs";

const FaqCard = ({ result }: CardProps<Faq>) => {
  const faq = result.rawData;

  const [expanded, setExpanded] = useState(false);

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
          {/* chevron that turns upside down when card is expanded */}
          {/* TODO: expand and show answer on click */}
          {/* <button
            className="flex items-center justify-center w-8 h-8 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500"
            onClick={() => setExpanded(!expanded)}
          >
            <svg
              className={`w-4 h-4 transform transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                className="inline-flex"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button> */}
        </div>
        <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

export default FaqCard;
