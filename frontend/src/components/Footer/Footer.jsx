import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-light py-4 mt-5 border-top"
      style={{ backgroundColor: "#121932" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3 text-center">
            <h5>About Us</h5>
            <p>
              BuyNest is a fashion e-commerce website website that provides
              high-quality products to our customers at affordable prices.
            </p>
          </div>
          <div className="col-md-3 mb-3 text-center">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="nav-link p-0" to="/products/categories/Men's">
                  Men
                </Link>
              </li>
              <li className="mb-2">
                <Link className="nav-link p-0" to="/products/categories/Women's">
                  Women
                </Link>
              </li>
              <li className="mb-2">
                <Link className="nav-link p-0" to="/products/categories/Kids">
                  Kids
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-3 text-center">
            <h5>Our Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="nav-link p-0" to="/user/orders">
                  Orders
                </Link>
              </li>
              <li className="mb-2">
                <Link className="nav-link p-0" to="/wishlist">
                  Wishlist
                </Link>
              </li>
              <li className="mb-2">
                <Link className="nav-link p-0" to="/user/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-3 text-center">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-center align-items-center gap-3 mt-3">
              <li>
                <a
                  href="https://github.com/aatishjadhav"
                  className="nav-link "
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaGithub size={23} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/atish-jadhav07/"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaLinkedin size={23} />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/atishjadhav835"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaTwitter size={23} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/atishh.j"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <FaInstagram size={23} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center">
          &copy; 2025 Ecoomerce Inc. All rights reserved by Atish Jadhav.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
