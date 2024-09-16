import "./Profile.css";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import {
  updateUser,
  checkUserAuthentication,
} from "../../redux/slices/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const userDetails = state?.userDetails;

  const { isAuthenticated, isLoading, validationError, user } = useSelector(
    (state) => state.user
  );

  let userData = {};

  if (userDetails != null) {
    userData = userDetails;
  } else {
    userData = user;
  }

  useEffect(() => {
    dispatch(checkUserAuthentication());
  }, [dispatch]);

  const [username, setUsername] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [profileImage, setProfileImage] = useState(userData?.profileImage);

  if (!isAuthenticated && !isLoading) return <Navigate to="/" />;

  function update(e) {
    e.preventDefault();
    dispatch(
      updateUser({
        userId: userData?.userId,
        username,
        email,
        profileImage,
      })
    );
  }

  let profileImageDisplay;

  if (userData?.profileImage == null) {
    profileImageDisplay = <FaUserCircle className="profile__imagePreview" />;
  } else if (typeof userData?.profileImage === "string") {
    profileImageDisplay = userData?.profileImage;
  }

  if (typeof profileImage === "object") {
    profileImageDisplay = URL.createObjectURL(profileImage);
  }

  return (
    <div className="profile">
      <h3 className="profile__heading">My Profile</h3>
      <form onSubmit={(e) => update(e)} className="profile__form">
        <div className="profile__formField profile__image">
          <label className="profile__formLabel" htmlFor="profileImage">
            Profile Picture
          </label>
          <div className="profile__imagePreviewContainer">
            <img
              className="profile__imagePreview"
              src={profileImageDisplay}
              alt="profile"
            />
          </div>
          <span className="profile__formError">
            {validationError?.profileImage}
          </span>
          <input
            className="profile__formInput profile__imageInput"
            type="file"
            id="profileImage"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>

        <div className="profile__info">
          <div className="profile__formField">
            <label className="profile__formLabel" htmlFor="username">
              Username
            </label>
            <input
              className="profile__formInput"
              type="text"
              id="username"
              placeholder="Jordan"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="profile__formError">
              {validationError?.username}
            </span>
          </div>
          <div className="profile__formField">
            <label className="profile__formLabel" htmlFor="email">
              Email
            </label>
            <input
              className="profile__formInput"
              type="text"
              id="email"
              placeholder="jordan@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="profile__formError">{validationError?.email}</span>
          </div>
        </div>
        <button
          className="profile__formButton"
          type="submit"
          disabled={isLoading}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
