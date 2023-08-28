import "./ProductListProduct.css";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import formatNumberAsPrice from "../../../utils/formatNumberAsPrice";

export default function ProductListProduct({ productInfo }) {
  const {
    productId,
    productName,
    productPrice,
    productCategory,
    productRating,
    productImages,
  } = productInfo;

  let productImage;
  if (productImages != null) productImage = JSON.parse(productImages)[0];

  const navigate = useNavigate();

  function gotoProductPage() {
    navigate(`/product/${productName.split(" ").join("-")}`, {
      state: {
        productId,
      },
    });
  }

  return (
    <div className="productListProduct" onClick={gotoProductPage}>
      <div className="productListProduct__imageContainer">
        <img
          className="productListProduct__image"
          src={productImage}
          alt="product"
        />
      </div>
      <div className="productListProduct__info">
        <div className="productListProduct__category">{productCategory}</div>
        <div className="productListProduct__name">{productName}</div>
        <div className="productListProduct__price">
          {formatNumberAsPrice(productPrice)}
        </div>
        <div className="productListProduct__rating">
          {productRating < 1 ? (
            <div className="productListProduct__noRatingsYet">
              No Ratings Yet!
            </div>
          ) : (
            <>
              {productRating}
              <FaStar className="productListProduct__starIcon" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
