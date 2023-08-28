import "./SignUp.css";
import { ImCross } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUser,
  clearLoadingAndValidationError,
} from "../../redux/slices/userSlice";

export default function SignUp({ signUpRef, loginRef }) {
  const initialSignUpInfoState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  };

  const [signUpInfo, setSignUpInfo] = useState(initialSignUpInfoState);
  const signUpFormRef = useRef();

  const { username, email, password, confirmPassword, profileImage } =
    signUpInfo;

  const dispatch = useDispatch();
  const { isLoading, validationError } = useSelector((state) => state.user);

  function closeSignUp() {
    signUpRef.current.classList.remove("signUp--active");
    signUpFormRef.current.reset();
    setSignUpInfo(initialSignUpInfoState);
    dispatch(clearLoadingAndValidationError());
  }

  function signUpToLogin() {
    signUpRef.current.classList.remove("signUp--active");
    loginRef.current.classList.add("login--active");
    setSignUpInfo(initialSignUpInfoState);
    dispatch(clearLoadingAndValidationError());
  }

  function signUp(e) {
    e.preventDefault();
    dispatch(
      registerUser({ ...signUpInfo, closeSignUp, signUpForm: e.target })
    );
  }

  return (
    <div ref={signUpRef} className="signUp">
      <div className="signUp__formContainer">
        <h3 className="signUp__heading">Sign Up</h3>

        <button className="signUp__closeButton" onClick={closeSignUp}>
          <ImCross className="signUp__closeIcon" />
        </button>

        <form
          className="signUp__form"
          ref={signUpFormRef}
          onSubmit={(e) => signUp(e)}
        >
          <div className="signUp__formField">
            <label className="signUp__formLabel" htmlFor="signUpUsername">
              Username
            </label>
            <input
              className="signUp__formInput"
              type="text"
              id="signUpUsername"
              placeholder="e.g:- Jordan"
              value={username}
              onChange={(e) =>
                setSignUpInfo({
                  ...signUpInfo,
                  username: e.target.value,
                })
              }
            />
            <span className="signUp__formError">
              {validationError?.username}
            </span>
          </div>

          <div className="signUp__formField">
            <label className="signUp__formLabel" htmlFor="signUpEmail">
              Email
            </label>
            <input
              className="signUp__formInput"
              type="email"
              id="signUpEmail"
              placeholder="e.g:- jordan@gmail.com"
              value={email}
              onChange={(e) =>
                setSignUpInfo({
                  ...signUpInfo,
                  email: e.target.value,
                })
              }
            />
            <span className="signUp__formError">{validationError?.email}</span>
          </div>

          <div className="signUp__formField">
            <label className="signUp__formLabel" htmlFor="signUpPassword">
              Password
            </label>
            <input
              className="signUp__formInput"
              type="password"
              id="signUpPassword"
              placeholder="e.g:- your password here"
              value={password}
              onChange={(e) =>
                setSignUpInfo({
                  ...signUpInfo,
                  password: e.target.value,
                })
              }
            />
            <span className="signUp__formError">
              {validationError?.password}
            </span>
          </div>

          <div className="signUp__formField">
            <label className="signUp__formLabel" htmlFor="signUpCofirmPassword">
              Confirm Password
            </label>
            <input
              className="signUp__formInput"
              type="password"
              id="signUpCofirmPassword"
              placeholder="e.g:- confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setSignUpInfo({
                  ...signUpInfo,
                  confirmPassword: e.target.value,
                })
              }
            />
            <span className="signUp__formError">
              {validationError?.confirmPassword}
            </span>
          </div>

          <div className="signUp__formField">
            <label className="signUp__formLabel" htmlFor="signUpProfileImage">
              Profile Image
            </label>

            <div className="signUp__profileImage">
              {profileImage == null ? (
                <FaUserCircle className="signUp__profileImagePreview" />
              ) : (
                <img
                  className="signUp__profileImagePreview"
                  src={URL.createObjectURL(profileImage)}
                  alt="profile"
                />
              )}

              <input
                className="signUp__formInput signUp__profileImageInput"
                type="file"
                id="signUpProfileImage"
                onChange={(e) =>
                  setSignUpInfo({
                    ...signUpInfo,
                    profileImage: e.target.files[0],
                  })
                }
              />
            </div>
            <span className="signUp__formError">
              {validationError?.profileImage}
            </span>
          </div>

          <button
            type="submit"
            className="signUp__formButton"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </form>

        <div className="signUp__toLogin">
          <span className="signUp__toLoginText">Already have an account?</span>
          <button className="signUp__toLoginButton" onClick={signUpToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
