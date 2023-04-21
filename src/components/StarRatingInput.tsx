import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

export interface StarRatingInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  customCssClasses?: {
    starRatingInputContainer?: string;
  };
  label?: string;
}

const StarRatingInput = ({
  id,
  value,
  onChange,
  customCssClasses,
  label,
}: StarRatingInputProps) => {
  return (
    <div className={customCssClasses?.starRatingInputContainer}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label || id}
      </label>
      <div className={"flex items-center"}>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <button
              type="button"
              key={ratingValue}
              onClick={() => onChange(ratingValue)}
            >
              <span className="sr-only">{ratingValue} stars</span>
              {value >= ratingValue ? (
                <StarIcon
                  className="w-10 h-10 sm:w-16 sm:h-16 text-yellow-400"
                  aria-hidden="true"
                />
              ) : (
                <StarIcon
                  className="w-10 h-10 sm:w-16 sm:h-16 text-gray-300"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarRatingInput;
