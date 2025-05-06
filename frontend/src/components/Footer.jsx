import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="nav-link" to="/products/categories/mens">
                  Men
                </Link>
              </li>
              <li className="mb-2">
                <Link className="nav-link" to="/products/categories/womens">
                  Women
                </Link>
              </li>
              <li className="mb-2">
                <Link className="nav-link" to="/products/categories/kids">
                  Kids
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  className="nav-link"
                  to="/products/categories/electronics"
                >
                  Electronics
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
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
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="https://github.com/aatishjadhav" className="nav-link">
                  Github
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/in/atish-jadhav07/"
                  className="nav-link"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
