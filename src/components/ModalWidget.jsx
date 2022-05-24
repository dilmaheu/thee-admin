import React, { useCallback } from "react";
import AddEditShortUrl from "./AddEditShortUrl";
import DeleteShortUrl from "./DeleteShortUrl";

const ModalWidget = ({ show, setShow, isDelete, refreshUrls, setIsDelete }) => {
  const renderContent = useCallback(() => {
    if (isDelete)
      return (
        <DeleteShortUrl
          keyValue={isDelete}
          setShow={setShow}
          setIsDelete={setIsDelete}
          refreshUrls={refreshUrls}
        />
      );
    if (show)
      return (
        <AddEditShortUrl
          setShow={setShow}
          show={show}
          refreshUrls={refreshUrls}
        />
      );
  }, [isDelete, show]);

  return (
    <div
      className={`relative z-10${show ? "" : " invisible"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ModalWidget;
