import { useEffect, useState } from "react";
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
  FaShoppingCart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../slices/wishSlice";
import Pagination from "../components/Pagination";
import FilterSidebar from "../components/Filters";

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
  const [productPerPage, setProductPerPage] = useState(8);

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
        <FilterSidebar
          filters={filters}
          handlePriceChange={handlePriceChange}
          handleCategory={handleCategory}
          handleRatingChange={handleRatingChange}
          handleSort={handleSort}
          dispatch={dispatch}
          clearFilters={clearFilters}
        />
        <div className="col-md-9 col-lg-10 bg-light">
          {error && <p>{error}</p>}
          {status === "loading" ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "70vh" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {paginatedProducts?.map((product, index) => (
                <div className="col-md-3 mb-3 mt-3" key={index}>
                  <div className="card h-100">
                    <div style={{ backgroundColor: "light", padding: "4px" }}>
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
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "none",
                          pointerEvents: "auto",
                        }}
                      >
                        {wish?.some((item) => item?._id === product?._id) ? (
                          <FaHeart size={20} color="red" />
                        ) : (
                          <FaRegHeart size={20} color="black" />
                        )}
                      </button>
                    </div>

                    <div className="card-body p-2 d-flex flex-column justify-content-between">
                      <Link
                        to={`/products/${product._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <h6 className="fw-bold mb-1">{product.name}</h6>
                        <div className="d-flex align-items-center">
                          <p className="mb-0 me-2">{product.rating}</p>
                          <div className="d-flex">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                        <small
                          className="fw-semibold"
                          style={{ color: "#7685ab" }}
                        >
                          {product.description.slice(0, 40)}...
                        </small>
                        <div className="d-flex gap-2 py-1">
                          <h6 className="mb-0">₹{product.price}</h6>
                          <h6
                            className="text-decoration-line-through text-muted"
                            style={{ color: "#7685ab" }}
                          >
                            ₹{product.originalPrice}
                          </h6>
                        </div>
                      </Link>

                      {cart.some((item) => item?._id === product?._id) ? (
                        <button
                          className="btn w-100 text-light fw-bold"
                          style={{ backgroundColor: "#121932" }}
                          onClick={() => navigate("/cart")}
                        >
                          <FaShoppingCart
                            style={{ marginRight: "8px" }}
                            size={22}
                          />
                          Go To Cart
                        </button>
                      ) : (
                        <button
                          className="btn w-100 text-light fw-bold"
                          style={{ backgroundColor: "#121932" }}
                          onClick={() => handleAdd(product)}
                        >
                          <FaShoppingCart
                            style={{ marginRight: "8px" }}
                            size={22}
                          />
                          Add To Cart
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
