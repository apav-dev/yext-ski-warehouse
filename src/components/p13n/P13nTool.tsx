import * as React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface P13nToolProps {
  open: boolean;
  onClick: () => void;
}

const P13nTool = ({ onClick, open }: P13nToolProps) => {
  return open ? (
    <div className="fixed left-4 bottom-24 right-left z-50">
      <div className="flex bg-white rounded-lg shadow-lg px-6 py-4">
        <button className="text-blue-400 hover:underline" onClick={onClick}>
          Personalize
        </button>
        <button
          className="ml-8 text-gray-500 hover:text-gray-500"
          onClick={onClick}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  ) : null;
};

export default P13nTool;
