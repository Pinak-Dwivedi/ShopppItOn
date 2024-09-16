import "./Header.css";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { clearLoadingAndValidationError } from "../../redux/slices/userSlice";

import { FaShoppingCart, FaUser } from "react-icons/fa";
import Navbar from "../navbar/Navbar";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import SearchBar from "../searchbar/SearchBar";

export default function Header() {
  const navRef = useRef();
  const loginRef = useRef();
  const signUpRef = useRef();
  const forgotPasswordRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItemsCount } = useSelector((state) => state.cart);

  function openNav() {
    navRef.current.classList.add("navbar--active");
  }

  function openLogin() {
    if (isAuthenticated) {
      return navigate("/profile", { replace: true });
    }
    dispatch(clearLoadingAndValidationError());
    loginRef.current.classList.add("login--active");
  }

  return (
    <div className="header">
      <Link to="/" className="header__logoLink">
        <h1 className="header__logo">Shoppp It On</h1>
      </Link>

      <Navbar navRef={navRef} />

      <div className="header__actions">
        <div className="header__hamburgerButton" onClick={openNav}>
          <div className="header__hamburgerSlice"></div>
          <div className="header__hamburgerSlice"></div>
          <div className="header__hamburgerSlice"></div>
        </div>

        <SearchBar />

        <div className="header__cartAndProfile">
          <div className="header__cart" onClick={() => navigate("/cart")}>
            <FaShoppingCart /> CART
            {cartItemsCount != null ? (
              <sup className="header__cartItemsCount">{cartItemsCount}</sup>
            ) : (
              ""
            )}
          </div>
          <div className="header__profile" onClick={openLogin}>
            <FaUser /> PROFILE
          </div>
        </div>
      </div>

      <Login
        loginRef={loginRef}
        signUpRef={signUpRef}
        forgotPasswordRef={forgotPasswordRef}
      />
      <SignUp signUpRef={signUpRef} loginRef={loginRef} />
      <ForgotPassword
        forgotPasswordRef={forgotPasswordRef}
        loginRef={loginRef}
      />
    </div>
  );
}
