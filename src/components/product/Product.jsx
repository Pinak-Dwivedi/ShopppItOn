import "./Product.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductThunk } from "../../redux/slices/productSlice";
import { setCart } from "../../redux/slices/cartSlice";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import formatNumberAsPrice from "../../utils/formatNumberAsPrice";
import Review from "./review/Review";

export default function Product() {
  const { state } = useLocation();
  const productId = state?.productId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { productDetails } = useSelector((state) => state.product);
  const { isLoading } = useSelector((state) => state.cart);
  const [cartCounter, setCartCounter] = useState(1);

  useEffect(() => {
    dispatch(getProductThunk(productId));
  }, [dispatch, productId]);

  let stars;
  let displayStars = [];
  let productImages;
  let productPrice = productDetails?.productPrice;

  if (productDetails != null) {
    stars = productDetails?.productRating.toString().split(".");

    for (let i = 0; i < Number(stars[0]); i++) {
      displayStars.push(
        <FaStar key={i + 1} className="product__ratingStarIcon" />
      );
    }

    if (Number(stars[1]) > 0)
      displayStars.push(
        <FaStarHalfAlt
          key={displayStars.length + 1}
          className="product__ratingStarIcon"
        />
      );

    if (productDetails?.productImages != null) {
      productImages = JSON.parse(productDetails?.productImages);
      productImages = productImages.map((productImage, index) => (
        <img
          key={index}
          className={`product__image ${
            activeImageIndex === index ? "active" : ""
          }`}
          src={productImage}
          alt="product"
        />
      ));
    }
  }

  function prevImage() {
    setActiveImageIndex((activeImageIndex) => {
      if (activeImageIndex === 0) return 2;
      else return activeImageIndex - 1;
    });
  }

  function nextImage() {
    setActiveImageIndex((activeImageIndex) => {
      if (activeImageIndex === 2) return 0;
      else return activeImageIndex + 1;
    });
  }

  function addToCart() {
    let cartProductInfo = {
      productId,
      productName: productDetails.productName,
      productImage: JSON.parse(productDetails.productImages)[0],
      productPrice,
      productStock: productDetails.productStock,
      productQuantity: cartCounter,
      productTotalPrice: productPrice * cartCounter,
      productAddedToCartDate: Date.now(),
      productDeliveryDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    dispatch(setCart(cartProductInfo));
  }

  return (
    <div className="product">
      <div className="product__imageBox">
        {productImages != null ? productImages : ""}

        <button
          className="product__changeImageButton product__prevImageButton"
          onClick={prevImage}
        >
          &lt;
        </button>
        <button
          className="product__changeImageButton product__nextImageButton"
          onClick={nextImage}
        >
          &gt;
        </button>
      </div>
      <div className="product__info">
        <div className="product__category">
          {productDetails?.productCategory}
        </div>
        <div className="product__name">{productDetails?.productName}</div>
        <div className="product__price">
          {formatNumberAsPrice(productPrice)}
        </div>
        <fieldset className="product__fieldset">
          <legend className="product__fieldsetTitle">Rating</legend>
          {displayStars.length !== 0 ? (
            displayStars
          ) : (
            <div className="product__noRatingsYet">No Ratings Yet!</div>
          )}
        </fieldset>

        <fieldset className="product__fieldset">
          <legend className="product__fieldsetTitle">Description</legend>
          {productDetails?.productDescription}
        </fieldset>

        <div className="product__cart">
          <div className="product__cartCounter">
            <button
              className="product__cartCountButton"
              onClick={() =>
                setCartCounter(cartCounter === 1 ? 1 : cartCounter - 1)
              }
            >
              -
            </button>
            <span className="product__cartCount">{cartCounter}</span>
            <button
              className="product__cartCountButton"
              onClick={() => {
                let limitReached = false;
                setCartCounter((cartCounter) => {
                  if (cartCounter < productDetails.productStock)
                    return cartCounter + 1;
                  else {
                    limitReached = true;
                    return cartCounter;
                  }
                });
                if (limitReached === true) {
                  toast.dismiss();
                  toast(`Only ${cartCounter} in stock`, {
                    icon: "⚠️",
                  });
                }
              }}
            >
              +
            </button>
          </div>

          <button
            className="product__addToCartButton"
            disabled={isLoading}
            onClick={addToCart}
          >
            Add To Cart
          </button>
        </div>

        {isAuthenticated && user?.role === "admin" ? (
          <button
            className="product__updateProductButton"
            onClick={() => {
              navigate(`/updateproduct/${productId}`, {
                state: {
                  productDetails,
                },
              });
            }}
          >
            Update
          </button>
        ) : (
          ""
        )}
      </div>

      <Review productId={productId} />
    </div>
  );
}
