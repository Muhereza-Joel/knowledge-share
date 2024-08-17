import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage,
  onFetchMoreData, // New prop for dispatching the request
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onNextPage();
      if (currentPage === totalPages - 1) {
        onFetchMoreData(currentPage + 1);
      }
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 10;
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
    let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow);

    if (currentPage <= halfMaxPageNumbersToShow) {
      endPage = Math.min(totalPages, maxPageNumbersToShow);
    }

    if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => onPageChange(i)}
          className={`page-link ${currentPage === i ? 'active' : ''}`}
          style={{ cursor: "pointer", border: "1px solid #fff" }}
        >
          <a>{i}</a>
        </li>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(<li key="start-ellipsis" className="page-link">...</li>);
    }

    if (endPage < totalPages) {
      pageNumbers.push(<li key="end-ellipsis" className="page-link">...</li>);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination pagination-sm">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className="page-link text-success"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="page-link text-success"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;