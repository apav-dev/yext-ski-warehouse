import React from "react";
import { FaSnowflake } from "react-icons/fa";
import { Transition } from "@headlessui/react";

const LoadingBubble = () => {
  return (
    <Transition
      show={true}
      appear={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="w-fit flex gap-1 rounded-3xl p-3 text-[8px] text-gray-500 bg-gray-100"
    >
      <FaSnowflake
        className="animate-bounce text-sky-400"
        style={{ animationDelay: "0ms" }}
      />
      <FaSnowflake
        className="animate-bounce text-sky-400"
        style={{ animationDelay: "300ms" }}
      />
      <FaSnowflake
        className="animate-bounce text-sky-400"
        style={{ animationDelay: "600ms" }}
      />
    </Transition>
  );
};

export default LoadingBubble;
