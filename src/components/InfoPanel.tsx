import * as React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Section } from "./CategorySelector";

type InfoPanelProps = {
  infoPanelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  data?: Section;
};

const InfoPanel = ({ infoPanelOpen, setPanelOpen, data }: InfoPanelProps) => {
  return (
    <Transition.Root show={infoPanelOpen} as={Fragment}>
      <Dialog className="relative z-40 " onClose={setPanelOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setPanelOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <h2 className="px-4 pt-5 pb-2 text-xl font-bold text-sky-400">
                {data?.title}
              </h2>
              <p className="px-4">{data?.description}</p>
              <ul role="list">
                {data?.filterItems.map((item) => (
                  <li key={item.name} className="p-4">
                    <h3 className="font-bold text-sky-400 pb-1">{item.name}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default InfoPanel;
