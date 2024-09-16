import "./ForgotPassword.css";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  forgotUserPassword,
  clearLoadingAndValidationError,
} from "../../redux/slices/userSlice";

export default function ForgotPassword({ forgotPasswordRef, loginRef }) {
  const [email, setEmail] = useState("");
  const { isLoading, validationError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function forgotPasswordToLogin() {
    loginRef.current.classList.add("login--active");
    forgotPasswordRef.current.classList.remove("forgotPassword--active");

    dispatch(clearLoadingAndValidationError());
    setEmail("");
  }

  function closeforgotPassword() {
    forgotPasswordRef.current.classList.remove("forgotPassword--active");

    dispatch(clearLoadingAndValidationError());
    setEmail("");
  }

  function sendMail(e) {
    e.preventDefault();
    dispatch(forgotUserPassword({ email, closeforgotPassword }));
  }

  return (
    <div ref={forgotPasswordRef} className="forgotPassword">
      <div className="forgotPassword__formContainer">
        <h3 className="forgotPassword__heading">Forgot Password</h3>

        <button
          className="forgotPassword__closeButton"
          onClick={closeforgotPassword}
        >
          <ImCross className="forgotPassword__closeIcon" />
        </button>

        <form onSubmit={(e) => sendMail(e)} className="forgotPassword__form">
          <div
            className="forgotPassword__infoText"
            htmlFor="forgotPasswordEmail"
          >
            Lost your password? Please enter your email address. You will
            receive a link via email to create a new password.
          </div>
          <div className="forgotPassword__formField">
            <label
              className="forgotPassword__formLabel"
              htmlFor="forgotPasswordEmail"
            >
              Email
            </label>
            <input
              className="forgotPassword__formInput"
              type="email"
              id="forgotPasswordEmail"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="forgotPassword__formError">
              {validationError?.email}
            </span>
          </div>

          <button
            type="submit"
            className="forgotPassword__formButton"
            disabled={isLoading}
          >
            Send Email
          </button>
        </form>

        <div className="forgotPassword__toLogin">
          <span className="forgotPassword__toLoginText">
            Remember password?
          </span>
          <button
            className="forgotPassword__toLoginButton"
            onClick={forgotPasswordToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
