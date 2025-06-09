import { Link, useNavigate } from "react-router-dom";
import CartCount from "./CartCount";
import WishlistCount from "./WishlistCount";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBySearch } from "../slices/productsSlice";
import "./header.css";
import { MdPersonOutline, MdCancel, MdCheckCircle } from "react-icons/md";

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
    // <header className="">
    //   <nav className="navbar navbar-expand-lg text-light">
    //     <div className="container-fluid">
    //       <Link className="navbar-brand text-light" to="/">
    //         BuyNest
    //       </Link>
    //       <Link className="nav-link" to="/products">
    //         Products
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarNavAltMarkup"
    //         aria-controls="navbarNavAltMarkup"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>

    //       <div className="collapse navbar-collapse justify-content-center">
    //         <form className="d-flex" role="search" style={{ width: "40%" }}>
    //           <input
    //             className="form-control me-2"
    //             type="search"
    //             placeholder="Search products..."
    //             aria-label="Search"
    //             style={{ width: "100%" }}
    //             value={search}
    //             onChange={handleSearch}
    //           />
    //         </form>
    //       </div>

    //       {/* <div className="ms-auto d-flex gap-4">
    //         {user ? (
    //           <>
    //             <span>Welcome, {user.name}</span>
    //             <button
    //               onClick={() => dispatch(logout())}
    //               className="btn btn-warning"
    //             >
    //               Logout
    //             </button>
    //           </>
    //         ) : (
    //           // <Link className="btn btn-warning" to="/login">
    //           //   Login
    //           // </Link>
    //         )}

    //       {/* </div> */}
    //       <div className="ms-auto d-flex gap-4">
    //         {user ? (
    //           <Link className="nav-link" to="/user/profile">
    //             <MdPersonOutline size={29} />
    //             <MdCheckCircle
    //               size={18}
    //               color="white"
    //               style={{ position: "", bottom: 0, right: 0 }}
    //             />
    //           </Link>
    //         ) : (
    //           <Link className="nav-link" to="/login">
    //             {" "}
    //             <MdPersonOutline size={29} />
    //             <MdCancel
    //               size={14}
    //               color="white"
    //               style={{ position: "", bottom: 0, right: 0 }}
    //             />
    //           </Link>
    //         )}

    //         <WishlistCount />
    //         <CartCount />
    //       </div>
    //     </div>
    //   </nav>
    // </header>
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
