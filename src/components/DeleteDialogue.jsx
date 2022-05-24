import React from "react";

const DeleteDialogue = () => {
  return (
    <div
      className="fixed flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 p-4 mb-4 text-sm text-red-500 bg-white rounded-lg dark:bg-red-800 dark:text-red-400"
      role="alert"
    >
      <svg
        className="w-full h-full dark:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <h3 className="text-lg text-center leading-6 mb-3">
        <span className="font-bold">Success!</span> Successfully deleted your
        short url.
      </h3>
    </div>
  );
};

export default DeleteDialogue;
