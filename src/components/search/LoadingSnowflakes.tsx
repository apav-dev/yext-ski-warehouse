import React from "react";
import { BsSnow } from "react-icons/bs";

const LoadingSnowflakes = () => (
  // <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
  <div className="w-full h-96 z-50">
    <div className="relative w-full h-full">
      <div className="absolute top-0 w-full h-full overflow-hidden">
        <div className="animate-snowflakes ">
          <div className="flex space-x-14 justify-center">
            <BsSnow className="text-sky-400 h-10 w-10" />
            <BsSnow className="text-sky-400 h-10 w-10 mt-12" />
            <BsSnow className="text-sky-400 h-10 w-10" />
            <BsSnow className="text-sky-400 h-10 w-10 mt-12" />
          </div>
          <div className="flex space-x-14 justify-center">
            <BsSnow className="text-sky-400 h-10 w-10" />
            <BsSnow className="text-sky-400 h-10 w-10 mt-12" />
            <BsSnow className="text-sky-400 h-10 w-10" />
            <BsSnow className="text-sky-400 h-10 w-10 mt-12" />
          </div>
          {/* <BsSnow className="text-sky-400 h-10 w-10" />
          <BsSnow className="text-sky-400 h-10 w-10 mt-12" />
          <BsSnow className="text-sky-400 h-10 w-10" />
          <BsSnow className="text-sky-400 h-10 w-10 mt-12" /> */}
        </div>
      </div>
    </div>
  </div>
  // </div>s
);

export default LoadingSnowflakes;
