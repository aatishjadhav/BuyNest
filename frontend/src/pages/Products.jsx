import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-lg-2 bg-white p-4">
          <h5 className="fw-bold">
            Filters <span className="text-primary float-end">Clear</span>
          </h5>

          {/* Price Slider */}
          <div className="mb-4">
            <h6>Price</h6>
            <input
              type="range"
              className="form-range"
              min="50"
              max="200"
              step="1"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <h6>Category</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="category1"
              />
              <label className="form-check-label" htmlFor="category1">
                Men Clothing
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="category2"
                checked
              />
              <label className="form-check-label" htmlFor="category2">
                Men Clothing
              </label>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <h6>Rating</h6>
            {[
              "4 Stars & above",
              "3 Stars & above",
              "2 Stars & above",
              "1 Star & above",
            ].map((rating, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id={`rating${index}`}
                />
                <label className="form-check-label" htmlFor={`rating${index}`}>
                  {rating}
                </label>
              </div>
            ))}
          </div>

          {/* Sort By */}
          <div>
            <h6>Sort by</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sort"
                id="sort1"
              />
              <label className="form-check-label" htmlFor="sort1">
                Price - Low to High
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sort"
                id="sort2"
              />
              <label className="form-check-label" htmlFor="sort2">
                Price - High to Low
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-lg-10 bg-light">
          <h5 className="fw-bold my-3">
            Showing All Products ({products.length})
          </h5>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div className="row g-4">
            {products.map((product, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card">
                  <div style={{ backgroundColor: "light", padding: "20px" }}>
                    <img
                      src={product.imgUrl}
                      className="img-fluid"
                      alt="Product"
                      style={{
                        height: "250px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div
                    className="card-img-overlay p-2 d-flex justify-content-end"
                    style={{ width: "100%", pointerEvents: "none" }}
                  >
                    <h5
                      className="card-title text-black rounded py-2 px-2 d-inline-block"
                      style={{ pointerEvents: "auto", cursor: "pointer" }}
                    >
                      <FaRegHeart size={20} style={{ cursor: "pointer" }} />{" "}
                    </h5>
                  </div>

                  <div className="card-body text-center">
                    <Link
                      to={`/products/${product._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h6 className="fw-bold">{product.name}</h6>
                    </Link>
                    <Link
                      to={`/products/${product._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <p className="fw-bold">₹{product.price}</p>
                    </Link>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleAdd(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
