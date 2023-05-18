import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SimpleSelector from "../SimpleSelector";
import { useP13nActions } from "./hooks/useP13nActions";
import { Gender } from "./providers/P13nProvider";
import { useP13nState } from "./hooks/useP13nState";

interface P13nHeaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const genders = [
  { value: "Not Specified" },
  { value: "Male" },
  { value: "Female" },
];

const P13nHeader = ({ isOpen, onClose }: P13nHeaderProps) => {
  const gender = useP13nState((state) => state.gender);

  const p13nActions = useP13nActions();

  const handleGenderChange = (item: { value: string; label?: string }) => {
    p13nActions.setGender(item.value as Gender);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <Dialog.Panel>
          <div className="bg-gray-500 bg-opacity-50 min-h-screen text-center z-30">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full z-50 h-16 px-4 space-x-12 text-left align-middle transition-all transform bg-white shadow-xl md:flex md:items-center">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
                >
                  Personalization
                </Dialog.Title>
                <SimpleSelector
                  label="Gender"
                  items={genders}
                  selectedItem={{ value: gender }}
                  onSelect={handleGenderChange}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default P13nHeader;
