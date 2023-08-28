import "./Login.css";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  loginUser,
  clearLoadingAndValidationError,
} from "../../redux/slices/userSlice";

export default function Login({ loginRef, signUpRef, forgotPasswordRef }) {
  const initialLoginInfoState = {
    email: "",
    password: "",
  };

  const [loginInfo, setLoginInfo] = useState(initialLoginInfoState);
  const { email, password } = loginInfo;

  const dispatch = useDispatch();
  const { isLoading, validationError } = useSelector((state) => state.user);

  function closeLogin() {
    loginRef.current.classList.remove("login--active");
    setLoginInfo(initialLoginInfoState);
    dispatch(clearLoadingAndValidationError());
  }

  function loginToSignUp() {
    loginRef.current.classList.remove("login--active");
    signUpRef.current.classList.add("signUp--active");
    setLoginInfo(initialLoginInfoState);
    dispatch(clearLoadingAndValidationError());
  }

  function loginToForgotPassword() {
    loginRef.current.classList.remove("login--active");
    forgotPasswordRef.current.classList.add("forgotPassword--active");
    setLoginInfo(initialLoginInfoState);
    dispatch(clearLoadingAndValidationError());
  }

  function login(e) {
    e.preventDefault();
    dispatch(loginUser({ ...loginInfo, closeLogin }));
  }

  return (
    <div ref={loginRef} className="login">
      <div className="login__formContainer">
        <h3 className="login__heading">Sign In</h3>

        <button className="login__closeButton" onClick={closeLogin}>
          <ImCross className="login__closeIcon" />
        </button>

        <form onSubmit={(e) => login(e)} className="login__form">
          <div className="login__formField">
            <label className="login__formLabel" htmlFor="loginEmail">
              Email
            </label>
            <input
              className="login__formInput"
              type="email"
              id="loginEmail"
              placeholder="e.g:- jordan@gmail.com"
              value={email}
              onChange={(e) =>
                setLoginInfo({
                  ...loginInfo,
                  email: e.target.value,
                })
              }
            />
            <span className="login__formError">{validationError?.email}</span>
          </div>

          <div className="login__formField">
            <label className="login__formLabel" htmlFor="loginPassword">
              Password
            </label>
            <input
              className="login__formInput"
              type="password"
              id="loginPassword"
              placeholder="e.g:- your password here"
              value={password}
              onChange={(e) =>
                setLoginInfo({
                  ...loginInfo,
                  password: e.target.value,
                })
              }
            />
            <span className="login__formError">
              {validationError?.password}
            </span>
          </div>

          <button
            type="submit"
            className="login__formButton"
            disabled={isLoading}
          >
            Login
          </button>
        </form>

        <div className="login__signUpAndForgotPassword">
          <div className="login__toSignUp">
            <span className="login__toSignUpText">Don't have an account?</span>
            <button className="login__toSignUpButton" onClick={loginToSignUp}>
              Sign Up
            </button>
          </div>

          <div className="login__toForgotPassword">
            <button
              className="login__toForgotPasswordButton"
              onClick={loginToForgotPassword}
            >
              forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
