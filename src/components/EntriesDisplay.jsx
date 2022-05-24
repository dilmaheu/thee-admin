import React from "react";

const EntriesDisplay = ({ handleChange }) => {
  return (
    <div className="my-4">
      <label
        htmlFor="shorturl"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Entries to Display
      </label>
      <input
        type="number"
        id="entriesdisplay"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          if (e.target.value < 5) {
            e.target.value = 5;
          }
          if (e.target.value > 20) {
            e.target.value = 20;
          }
          handleChange(e.target.value);
        }}
        defaultValue={5}
        min={5}
        max={20}
        required=""
      />
    </div>
  );
};

export default EntriesDisplay;
