import React, { useState, useCallback } from "react";
import axios from "axios";

import FailureDialogue from "./FailureDialogue";
import DeleteDialogue from "./DeleteDialogue";

const DeleteShortUrl = ({ keyValue, setShow, setIsDelete, refreshUrls }) => {
  const [showDialogue, setShowDialogue] = useState("");

  const handleClick = async () => {
    await axios
      .delete(`https://deleteshorturl.dilmah.workers.dev/${keyValue.key}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((_) => {
        setShowDialogue("success");
        setTimeout(() => {
          setShow(false);
          setIsDelete(false);
          refreshUrls();
        }, 5000);
      })
      .catch((_) => {
        setShowDialogue("fail");
        setTimeout(() => setShowDialogue(""), 5000);
      });
  };

  const renderDialogue = useCallback(() => {
    if (showDialogue == "success") return <DeleteDialogue />;
    if (showDialogue == "fail") return <FailureDialogue />;
    return null;
  }, [showDialogue]);

  return (
    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
      <div className="dialogue-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="w-full">
            <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
              <div className="mb-6">
                <p>
                  Confirm you want to delete{" \n"}
                  {`${keyValue.key} - ${keyValue.value}`}
                </p>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(_) => handleClick()}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(_) => setShow(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderDialogue()}
    </div>
  );
};

export default DeleteShortUrl;
