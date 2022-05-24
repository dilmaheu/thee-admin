import React from "react";

const FailureDialogue = ({ failMsg }) => {
  return (
    <div
      className="fixed flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 p-4 mb-4 text-sm text-red-700 bg-white rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <svg
        className="w-full h-full dark:text-red fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z" />
      </svg>
      <h3 className="text-lg text-center leading-6 mb-3">
        <span className="font-bold">Failure!</span>{" "}
        {failMsg ? failMsg : "Sorry something went wrong. Try again later"}
      </h3>
    </div>
  );
};

export default FailureDialogue;
