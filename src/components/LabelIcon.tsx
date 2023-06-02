import React from "react";
import { Image } from "@yext/pages/components";
import { Icon } from "../types/products";

interface IconLabelProps {
  icon: Icon;
}

const IconLabel = ({ icon }: IconLabelProps) => {
  return (
    <div className="flex items-center">
      <Image image={icon.c_icon} />
      <p className="ml-1 text-sm text-gray-500 text-left">{icon.name}</p>
    </div>
  );
};

export default IconLabel;
