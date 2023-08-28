import "./ResetPassword.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUserPassword } from "../../redux/slices/userSlice";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, validationError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id, token } = useParams();

  function resetPassword(e) {
    e.preventDefault();
    dispatch(resetUserPassword({ password, confirmPassword, id, token }));
  }

  return (
    <div className="resetPassword">
      <h3 className="resetPassword__heading">Reset Password</h3>

      <div className="resetPassword__formContainer">
        <form
          onSubmit={(e) => resetPassword(e)}
          className="resetPassword__form"
        >
          <div className="resetPassword__formField">
            <label
              className="resetPassword__formLabel"
              htmlFor="resetPassword_password"
            >
              Password
            </label>
            <input
              className="resetPassword__formInput"
              type="password"
              id="resetPassword_password"
              placeholder="e.g:- your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="resetPassword__formError">
              {validationError?.password}
            </span>
          </div>

          <div className="resetPassword__formField">
            <label
              className="resetPassword__formLabel"
              htmlFor="resetPassword_confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="resetPassword__formInput"
              type="password"
              id="resetPassword_confirmPassword"
              placeholder="e.g:- confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="resetPassword__formError">
              {validationError?.confirmPassword}
            </span>
          </div>

          <button
            type="submit"
            className="resetPassword__formButton"
            disabled={isLoading}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
