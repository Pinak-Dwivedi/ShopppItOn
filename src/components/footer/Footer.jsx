import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <Link to="/" className="footer__logoLink">
        <div className="footer__logo">Shoppp It On</div>
      </Link>

      <div className="footer__categories">
        <ul className="footer__categoryList">
          <li className="footer__categoryListItem">
            <Link className="footer__categoryLink" to="/productlisting">
              Products
            </Link>
          </li>

          <li className="footer__categoryListItem">
            <Link className="footer__categoryLink" to="/cart">
              Cart
            </Link>
          </li>

          <li className="footer__categoryListItem">
            <Link className="footer__categoryLink" to="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>

      <div className="footer__socialMedia">
        <ul className="footer__socialMediaList">
          <li className="footer__socialMediaListItem">
            <Link
              className="footer__socialMediaLink"
              to="https://www.facebook.com/"
              target="_blank"
            >
              <FaFacebookF className="footer__socialMediaIcon" />
            </Link>
          </li>

          <li className="footer__socialMediaListItem">
            <Link
              className="footer__socialMediaLink"
              to="https://github.com/"
              target="_blank"
            >
              <FaGithub className="footer__socialMediaIcon" />
            </Link>
          </li>

          <li className="footer__socialMediaListItem">
            <Link
              className="footer__socialMediaLink"
              to="https://www.linkedin.com/in/
              pinak-dwivedi"
              target="_blank"
            >
              <FaLinkedinIn className="footer__socialMediaIcon" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
