import "./User.css";
import { useNavigate } from "react-router-dom";

export default function User({ userDetails }) {
  const navigate = useNavigate();

  return (
    <div
      className="user"
      onClick={() =>
        navigate("/profile", {
          state: {
            userDetails: {
              userId: userDetails?.userId,
              name: userDetails?.username,
              email: userDetails?.email,
              profileImage: userDetails?.profileImage,
            },
          },
        })
      }
    >
      <div className="user__imageBox">
        <img
          src={userDetails?.profileImage}
          alt="user"
          className="user__image"
        />
      </div>

      <div className="user__info">
        <div className="user__name">{userDetails?.username}</div>
        <div className="user__email">{userDetails?.email}</div>
      </div>
    </div>
  );
}
