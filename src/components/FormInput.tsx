import React from "react";

type FormInputProps = {
  label?: string;
  placeholder?: string;
  customCssClasses?: {
    formInputContainer?: string;
  };
};

const FormInput = ({
  label,
  placeholder,
  customCssClasses,
}: FormInputProps) => {
  return (
    <div className={customCssClasses?.formInputContainer}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          aria-describedby="email-description"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        We'll only use this for spam.
      </p>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        Not a valid email address.
      </p>
    </div>
  );
};

export default FormInput;
