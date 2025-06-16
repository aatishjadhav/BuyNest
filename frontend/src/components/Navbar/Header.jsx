import { Link, useNavigate } from "react-router-dom";
import CartCount from "../CartCount";
import WishlistCount from "../WishlistCount";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBySearch } from "../../slices/productsSlice";
import "./header.css";
import { MdPersonOutline, MdCancel, MdCheckCircle } from "react-icons/md";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearch(query);
    dispatch(filterBySearch(query));
  };

  return (
   
    <header className="all">
      <div className="both">
        <div className="left">
          <h3><Link to="/" className="nav-link">BuyNest</Link></h3>
          <h5><Link to="/products" className="nav-link">Products</Link></h5>
        </div>
        <div className="right">
          <div
            className="input-group input-group-sm"
            style={{ maxWidth: "300px" }}
          >
            <input
              type="text"
              className="form-control"
              aria-label="Search"
              placeholder="Search for items..."
              value={search}
              onChange={handleSearch}
            />
            <span className="input-group-text" id="inputGroup-sizing-default">
              <i className="bi bi-search"></i>
            </span>
          </div>
          <Link className="nav-link" to="/user/profile">
            <MdPersonOutline size={29} />
          </Link>
          <WishlistCount />
          <CartCount />
        </div>
      </div>
    </header>
  );
};

export default Header;
