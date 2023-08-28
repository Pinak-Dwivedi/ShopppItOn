import "./Order.css";
import formatNumberAsPrice from "../../../utils/formatNumberAsPrice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderThunk } from "../../../redux/slices/orderSlice";

export default function Order({ orderDetails }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.order);
  const [orderStatus, setOrderStatus] = useState(orderDetails?.orderStatus);

  let orderDate = new Date(orderDetails?.orderDate).toDateString().split(" ");
  let orderDateDisplay = `${orderDate[0]} ${orderDate[1]} ${orderDate[2]}`;

  let deliverDate = new Date(orderDetails?.deliveryDate)
    .toDateString()
    .split(" ");
  let deliverDateDisplay = `${deliverDate[0]} ${deliverDate[1]} ${deliverDate[2]}`;

  let orderStatusDisplay =
    orderDetails?.orderStatus.charAt(0).toUpperCase() +
    orderDetails?.orderStatus.slice(1);

  function updateOrder() {
    dispatch(
      updateOrderThunk({
        orderId: orderDetails?.orderId,
        orderStatus,
      })
    );
  }

  return (
    <div className="order">
      <div className="order__imageAndName">
        <div className="order__imageBox">
          <img
            src={orderDetails.productImage}
            alt="item"
            className="order__image"
          />
        </div>
        <div className="order__productName">{orderDetails?.productName}</div>
      </div>

      <div className="order__info">
        <fieldset className="order__fieldset">
          <legend className="order__fieldsetTitle">Price</legend>
          {formatNumberAsPrice(orderDetails?.productPrice)}
        </fieldset>

        <fieldset className="order__fieldset">
          <legend className="order__fieldsetTitle">Order Quantity</legend>
          {orderDetails?.productQuantity}
        </fieldset>

        <fieldset className="order__fieldset">
          <legend className="order__fieldsetTitle">Total Price</legend>
          {formatNumberAsPrice(orderDetails?.productTotalPrice)}
        </fieldset>

        <fieldset className="order__fieldset">
          <legend className="order__fieldsetTitle">Order Status</legend>

          {isAuthenticated && user?.role === "admin" ? (
            <select
              className="order__statusSelect"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="processing" className="order__statusOption">
                Processing
              </option>
              <option value="shipped" className="order__statusOption">
                Shipped
              </option>
              <option value="dispatched" className="order__statusOption">
                Dispatched
              </option>
              <option value="delivered" className="order__statusOption">
                Delivered
              </option>
            </select>
          ) : (
            orderStatusDisplay
          )}
        </fieldset>

        <fieldset className="order__fieldset">
          <legend className="order__fieldsetTitle">Order Date</legend>
          {orderDateDisplay}
        </fieldset>

        {orderStatus !== "delivered" ? (
          <fieldset className="order__fieldset">
            <legend className="order__fieldsetTitle">
              Estimated Delivery By
            </legend>
            {deliverDateDisplay}
          </fieldset>
        ) : (
          ""
        )}

        {isAuthenticated && user?.role === "admin" ? (
          <button
            className="order__updateButton"
            disabled={isLoading}
            onClick={updateOrder}
          >
            Update
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
