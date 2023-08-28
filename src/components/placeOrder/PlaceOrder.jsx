import "./PlaceOrder.css";
import {
  BsCreditCard2BackFill,
  BsCalendar2EventFill,
  BsKeyFill,
} from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  placeOrderThunk,
  processPayementThunk,
} from "../../redux/slices/orderSlice";

import { clearCart } from "../../redux/slices/cartSlice";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Country, State } from "country-state-city";

import formatNumberAsPrice from "../../utils/formatNumberAsPrice";

export default function PlaceOrder() {
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { validationError } = useSelector((state) => state.order);
  const { isLoading, cartItemsCount, cartTotal } = useSelector(
    (state) => state.cart
  );

  if (!isAuthenticated || cartItemsCount < 1) return <Navigate to="/" />;

  function proceedToPayment(e) {
    e.preventDefault();

    dispatch(
      placeOrderThunk({
        address,
        pinCode,
        city,
        state,
        country,
        mobile,
        setShowPaymentForm,
      })
    );
  }

  function processPayment(e) {
    e.preventDefault();

    dispatch(
      processPayementThunk({
        paymentDetails: {
          stripe,
          elements,
          CardNumberElement,
          amount: cartTotal,
        },
        billingDetails: {
          name: user.name,
          email: user.email,
          address,
          pinCode,
          city,
          state,
          country,
          mobile,
        },
        clearCartOnOrderComplete,
      })
    );
  }

  function clearCartOnOrderComplete() {
    dispatch(clearCart());
  }

  return (
    <div className="placeOrder">
      <div className="placeOrder__formContainer">
        <h3 className="placeOrder__formHeading">Shipment Details</h3>
        <form
          className="placeOrder__form"
          onSubmit={(e) => proceedToPayment(e)}
        >
          <div className="placeOrder__formField">
            <label htmlFor="address" className="placeOrder__formLabel">
              Address
            </label>
            <textarea
              id="address"
              className="placeOrder__formInput"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <span className="placeOrder__formError">
              {validationError?.address}
            </span>
          </div>

          <div className="placeOrder__formField">
            <label htmlFor="pincode" className="placeOrder__formLabel">
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              className="placeOrder__formInput"
              placeholder="e.g:- 123456"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            <span className="placeOrder__formError">
              {validationError?.pinCode}
            </span>
          </div>

          <div className="placeOrder__formField">
            <label htmlFor="city" className="placeOrder__formLabel">
              City
            </label>
            <input
              type="text"
              id="city"
              className="placeOrder__formInput"
              placeholder="e.g:- Varanasi"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <span className="placeOrder__formError">
              {validationError?.city}
            </span>
          </div>

          <div className="placeOrder__formField">
            <label htmlFor="country" className="placeOrder__formLabel">
              Country
            </label>
            <select
              className="placeOrder__formSelect"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="placeOrder__formOption" value="">
                Country
              </option>
              {Country.getAllCountries().map((country) => (
                <option
                  className="placeOrder__formOption"
                  key={country.isoCode}
                  value={country.isoCode}
                >
                  {country.name}
                </option>
              ))}
            </select>
            <span className="placeOrder__formError">
              {validationError?.country}
            </span>
          </div>

          {country !== "" ? (
            <div className="placeOrder__formField">
              <label htmlFor="state" className="placeOrder__formLabel">
                State
              </label>
              <select
                className="placeOrder__formSelect"
                id="country"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option className="placeOrder__formOption" value="">
                  State
                </option>
                {State.getStatesOfCountry(country).map((state) => (
                  <option
                    className="placeOrder__formOption"
                    key={state.isoCode}
                    value={state.isoCode}
                  >
                    {state.name}
                  </option>
                ))}
              </select>
              <span className="placeOrder__formError">
                {validationError?.state}
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="placeOrder__formField">
            <label htmlFor="mobile" className="placeOrder__formLabel">
              Mobile
            </label>
            <input
              type="number"
              id="mobile"
              className="placeOrder__formInput"
              placeholder="e.g:- 1234567890"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <span className="placeOrder__formError">
              {validationError?.mobile}
            </span>
          </div>

          <button
            className="placeOrder__formButton"
            type="submit"
            disabled={isLoading}
          >
            Proceed To Payment
          </button>
        </form>
      </div>

      <div
        className={`placeOrder__formContainer paymentForm ${
          showPaymentForm ? "active" : ""
        }`}
      >
        <h3 className="placeOrder__formHeading">Payment Details</h3>
        <form className="placeOrder__form" onSubmit={(e) => processPayment(e)}>
          <div className="placeOrder__formField">
            <label htmlFor="cardNumber" className="placeOrder__formLabel">
              Card Number{" "}
              <BsCreditCard2BackFill className="placeOrder__formLabelIcon" />
            </label>
            <CardNumberElement className="placeOrder__formInput" />
            <span className="placeOrder__formError"></span>
          </div>

          <div className="placeOrder__formField paymentForm">
            <label htmlFor="cardExpiry" className="placeOrder__formLabel">
              Expiry{" "}
              <BsCalendar2EventFill className="placeOrder__formLabelIcon" />
            </label>
            <CardExpiryElement className="placeOrder__formInput" />
            <span className="placeOrder__formError"></span>
          </div>

          <div className="placeOrder__formField">
            <label htmlFor="cardCVC" className="placeOrder__formLabel">
              CVC <BsKeyFill className="placeOrder__formLabelIcon" />
            </label>
            <CardCvcElement className="placeOrder__formInput" />
            <span className="placeOrder__formError"></span>
          </div>

          <div className="placeOrder__total">
            Total:- {formatNumberAsPrice(cartTotal)}
          </div>

          <button className="placeOrder__formButton" type="submit">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
