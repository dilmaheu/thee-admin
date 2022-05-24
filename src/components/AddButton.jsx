import React from "react";

const AddButton = ({ handleClick }) => {
  return (
    <div className="float-right pt-6">
      <button
        onClick={(_) => handleClick()}
        className="inline-flex items-center justify-center w-10 h-10 mr-2 text-white transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default AddButton;
