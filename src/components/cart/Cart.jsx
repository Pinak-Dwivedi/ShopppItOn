import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk } from "../../redux/slices/cartSlice";

import formatNumberAsPrice from "../../utils/formatNumberAsPrice";
import CartItem from "./cartItem/CartItem";

export default function Cart() {
  const { cartItems, cartTotal, cartItemsCount } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  function addToCart() {
    if (isAuthenticated && cartItemsCount !== 0)
      dispatch(addToCartThunk(cartItems));

    return navigate("/placeorder");
  }

  return (
    <div className="cart">
      <div className="cart__heading">CART</div>

      <div className="cart__itemsList">
        <div className="cart__itemsListHeading">My Cart Items</div>

        {cartItems.length !== 0 ? (
          cartItems.map((cartItem) => {
            return (
              <CartItem key={cartItem.productId} cartItemInfo={cartItem} />
            );
          })
        ) : (
          <div className="cart__noItemsInCart">No items in cart!</div>
        )}
      </div>

      <div className="cart__total">
        <div className="cart__totalHeading">Cart Total</div>
        <div className="cart__totalAmount">
          {formatNumberAsPrice(cartTotal)}
        </div>
        <button
          className="cart__placeOrderButton"
          disabled={cartItemsCount < 1 || !isAuthenticated}
          onClick={addToCart}
        >
          {isAuthenticated ? "Place Order" : "Login To Place Order"}
        </button>
      </div>
    </div>
  );
}
