import * as React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { v4 as uuid } from "uuid";
import HalfStarIcon from "./icons/HalfStarIcon";

interface StarsProps {
  rating: number;
  starSize?: number;
}

export const Stars = ({ rating }: StarsProps) => {
  return (
    <div className="flex text-orange">
      {/* tailwind class to move stars to the left a half px:  */}

      {[...Array(Math.floor(rating))].map((_) => (
        <StarIcon key={uuid()} className="text-yellow-400 h-5 w-5" />
      ))}
      {rating % 1 >= 0.5 && <HalfStarIcon />}
    </div>
  );
};
