import React from "react";

const SuccessDialogue = () => {
  return (
    <div
      className="fixed flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 p-4 mb-4 text-sm text-green-700 bg-white rounded-lg dark:bg-green-200 dark:text-green-800"
      role="alert"
    >
      <svg
        className="w-full h-full dark:text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 className="text-lg text-center leading-6 mb-3">
        <span className="font-bold">Success!</span> Successfully submitted your
        short url.
      </h3>
    </div>
  );
};

export default SuccessDialogue;
