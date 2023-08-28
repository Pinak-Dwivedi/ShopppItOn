import "./Review.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviewsThunk,
  createProductReviewThunk,
} from "../../../redux/slices/productSlice";
import { FaStar } from "react-icons/fa";
import ReviewUser from "./reviewUser/ReviewUser";
import Pagination from "../../pagination/Pagination";

export default function Review({ productId }) {
  const addReviewFormRef = useRef();

  function toggleAddReviewForm() {
    addReviewFormRef.current.classList.toggle("active");
  }

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const dispatch = useDispatch();
  const { reviewsDetails, validationError } = useSelector(
    (state) => state.product
  );
  const shouldMakeGetProductReviewsRequest = useRef(true);

  useEffect(() => {
    if (shouldMakeGetProductReviewsRequest.current === true) {
      dispatch(getProductReviewsThunk({ productId, query: "page=1" }));

      return () => {
        shouldMakeGetProductReviewsRequest.current = false;
      };
    }
  }, [dispatch, productId]);

  function giveReview(e) {
    e.preventDefault();

    dispatch(
      createProductReviewThunk({
        productId,
        reviewData: {
          title: reviewTitle,
          description: reviewDescription,
          rating: reviewRating,
        },
      })
    );
  }

  function onPrevPage(newPageNum) {
    dispatch(
      getProductReviewsThunk({ productId, query: `page=${newPageNum}` })
    );
  }

  function onNextPage(newPageNum) {
    dispatch(
      getProductReviewsThunk({ productId, query: `page=${newPageNum}` })
    );
  }

  function onPageNum(pNum) {
    dispatch(getProductReviewsThunk({ productId, query: `page=${pNum}` }));
  }

  return (
    <div className="review">
      <button
        className="review__toggleReviewFormButton"
        onClick={toggleAddReviewForm}
      >
        Give Review
      </button>

      <div ref={addReviewFormRef} className="review__addReviewFormConatiner">
        <div className="review__addReviewFormHeading">Give Review</div>

        <form className="review__addReviewForm" onSubmit={(e) => giveReview(e)}>
          <fieldset className="review__fieldset">
            <legend className="review__fieldsetTitle">Your Rating</legend>
            <div className="review__ratingButtons">
              <div
                className={`review__ratingButton ${
                  reviewRating === 5 ? "active" : ""
                }`}
                onClick={() => setReviewRating(5)}
              >
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
              </div>
              <div
                className={`review__ratingButton ${
                  reviewRating === 4 ? "active" : ""
                }`}
                onClick={() => setReviewRating(4)}
              >
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
              </div>
              <div
                className={`review__ratingButton ${
                  reviewRating === 3 ? "active" : ""
                }`}
                onClick={() => setReviewRating(3)}
              >
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
              </div>
              <div
                className={`review__ratingButton ${
                  reviewRating === 2 ? "active" : ""
                }`}
                onClick={() => setReviewRating(2)}
              >
                <FaStar className="product__ratingStarIcon" />
                <FaStar className="product__ratingStarIcon" />
              </div>
              <div
                className={`review__ratingButton ${
                  reviewRating === 1 ? "active" : ""
                }`}
                onClick={() => setReviewRating(1)}
              >
                <FaStar className="product__ratingStarIcon" />
              </div>
            </div>
            <span className="review__addReviewFormError">
              {validationError?.rating}
            </span>
          </fieldset>

          <fieldset className="review__fieldset">
            <legend className="review__fieldsetTitle">Review Title</legend>
            <input
              type="text"
              className="review__ratingTitle"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="e.g:- Product Title"
            />
            <span className="review__addReviewFormError">
              {validationError?.title}
            </span>
          </fieldset>

          <fieldset className="review__fieldset">
            <legend className="review__fieldsetTitle">
              Review Description
            </legend>
            <textarea
              className="review__ratingDescription"
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              placeholder="e.g:- Product Description"
            ></textarea>
            <span className="review__addReviewFormError">
              {validationError?.description}
            </span>
          </fieldset>

          <button className="review__addReviewFormButton">Add Review</button>
        </form>
      </div>

      <div className="review__heading">Product Reviews</div>

      <div className="review__list">
        {reviewsDetails?.reviews != null ? (
          reviewsDetails?.reviews.map((review) => (
            <ReviewUser key={review?.reviewId} reviewDetails={review} />
          ))
        ) : (
          <div className="review__noReviewsYet">No Reviews Yet!</div>
        )}
      </div>
      {reviewsDetails?.reviewsPagination != null ? (
        <Pagination
          paginationDetails={{
            pageNum: reviewsDetails?.reviewsPagination?.pageNum,
            totalItems: reviewsDetails?.reviewsPagination?.totalReviews,
            itemsPerPage: reviewsDetails?.reviewsPagination?.reviewsPerPage,
          }}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onPageNum={onPageNum}
        />
      ) : (
        ""
      )}
    </div>
  );
}
