import "./ReviewUser.css";
import { FaStar } from "react-icons/fa";

export default function ReviewUser({ reviewDetails }) {
  const ratingStars = [];

  if (reviewDetails != null) {
    for (let i = 0; i < reviewDetails.reviewRating; i++) {
      ratingStars.push(
        <FaStar key={i + 1} className="product__ratingStarIcon" />
      );
    }
  }

  return (
    <div className="reviewUser">
      <div className="reviewUser__imageBox">
        <img
          src={reviewDetails?.reviewUserProfileImage}
          alt="user"
          className="reviewUser__image"
        />
      </div>

      <div className="reviewUser__info">
        <div className="reviewUser__name">{reviewDetails?.reviewUserName}</div>
        <div className="reviewUser__rating">{ratingStars}</div>
        <div className="reviewUser__title">{reviewDetails?.reviewTitle}</div>
        <div className="reviewUser__description">
          {reviewDetails?.reviewDescription}
        </div>
      </div>
    </div>
  );
}
