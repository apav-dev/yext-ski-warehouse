import React, { Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { ComplexImageType, Image } from "@yext/pages/components";
import FormTextArea from "../FormTextArea";
import FormInput from "../FormInput";

type ReviewSubmission = {
  entity: {
    id: string;
  };
  authorName: string;
  authorEmail: string;
  title: string;
  rating: number;
  content: string;
  status: "LIVE" | "QUARANTINED" | "REMOVED";
  date: string;
};

const submitReview = async (review: ReviewSubmission) => {
  const response = await fetch(
    `https://liveapi.yext.com/v2/accounts/me/reviewSubmission?api_key=${YEXT_PUBLIC_REVIEW_SUBMISSION_API_KEY}&v=20221113`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }
  );
  return response.json();
};

type ReviewSubmissionFormProps = {
  entityId: string;
  entityName?: string;
  entityImage?: ComplexImageType;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ReviewSubmissionForm = ({
  entityId,
  entityName,
  entityImage,
  open,
  setOpen,
}: ReviewSubmissionFormProps) => {
  const [authorName, setAuthorName] = React.useState("");
  const [authorEmail, setAuthorEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [content, setContent] = React.useState("");

  const reviewSubmissionMutation = useMutation({
    mutationFn: submitReview,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review: ReviewSubmission = {
      entity: {
        id: entityId,
      },
      authorName,
      authorEmail,
      title,
      rating,
      content,
      status: "LIVE",
      date: new Date().toISOString(),
    };
    reviewSubmissionMutation.mutate(review);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div>
                <form
                  action="#"
                  method="POST"
                  className="px-6 pb-24 pt-20 sm:pb-32  lg:px-12 bg-white py-8 rounded-lg"
                >
                  <h1 className="text-left text-2xl text-gray-900 font-semibold">
                    Create a Review
                  </h1>
                  <div className="flex py-4 border-b-2 my-4">
                    {entityImage && (
                      <div className="flex items-center justify-center">
                        <Image image={entityImage} className="w-24 h-24 " />
                      </div>
                    )}
                    <p className="text-gray-900 text-sm ">{entityName}</p>
                  </div>
                  <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                      <FormInput
                        customCssClasses={{
                          formInputContainer: "sm:col-span-2",
                        }}
                        label="Name"
                      />
                      <FormInput
                        customCssClasses={{
                          formInputContainer: "sm:col-span-2",
                        }}
                        label="Email"
                      />
                      <FormInput
                        customCssClasses={{
                          formInputContainer: "sm:col-span-2",
                        }}
                        label="Title"
                      />
                      <FormTextArea
                        customCssClasses={{
                          formTextAreaContainer: "sm:col-span-2",
                        }}
                        label="Review"
                      />
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        className="rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ReviewSubmissionForm;
