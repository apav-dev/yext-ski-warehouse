import { Container } from "@mui/material";
import React from "react";

type FormTextAreaProps = {
  label?: string;
  customCssClasses?: {
    formTextAreaContainer?: string;
  };
};

const FormTextArea = ({ label, customCssClasses }: FormTextAreaProps) => {
  return (
    <div className={customCssClasses?.formTextAreaContainer}>
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:py-1.5 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
    </div>
  );
};

export default FormTextArea;
