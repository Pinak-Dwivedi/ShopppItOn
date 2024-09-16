import { useSearchParams } from "react-router-dom";
import "./Pagination.css";

export default function Pagination(paginationProps) {
  const { paginationDetails, onPrevPage, onNextPage, onPageNum } =
    paginationProps;

  const [searchParams] = useSearchParams();

  const pageNum = isNaN(parseInt(searchParams.get("page")))
    ? 1
    : parseInt(searchParams.get("page"));

  let totalItems, itemsPerPage, paginationNumbers, paginationNumbersCount;

  if (paginationDetails != null) {
    totalItems = paginationDetails?.totalItems;
    itemsPerPage = paginationDetails?.itemsPerPage;

    paginationNumbers = [];

    paginationNumbersCount = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= paginationNumbersCount; i++) {
      paginationNumbers.push(
        <div
          key={i}
          className={`pagination__numberButtons ${
            pageNum === i ? "active" : ""
          }`}
          onClick={() => toPageNum(i)}
        >
          {i}
        </div>
      );
    }
  }

  function prevPage() {
    let newPageNum = pageNum;

    if (pageNum === 1) return;

    --newPageNum;

    onPrevPage(newPageNum);
  }

  function nextPage() {
    let newPageNum = pageNum;

    if (pageNum === paginationNumbersCount) return;

    ++newPageNum;

    onNextPage(newPageNum);
  }

  function toPageNum(pNum) {
    onPageNum(pNum);
  }

  return paginationDetails?.pageNum != null ? (
    <div className="pagination">
      <button
        className="pagination__previousButton"
        onClick={prevPage}
        disabled={pageNum === 1}
      >
        &lt;
      </button>
      {paginationNumbers}
      <button
        className="pagination__nextButton"
        onClick={nextPage}
        disabled={pageNum === paginationNumbersCount}
      >
        &gt;
      </button>
    </div>
  ) : (
    ""
  );
}
