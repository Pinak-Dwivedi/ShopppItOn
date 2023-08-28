import "./Navbar.css";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { logoutUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar({ navRef }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function logout() {
    if (!isAuthenticated) return false;

    dispatch(logoutUser());
  }

  function closeNav() {
    navRef.current.classList.remove("navbar--active");
  }
  return (
    <nav ref={navRef} className="navbar">
      <button className="navbar__closeButton" onClick={closeNav}>
        <ImCross className="navbar__closeIcon" />
      </button>
      <ul className="navbar__list">
        <li className="navbar__listItem">
          <Link to="/" className="navbar__link">
            Home
          </Link>
        </li>

        {isAuthenticated ? (
          <li className="navbar__listItem">
            <Link to="/profile" className="navbar__link">
              Profile
            </Link>
          </li>
        ) : (
          ""
        )}

        <li className="navbar__listItem">
          <Link to="/productlisting" className="navbar__link">
            Products
          </Link>
        </li>

        {isAuthenticated && user?.role === "admin" ? (
          <li className="navbar__listItem">
            <Link to="/addproduct" className="navbar__link">
              Add Product
            </Link>
          </li>
        ) : (
          ""
        )}

        {isAuthenticated && user?.role === "admin" ? (
          <li className="navbar__listItem">
            <Link to="/users" className="navbar__link">
              Users
            </Link>
          </li>
        ) : (
          ""
        )}

        <li className="navbar__listItem">
          <Link to="/cart" className="navbar__link">
            Cart
          </Link>
        </li>

        {isAuthenticated && user?.role === "admin" ? (
          <li className="navbar__listItem">
            <Link to="/orders" className="navbar__link">
              Orders
            </Link>
          </li>
        ) : (
          <li className="navbar__listItem">
            <Link to="/orders" className="navbar__link">
              My Orders
            </Link>
          </li>
        )}

        {isAuthenticated ? (
          <li className="navbar__listItem navbar__logout">
            <button
              className="navbar__link navbar__logoutButton"
              onClick={logout}
            >
              Logout <FiLogOut />
            </button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
}
