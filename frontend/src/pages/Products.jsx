import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearFilters,
  fetchByCategory,
  fetchProducts,
  filterProducts,
  setFilters,
} from "../slices/productsSlice";
import {
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaHeart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../slices/wishSlice";
import Pagination from "../components/Pagination";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { wish } = useSelector((state) => state.wish);
  const user = useSelector((state) => state.auth.user);
  const { category } = useParams();

  const { filteredProducts, status, error, filters } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);

  const lastIndex = currentPage * productPerPage;
  const firstIndex = lastIndex - productPerPage;
  const paginatedProducts = filteredProducts.slice(firstIndex, lastIndex);

  useEffect(() => {
    if (category) {
      dispatch(fetchByCategory(category));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, category]);

  const handleAdd = (product) => {
      if (!user) {
    toast.error("You must be logged in to add items to the cart.");
    navigate("/login");
    return;
  }

    dispatch(addToCart(product));
    toast.success("Product added to cart.");
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation(); // Prevent event bubbling

      if (!user) {
    toast.error("You must be logged in to add items to the cart.");
    navigate("/login");
    return;
  }


    const isWishlisted = wish.some((item) => item._id === product._id);

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.warn("Removed from wishlist.");
    } else {
      dispatch(addToWishlist(product));
      toast.info("Added to wishlist.");
    }
  };

  const handleRatingChange = (event) => {
    const ratingValue = parseInt(event.target.value, 10);
    dispatch(setFilters({ rating: ratingValue }));
    dispatch(filterProducts());
  };

  const handleSort = (sortBy) => {
    dispatch(setFilters({ sortBy }));
    dispatch(filterProducts());
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value, 10);
    dispatch(setFilters({ maxPrice: newPrice }));
    dispatch(filterProducts());
  };

  const handleCategory = (event) => {
    const { value, checked } = event.target;
    dispatch(
      setFilters({
        category: checked
          ? [...filters.category, value]
          : filters.category.filter((cat) => cat !== value),
      })
    );
    dispatch(filterProducts());
  };

  // Function to render stars with half stars
  const renderStars = (rating) => {
    const ratingValue = parseFloat(rating);
    const stars = [];

    // Create 5 stars (filled, half-filled, or empty)
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(ratingValue)) {
        // Full star
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i - 0.5 <= ratingValue) {
        // Half star
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        // Empty star
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }

    return stars;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 bg-white p-4 nscroll">
          <h5 className="fw-bold">
            Filters{" "}
            <span
              className="text-primary float-end"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(clearFilters())}
            >
              Clear
            </span>
          </h5>

          {/* Price Slider */}
          <div className="mb-4">
            <h6>Price</h6>

            {/* Price Labels */}
            <div className="d-flex justify-content-between px-2">
              {[0, 2000, 4000, 6000, 8000].map((price) => (
                <span key={price} className="small">
                  {price / 1000}k
                </span>
              ))}
            </div>

            {/* Price Slider */}
            <input
              type="range"
              className="form-range"
              min="0"
              max="8000"
              step="2000"
              value={filters.maxPrice}
              onChange={handlePriceChange}
            />

            {/* Selected Price Display */}
            <p>Up to ₹{filters.maxPrice.toLocaleString()}</p>
          </div>

          {/* Category */}
          <div className="mb-4">
            <h6>Category</h6>

            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="category"
                  value="mens"
                  checked={filters.category.includes("mens")}
                  onChange={handleCategory}
                />{" "}
                Men's
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="category"
                  value="womens"
                  checked={filters.category.includes("womens")}
                  onChange={handleCategory}
                />{" "}
                Women's
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="category"
                  value="Kids"
                  checked={filters.category.includes("Kids")}
                  onChange={handleCategory}
                />{" "}
                Kids
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="category"
                  value="Electronics"
                  checked={filters.category.includes("Electronics")}
                  onChange={handleCategory}
                />{" "}
                Electronics
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
                  value={5 - index}
                  onChange={handleRatingChange}
                  checked={filters.rating === 5 - index}
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
                checked={filters.sortBy === "lowToHigh"}
                onChange={() => handleSort("lowToHigh")}
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
                checked={filters.sortBy === "highToLow"}
                onChange={() => handleSort("highToLow")}
              />
              <label className="form-check-label" htmlFor="sort2">
                Price - High to Low
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-lg-10 bg-light">
          <h5 className="fw-bold my-3">
            Showing All Products ({paginatedProducts.length})
          </h5>
          {category && <h6>{category} Products</h6>}
          {error && <p>{error}</p>}
          {status === "loading" ? (
            <DotLottieReact
              className="h-[200px]"
              src="https://lottie.host/6ed95052-d3f3-46b4-9659-ffc7e08449cd/wwZcBFAmDs.lottie"
              loop
              autoplay
            />
          ) : (
            <div className="row g-4">
              {paginatedProducts.map((product, index) => (
                <div className="col-md-3 mb-3" key={index}>
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
                      style={{ pointerEvents: "none" }}
                    >
                      <button
                        onClick={(e) => handleAddToWishlist(e, product)}
                        className="btn rounded-circle"
                        style={{
                          backgroundColor: wish.some(
                            (item) => item._id === product._id
                          )
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(255, 255, 255, 0.8)",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "none",
                          pointerEvents: "auto",
                        }}
                      >
                        {wish.some((item) => item._id === product._id) ? (
                          <FaHeart size={20} color="red" />
                        ) : (
                          <FaRegHeart size={20} color="black" />
                        )}
                      </button>
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
                      <div className="d-flex align-items-center justify-content-center mb-2">
                        <p className="mb-0 me-2">{product.rating}</p>
                        <div className="d-flex">
                          {renderStars(product.rating)}
                        </div>
                      </div>

                      {cart.some((item) => item._id === product._id) ? (
                        <button
                          className="btn w-100 text-light"
                          style={{ backgroundColor: "#121932" }}
                          onClick={() => navigate("/cart")}
                        >
                          Go to Cart
                        </button>
                      ) : (
                        <button
                          className="btn text-light w-100"
                          style={{ backgroundColor: "#121932" }}
                          onClick={() => handleAdd(product)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination
            setCurrentPage={setCurrentPage}
            totalProducts={filteredProducts.length}
            productPerPage={productPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
