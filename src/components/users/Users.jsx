import "./Users.css";
import User from "./User/User";
import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, users } = useSelector((state) => state.user);
  const shouldMakeGetProductUsersCall = useRef(true);

  useEffect(() => {
    if (shouldMakeGetProductUsersCall.current === true) {
      dispatch(getAllUsers());

      return () => {
        shouldMakeGetProductUsersCall.current = false;
      };
    }
  }, [dispatch]);

  if (!isAuthenticated || user?.role !== "admin") return <Navigate to="/" />;

  return (
    <div className="Users">
      <div className="users__heading">All Users</div>

      <div className="users__list">
        {users != null ? (
          users?.map((user) => <User key={user.userId} userDetails={user} />)
        ) : (
          <div className="users__noUsersFound">No Users Found!</div>
        )}
      </div>
    </div>
  );
}
