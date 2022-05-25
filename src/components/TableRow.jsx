import React from "react";

const TableRow = ({ shorturl, website, onEditClick, onDeleteClick }) => {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-1"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label htmlFor="checkbox-table-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
        <span title={website}>{website.substring(0, 30) + "..."}</span>
      </td>
      <td className="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-500 dark:text-white">
        {shorturl}
      </td>
      <td className="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
        📊 <button onClick={(_) => onEditClick()}>✎</button>{" "}
        <button onClick={(_) => onDeleteClick()}>🗑</button>
      </td>
    </tr>
  );
};

export default TableRow;
