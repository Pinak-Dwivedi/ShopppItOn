import "./Pagination.css";
import { useState } from "react";

export default function Pagination(paginationProps) {
  const { paginationDetails, onPrevPage, onNextPage, onPageNum } =
    paginationProps;

  const [pageNum, setPageNum] = useState(
    paginationDetails == null ? 1 : paginationDetails?.pageNum
  );

  let totalItems, itemsPerPage, paginationNumbers, paginationNumbersCount;

  if (paginationDetails != null) {
    totalItems = paginationDetails?.totalItems;
    itemsPerPage = paginationDetails?.itemsPerPage;

    paginationNumbers = [];

    paginationNumbersCount = Math.ceil(totalItems / itemsPerPage);

    for (let i = 0; i < paginationNumbersCount; i++) {
      paginationNumbers.push(
        <div
          key={i + 1}
          className={`pagination__numberButtons ${
            pageNum === i + 1 ? "active" : ""
          }`}
          onClick={() => toPageNum(i + 1)}
        >
          {i + 1}
        </div>
      );
    }
  }

  function prevPage() {
    let newPageNum = pageNum;
    if (pageNum === 1) {
      newPageNum = paginationNumbersCount;
      setPageNum(newPageNum);
    } else {
      --newPageNum;
      setPageNum(newPageNum);
    }

    onPrevPage(newPageNum);
  }

  function nextPage() {
    let newPageNum = pageNum;
    if (pageNum === paginationNumbersCount) {
      newPageNum = 1;
      setPageNum(newPageNum);
    } else {
      ++newPageNum;
      setPageNum(newPageNum);
    }

    onNextPage(newPageNum);
  }

  function toPageNum(pNum) {
    setPageNum(pNum);

    onPageNum(pNum);
  }

  return paginationDetails?.pageNum != null ? (
    <div className="pagination">
      <div className="pagination__previousButton" onClick={prevPage}>
        &lt;
      </div>
      {paginationNumbers}
      <div className="pagination__nextButton" onClick={nextPage}>
        &gt;
      </div>
    </div>
  ) : (
    ""
  );
}
