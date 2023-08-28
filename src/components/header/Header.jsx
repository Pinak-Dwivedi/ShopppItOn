import "./Header.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsThunk,
  setSearchQuery,
} from "../../redux/slices/productSlice";

import { clearLoadingAndValidationError } from "../../redux/slices/userSlice";
import { BiSearchAlt } from "react-icons/bi";

import { FaShoppingCart, FaUser } from "react-icons/fa";
import Navbar from "../navbar/Navbar";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";
import ForgotPassword from "../forgotPassword/ForgotPassword";

export default function Header() {
  const navRef = useRef();
  const loginRef = useRef();
  const signUpRef = useRef();
  const forgotPasswordRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, searchQuery } = useSelector((state) => state.product);
  const { cartItemsCount } = useSelector((state) => state.cart);

  const [search, setSearch] = useState(searchQuery.search);

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

  function searchProducts(e) {
    e.preventDefault();

    let query = "";

    if (search?.trim() === "") {
      dispatch(
        setSearchQuery({
          ...searchQuery,
          search: "",
        })
      );

      query = `${searchQuery.filter}${searchQuery.page}`;
    } else {
      dispatch(
        setSearchQuery({
          ...searchQuery,
          search: `search=${search}&`,
        })
      );
      query = `search=${search}&${searchQuery.filter}${searchQuery.page}`;

      dispatch(getProductsThunk(query));
    }

    navigate(`/productlisting?${query}`);
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

        <form className="header__search" onSubmit={searchProducts}>
          <input
            className="header__searchInput"
            type="search"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="header__searchButton"
            onClick={searchProducts}
            disabled={isLoading}
          >
            <BiSearchAlt className="header__searchButton--image" />
          </button>
        </form>

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
