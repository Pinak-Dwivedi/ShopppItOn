import "./CartItem.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCart,
  removeProductFromCart,
} from "../../../redux/slices/cartSlice";

import formatNumberAsPrice from "../../../utils/formatNumberAsPrice";

export default function CartItem({ cartItemInfo }) {
  const {
    productId,
    productName,
    productImage,
    productPrice,
    productStock,
    productQuantity,
    productTotalPrice,
    productDeliveryDate,
  } = cartItemInfo;

  const [cartCounter, setCartCounter] = useState(productQuantity);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.cart);

  let deliveryDate = new Date(productDeliveryDate).toDateString().split(" ");
  let deliveryDateDisplay = `${deliveryDate[0]} ${deliveryDate[1]} ${deliveryDate[2]}`;

  function updateCartItem(cartProductInfo) {
    dispatch(updateCart(cartProductInfo));
  }

  function removeCartItem() {
    let cartProductInfo = {
      productId,
      productName,
    };

    dispatch(removeProductFromCart(cartProductInfo));
  }

  return (
    <div className="cartItem">
      <div className="cartItem__imageBox">
        <img src={productImage} alt="item" className="cartItem__image" />
      </div>
      <div className="cartItem__info">
        <div className="cartItem__name">{productName}</div>
        <div className="cartItem__price">
          {formatNumberAsPrice(productTotalPrice)}
        </div>
        <div className="cartItem__counter">
          <button
            className="cartItem__countButton"
            disabled={isLoading}
            onClick={() => {
              let newCartCount = cartCounter === 1 ? 1 : cartCounter - 1;
              setCartCounter(newCartCount);

              let cartProductInfo = {
                productId,
                productName,
                productPrice,
                productStock,
                productQuantity: newCartCount,
                productTotalPrice: productPrice * newCartCount,
              };

              updateCartItem(cartProductInfo);
            }}
          >
            -
          </button>
          <div className="cartItem__count">{productQuantity}</div>
          <button
            className="cartItem__countButton"
            disabled={isLoading}
            onClick={() => {
              let newCartCount =
                cartCounter < productStock ? cartCounter + 1 : cartCounter;

              setCartCounter(newCartCount);

              let cartProductInfo = {
                productId,
                productName,
                productPrice,
                productStock,
                productQuantity: newCartCount,
                productTotalPrice: productPrice * newCartCount,
              };

              updateCartItem(cartProductInfo);
            }}
          >
            +
          </button>
        </div>
        <button
          className="cartItem__removeButton"
          disabled={isLoading}
          onClick={removeCartItem}
        >
          Remove
        </button>
      </div>
      <div className="cartItem__deliveryInfo">
        Estimated Delivery by {deliveryDateDisplay}
      </div>
    </div>
  );
}
