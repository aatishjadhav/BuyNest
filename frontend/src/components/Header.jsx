import { Link, useNavigate } from "react-router-dom";
import CartCount from "./CartCount";
import WishlistCount from "./WishlistCount";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBySearch } from "../slices/productsSlice";
import { logout } from "../slices/authSlice";
import "./footer.css";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("User Data:", JSON.stringify(user, null, 2));


  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearch(query);
    dispatch(filterBySearch(query));
  };

  return (
    <header className="">
      <nav className="navbar navbar-expand-lg text-light">
        <div className="container-fluid container">
          <Link className="navbar-brand text-light" to="/">
            BuyNest
          </Link>
          <Link className="nav-link" to="/products">
            Products
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center">
            <form className="d-flex" role="search" style={{ width: "40%" }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
                style={{ width: "100%" }}
                value={search}
                onChange={handleSearch}
              />
            </form>
          </div>

          <div className="ms-auto d-flex gap-4">
            {user ? (
              <>
                <span>Welcome, {user.name}</span>
                <button
                  onClick={() => dispatch(logout())}
                  className="btn btn-warning"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-warning" to="/login">
                Login
              </Link>
            )}

            <WishlistCount />
            <CartCount />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
