import React, { useCallback, useMemo } from "react";
import randomAlphaNumeric from "../utils/randomAlphaNumeric";

const Pagination = ({
  selectNo,
  shortUrlTotal,
  entriesToDisplay,
  handleClick,
}) => {
  const handleActive = (active) => {
    if (active) {
      return "active-pagination";
    }
    return "regular-pagination";
  };

  const paginationMaxNo = useMemo(
    () =>
      shortUrlTotal > entriesToDisplay
        ? Math.ceil(shortUrlTotal / entriesToDisplay)
        : 1,
    [shortUrlTotal, entriesToDisplay]
  );

  const renderPaginationNumbers = useCallback(() => {
    return Array.from({ length: paginationMaxNo }, (_, index) => (
      <li key={randomAlphaNumeric(6)}>
        <button
          className={
            selectNo == index + 1
              ? "pointer-events-none"
              : "pointer-events-auto"
          }
          onClick={() => handleClick(index + 1)}
        >
          <a href="#" className={handleActive(selectNo == index + 1)}>
            {index + 1}
          </a>
        </button>
      </li>
    ));
  }, [selectNo, shortUrlTotal, entriesToDisplay]);

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              className={selectNo < 2 ? " pointer-events-none" : ""}
              onClick={(_) => handleClick(selectNo - 1)}
            >
              <a href="#" className="regular-pagination rounded-l-lg">
                Previous
              </a>
            </button>
          </li>
          {renderPaginationNumbers()}
          <li>
            <button
              className={
                selectNo == paginationMaxNo
                  ? " pointer-events-none"
                  : "pointer-events-auto"
              }
              onClick={(_) => handleClick(selectNo + 1)}
            >
              <a href="#" className="regular-pagination rounded-r-lg">
                Next
              </a>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
